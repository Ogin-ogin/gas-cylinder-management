// ...残圧更新ダイアログ雛形...
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowUpRight } from 'lucide-react';

// 進捗率: 約60%

export default function UpdatePressureDialog({ cylinderId }: { cylinderId: string }) {
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
    <form onSubmit={handleSubmit} className="flex gap-3 items-center bg-[#f3f4f6] rounded-xl p-4 shadow-sm">
      <Input
        type="number"
        step="0.01"
        placeholder="新しい残圧 (MPa)"
        value={pressure}
        onChange={e => setPressure(e.target.value)}
        required
        className="w-32 text-lg px-4 py-2 rounded-lg bg-white border border-[#e5e7eb] focus:ring-2 focus:ring-indigo-200 transition"
        style={{ fontFamily: 'Inter, Noto Sans JP, Segoe UI, system-ui, sans-serif' }}
      />
      <Button
        type="submit"
        disabled={loading}
        className="px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-sm transition-all flex items-center gap-1"
      >
        {loading ? '更新中...' : <><ArrowUpRight size={18} /> 残圧更新</>}
      </Button>
      {msg && <span className="ml-2 text-sm text-gray-500">{msg}</span>}
    </form>
  );
}
