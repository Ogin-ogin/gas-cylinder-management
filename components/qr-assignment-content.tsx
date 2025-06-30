// QRコード割り当てコンポーネント
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from './ui/input';
import { Button } from './ui/button';

// 進捗率: 約76%
export default function QRAssignmentContent() {
  const [cylinderId, setCylinderId] = useState('');
  const [qrNumber, setQrNumber] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAssign = async () => {
    setLoading(true);
    setMsg('');
    // QRコードID取得
    const { data: qr, error: qrError } = await supabase
      .from('qr_codes')
      .select('id')
      .eq('qr_number', qrNumber)
      .single();
    if (qrError || !qr) {
      setMsg('QRコードが見つかりません');
      setLoading(false);
      return;
    }
    // ボンベに割り当て
    const { error } = await supabase
      .from('cylinders')
      .update({ qr_code_id: qr.id, qr_number: parseInt(qrNumber) })
      .eq('id', cylinderId);
    setMsg(error ? '割り当て失敗' : '割り当て完了');
    setLoading(false);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">QRコード割り当て</h3>
      <Input placeholder="ボンベID" value={cylinderId} onChange={e => setCylinderId(e.target.value)} />
      <Input placeholder="QR番号" value={qrNumber} onChange={e => setQrNumber(e.target.value)} />
      <Button onClick={handleAssign} disabled={loading || !cylinderId || !qrNumber}>{loading ? '割り当て中...' : '割り当て'}</Button>
      {msg && <div>{msg}</div>}
    </div>
  );
}
