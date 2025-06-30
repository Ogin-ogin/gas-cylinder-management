// ...残圧更新ダイアログ雛形...
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from './ui/input';
import { Button } from './ui/button';

// 進捗率: 約60%

export default function UpdatePressureDialog({ cylinderId }: { cylinderId: string }) {
  const [pressure, setPressure] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    const { error } = await supabase.from('cylinders').update({
      current_pressure: parseFloat(pressure)
    }).eq('id', cylinderId);
    setLoading(false);
    setMsg(error ? '更新失敗' : '更新完了');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <Input
        type="number"
        step="0.01"
        placeholder="新しい残圧 (MPa)"
        value={pressure}
        onChange={e => setPressure(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>{loading ? '更新中...' : '残圧更新'}</Button>
      {msg && <span>{msg}</span>}
    </form>
  );
}
