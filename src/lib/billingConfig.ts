export type PortOneBillingMethod = 'CARD' | 'EASY_PAY'

export type PortOneEasyPayProvider = 'KAKAOPAY' | 'TOSSPAY' | 'NAVERPAY'

export const EASY_PAY_PROVIDER_LABELS: Record<PortOneEasyPayProvider, string> = {
  KAKAOPAY: '카카오페이',
  TOSSPAY: '토스페이',
  NAVERPAY: '네이버페이',
}

export function parseBillingMethod(raw: string | undefined): PortOneBillingMethod {
  const value = raw?.trim().toUpperCase()
  return value === 'CARD' ? 'CARD' : 'EASY_PAY'
}

export function parseEasyPayProvider(
  raw: string | undefined,
): PortOneEasyPayProvider | undefined {
  const value = raw?.trim().toUpperCase()
  if (value === 'KAKAOPAY' || value === 'TOSSPAY' || value === 'NAVERPAY') {
    return value
  }
  return undefined
}

export function getEasyPayBillingLabel(provider?: PortOneEasyPayProvider): string {
  if (provider) return EASY_PAY_PROVIDER_LABELS[provider]
  return '간편결제'
}
