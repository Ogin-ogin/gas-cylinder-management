// ...トークン認証関数（雛形）...
import { supabase } from './supabase';

// 進捗率: 約88%
export async function validateToken(token: string): Promise<boolean> {
  try {
    // RLS用: current_setting('app.current_token', true)をセットする必要あり（Supabase Edge Functions等で対応）
    const { data, error } = await supabase
      .from('access_tokens')
      .select('id, is_active, access_count')
      .eq('token', token)
      .eq('is_active', true)
      .single();
    if (error || !data) {
      console.error('Token validation error:', error);
      return false;
    }
    await supabase
      .from('access_tokens')
      .update({ last_accessed: new Date().toISOString(), access_count: data.access_count + 1 })
      .eq('id', data.id);
    // TODO: RLS用current_settingセット
    return true;
  } catch (e) {
    console.error('Token validation exception:', e);
    return false;
  }
}
