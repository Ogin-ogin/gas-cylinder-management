// ...残圧チャート雛形...
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function PressureChart({ cylinderId }: { cylinderId: string }) {
  const [history, setHistory] = useState<{ pressure: number; date: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('pressure_history')
        .select('pressure, date')
        .eq('cylinder_id', cylinderId)
        .order('date', { ascending: false });
      if (!error && data) setHistory(data);
      setLoading(false);
    };
    if (cylinderId) fetchHistory();
  }, [cylinderId]);

  if (loading) return <div>読み込み中...</div>;
  if (history.length === 0) return <div>履歴なし</div>;

  return (
    <div>
      <h3 className="text-lg font-semibold">残圧チャート</h3>
      <table className="min-w-[200px] text-sm">
        <thead>
          <tr><th>日付</th><th>残圧(MPa)</th></tr>
        </thead>
        <tbody>
          {history.map((h, i) => (
            <tr key={i}><td>{h.date}</td><td>{h.pressure}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
