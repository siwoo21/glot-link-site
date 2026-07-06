import * as PortOne from '@portone/browser-sdk/v2'
import { FunctionsHttpError } from '@supabase/supabase-js'
import {
  getPlanPaymentAmountKrw,
  PAYMENT_CANCELLED_MESSAGE,
  PAYMENT_SUCCESS_MESSAGE,
  PORTONE_BILLING_ISSUE_NAME,
  type PaidPlanType,
} from './payment'
import {
  getEasyPayBillingLabel,
  parseBillingMethod,
  parseEasyPayProvider,
  type PortOneBillingMethod,
  type PortOneEasyPayProvider,
} from './billingConfig'
import { getSupabase } from './supabase'

type BillingPaymentIssueRequest = {
  storeId: string
  channelKey: string
  billingKeyMethod: PortOneBillingMethod
  issueId: string
  issueName: string
  customer: {
    customerId: string
    email: string
    phoneNumber?: string
    fullName?: string
  }
  customData: Record<string, unknown>
  easyPay?: { easyPayProvider?: PortOneEasyPayProvider }
}

export type SubscribePaymentPhase = 'billing' | 'verifying'

export type SubscribeWithPortOneResult =
  | { ok: true; message: string }
  | { ok: false; message: string; cancelled?: boolean }

function getBillingChannelKey(): string | undefined {
  const key = import.meta.env.VITE_PORTONE_BILLING_CHANNEL_KEY as string | undefined
  return key?.trim() || undefined
}

function getBillingMethod(): PortOneBillingMethod {
  return parseBillingMethod(import.meta.env.VITE_PORTONE_BILLING_METHOD as string | undefined)
}

function getEasyPayProvider(): PortOneEasyPayProvider | undefined {
  return parseEasyPayProvider(import.meta.env.VITE_PORTONE_EASY_PAY_PROVIDER as string | undefined)
}

export function isEasyPayBilling(): boolean {
  return getBillingMethod() === 'EASY_PAY'
}

export function getBillingMethodLabel(): string {
  if (isEasyPayBilling()) {
    return getEasyPayBillingLabel(getEasyPayProvider())
  }
  return '카드'
}

export function isPortOneConfigured(): boolean {
  return Boolean(import.meta.env.VITE_PORTONE_STORE_ID && getBillingChannelKey())
}

export function formatBillingPhoneNumber(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  if (!/^01[016789]\d{7,8}$/.test(digits)) return null
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
}

export function normalizeBillingCustomerName(raw: string): string | null {
  const name = raw.trim().replace(/\s+/g, ' ')
  if (name.length < 2 || name.length > 30) return null
  return name
}

async function getFunctionErrorMessage(error: unknown): Promise<string> {
  if (error instanceof FunctionsHttpError) {
    try {
      const body = (await error.context.json()) as { message?: string }
      if (body?.message) return body.message
    } catch {
      // ignore
    }
  }
  if (error instanceof Error) return error.message
  return '결제 검증에 실패했습니다.'
}

function createCustomerUid(userId: string): string {
  return `usr_${userId}`
}

function createPaymentId(userId: string, planType: PaidPlanType): string {
  const suffix = crypto.randomUUID().replace(/-/g, '').slice(0, 12)
  return `glot-${planType}-sub-${userId.slice(0, 8)}-${suffix}`
}

function createBillingIssueId(userId: string): string {
  const suffix = crypto.randomUUID().replace(/-/g, '').slice(0, 12)
  return `glot-billing-${userId.slice(0, 8)}-${suffix}`
}

export async function subscribeWithPortOne(
  userId: string,
  userEmail: string,
  planType: PaidPlanType,
  options?: {
    onPhase?: (phase: SubscribePaymentPhase | null) => void
    phoneNumber?: string
    customerName?: string
  },
): Promise<SubscribeWithPortOneResult> {
  const storeId = import.meta.env.VITE_PORTONE_STORE_ID as string | undefined
  const channelKey = getBillingChannelKey()

  if (!storeId || !channelKey) {
    return {
      ok: false,
      message:
        'PortOne 설정(VITE_PORTONE_STORE_ID, VITE_PORTONE_BILLING_CHANNEL_KEY)이 필요합니다.',
    }
  }

  const paymentId = createPaymentId(userId, planType)
  const customerUid = createCustomerUid(userId)
  const billingMethod = getBillingMethod()
  const easyPayProvider = getEasyPayProvider()
  const phoneNumber = options?.phoneNumber
    ? formatBillingPhoneNumber(options.phoneNumber)
    : null
  const fullName = options?.customerName
    ? normalizeBillingCustomerName(options.customerName)
    : null

  const customer: BillingPaymentIssueRequest['customer'] = {
    customerId: customerUid,
    email: userEmail,
  }
  if (phoneNumber) customer.phoneNumber = phoneNumber
  if (fullName) customer.fullName = fullName

  const issuePayload: BillingPaymentIssueRequest = {
    storeId,
    channelKey,
    billingKeyMethod: billingMethod,
    issueId: createBillingIssueId(userId),
    issueName: PORTONE_BILLING_ISSUE_NAME,
    customer,
    customData: {
      userId,
      planType,
      subscription: true,
      paymentId,
      customerUid,
    },
  }

  if (billingMethod === 'EASY_PAY' && easyPayProvider) {
    issuePayload.easyPay = { easyPayProvider }
  }

  options?.onPhase?.('billing')

  const issueResponse = await PortOne.requestIssueBillingKey({
    ...issuePayload,
    iframe: { dim: true },
  })

  if (!issueResponse) {
    options?.onPhase?.(null)
    return { ok: false, message: PAYMENT_CANCELLED_MESSAGE, cancelled: true }
  }

  if (issueResponse.code) {
    options?.onPhase?.(null)
    return {
      ok: false,
      message: issueResponse.message ?? '결제 수단 등록(빌링키 발급)에 실패했습니다.',
    }
  }

  const billingKey = issueResponse.billingKey?.trim()
  if (!billingKey || billingKey === 'NEEDS_CONFIRMATION') {
    options?.onPhase?.(null)
    return { ok: false, message: '빌링키를 발급받지 못했습니다.' }
  }

  options?.onPhase?.('verifying')

  const supabase = getSupabase()
  if (!supabase) {
    options?.onPhase?.(null)
    return { ok: false, message: 'Supabase가 설정되지 않았습니다.' }
  }

  const amount = getPlanPaymentAmountKrw(planType)
  const { data, error } = await supabase.functions.invoke('portone-verify', {
    body: {
      billingKey,
      planType,
      amount,
      paymentId,
      subscription: true,
      billingOnly: false,
    },
  })

  options?.onPhase?.(null)

  if (error) {
    return { ok: false, message: await getFunctionErrorMessage(error) }
  }

  if (!data?.ok) {
    return { ok: false, message: data?.message ?? '구독 검증에 실패했습니다.' }
  }

  return {
    ok: true,
    message: typeof data.message === 'string' ? data.message : PAYMENT_SUCCESS_MESSAGE,
  }
}
