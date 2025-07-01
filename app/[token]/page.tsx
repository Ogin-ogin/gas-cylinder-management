"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Cylinder } from '../../types';
import { useRouter } from 'next/navigation';

function daysUntil(dateStr: string) {
  const today = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function DashboardPage() {
  const [cylinders, setCylinders] = useState<Cylinder[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cylinders.map((c: Cylinder) => (
            <div
              key={c.id}
              className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition border border-gray-100"
              onClick={() => router.push(`./cylinder/${c.id}`)}
              style={{ fontFamily: 'Inter, Noto Sans JP, Segoe UI, system-ui, sans-serif' }}
            >
              <div className="font-bold text-lg mb-1">{c.container_number}</div>
              <div className="text-gray-600 mb-1">{c.gas_type} / {c.location}</div>
              <div className="mb-1">残圧: <span className={c.current_pressure < 5 ? 'text-red-500 font-bold' : ''}>{c.current_pressure} MPa</span></div>
              <div className="mb-1">返却期限: <span className={daysUntil(c.return_deadline) <= 7 ? 'text-orange-500 font-bold' : ''}>{c.return_deadline}</span></div>
              <div className="text-xs text-gray-400">クリックで詳細・編集</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
