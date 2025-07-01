"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Cylinder } from '../../types';

function daysUntil(dateStr: string) {
  const today = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function DashboardPage() {
  const [cylinders, setCylinders] = useState<Cylinder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCylinders = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('cylinders').select('*');
      if (!error && data) setCylinders(data);
      setLoading(false);
    };
    fetchCylinders();
  }, []);

  if (loading) return <div className="p-4">読み込み中...</div>;

  const lowPressure = cylinders.filter((c: Cylinder) => c.current_pressure < 5).length;
  const nearDeadline = cylinders.filter((c: Cylinder) => daysUntil(c.return_deadline) <= 7).length;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">ダッシュボード</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">総ボンベ数: {cylinders.length}</div>
        <div className="bg-white p-4 rounded shadow">低残圧ボンベ数: {lowPressure}</div>
        <div className="bg-white p-4 rounded shadow">期限間近ボンベ数: {nearDeadline}</div>
      </div>
      <h3 className="text-lg font-semibold mb-2">ボンベ一覧</h3>
      {cylinders.length === 0 ? (
        <div>ボンベがありません</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="p-2">番号</th>
              <th className="p-2">ガス種</th>
              <th className="p-2">設置場所</th>
              <th className="p-2">残圧(MPa)</th>
              <th className="p-2">返却期限</th>
            </tr>
          </thead>
          <tbody>
            {cylinders.map((c: Cylinder) => (
              <tr key={c.id} className="border-t">
                <td className="p-2">{c.container_number}</td>
                <td className="p-2">{c.gas_type}</td>
                <td className="p-2">{c.location}</td>
                <td className="p-2">{c.current_pressure}</td>
                <td className="p-2">{c.return_deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
