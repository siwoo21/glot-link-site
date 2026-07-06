import { getSupabase } from './supabase'

export async function signInWithGoogle(): Promise<
  { ok: true; email: string } | { ok: false; message: string }
> {
  const supabase = getSupabase()
  if (!supabase) {
    return { ok: false, message: 'Supabase가 설정되지 않았습니다.' }
  }

  const redirectTo = `${window.location.origin}/checkout`

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: { prompt: 'select_account' },
    },
  })

  if (error) {
    return { ok: false, message: error.message }
  }

  return { ok: false, message: 'Google 로그인 페이지로 이동 중…' }
}
