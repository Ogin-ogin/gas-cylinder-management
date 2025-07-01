// ...残圧更新ダイアログ雛形...
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowUpRight } from 'lucide-react';
import { Label } from './ui/label';

// 進捗率: 約60%

export default function UpdatePressureDialog({ cylinderId, compact }: { cylinderId: string; compact?: boolean }) {
  const [pressure, setPressure] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    const value = parseFloat(pressure);
    // cylindersテーブル更新
    const { error: updateError } = await supabase.from('cylinders').update({
      current_pressure: value
    }).eq('id', cylinderId);
    // pressure_historyへ記録
    const { error: historyError } = await supabase.from('pressure_history').insert([
      { cylinder_id: cylinderId, pressure: value }
    ]);
    setLoading(false);
    setMsg(updateError || historyError ? '更新失敗' : '更新完了');
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${compact ? '' : 'flex gap-3 items-center bg-[#f3f4f6] rounded-xl p-4 shadow-sm'}`}>
      <Label htmlFor="pressure" className="block">新しい残圧 (MPa)</Label>
      <Input
        id="pressure"
        type="number"
        step="0.01"
        placeholder="新しい残圧 (MPa)"
        value={pressure}
        onChange={e => setPressure(e.target.value)}
        required
        className={`w-full text-base py-2 ${compact ? '' : 'px-4 rounded-lg bg-white border border-[#e5e7eb] focus:ring-2 focus:ring-indigo-200 transition'}`}
        style={{ fontFamily: 'Inter, Noto Sans JP, Segoe UI, system-ui, sans-serif' }}
      />
      <Button
        type="submit"
        disabled={loading}
        className="h-10 text-base w-full rounded-lg"
      >
        {loading ? '更新中...' : <><ArrowUpRight size={18} /> 残圧更新</>}
      </Button>
      {msg && <span className="ml-2 text-sm text-gray-500">{msg}</span>}
    </form>
  );
}
