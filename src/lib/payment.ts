export type PaidPlanType = 'pro'

export const PLAN_PAYMENT_AMOUNTS_KRW: Record<PaidPlanType, number> = {
  pro: 6900,
}

export function getPlanPaymentAmountKrw(planType: PaidPlanType): number {
  return PLAN_PAYMENT_AMOUNTS_KRW[planType]
}

export const PORTONE_BILLING_ISSUE_NAME = 'GLOT-Link Pro Subscription'
export const PORTONE_SUBSCRIPTION_ORDER_NAME = 'GLOT-Link Pro Monthly'

export const PAYMENT_SUCCESS_MESSAGE =
  'Pro 구독이 완료되었습니다. GLOT-Link Windows 앱에서 Pro 기능을 이용하세요.'
export const PAYMENT_CANCELLED_MESSAGE = '결제가 취소되었습니다.'
