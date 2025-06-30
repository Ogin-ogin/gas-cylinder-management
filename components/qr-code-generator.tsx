// QRコード生成コンポーネント
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from './ui/input';
import { Button } from './ui/button';

// 進捗率: 約70%
export default function QRCodeGenerator() {
  const [number, setNumber] = useState('');
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setMsg('');
    // 仮のURL生成例
    const qrUrl = `https://yourdomain.com/qr/${number}`;
    setUrl(qrUrl);
    // Supabaseへ登録
    const { error } = await supabase.from('qr_codes').insert([
      { qr_number: parseInt(number), url: qrUrl, is_active: true }
    ]);
    setMsg(error ? '登録失敗' : '登録完了');
    setLoading(false);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">QRコード生成</h3>
      <Input type="number" placeholder="QR番号" value={number} onChange={e => setNumber(e.target.value)} />
      <Button onClick={handleGenerate} disabled={loading || !number}>{loading ? '生成中...' : 'QR生成'}</Button>
      {url && <div>URL: {url}</div>}
      {msg && <div>{msg}</div>}
    </div>
  );
}
