"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Cylinder } from '../../types';
import { useRouter } from 'next/navigation';

const PRESSURE_THRESHOLD = 5;
const DEADLINE_DAYS = 7;

function daysUntil(dateStr: string) {
  const today = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function DashboardPage() {
  const [cylinders, setCylinders] = useState<Cylinder[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : '';

  useEffect(() => {
    const fetchCylinders = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('cylinders').select('*');
      if (!error && data) setCylinders(data);
      setLoading(false);
    };
    fetchCylinders();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-400">読み込み中...</div>;

  const lowPressure = cylinders.filter((c: Cylinder) => c.current_pressure < PRESSURE_THRESHOLD).length;
  const nearDeadline = cylinders.filter((c: Cylinder) => daysUntil(c.return_deadline) <= DEADLINE_DAYS).length;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-8 tracking-tight">ダッシュボード</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb] p-6 text-center">
          <div className="text-sm text-gray-500 mb-1">総ボンベ数</div>
          <div className="text-3xl font-bold">{cylinders.length}</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb] p-6 text-center">
          <div className="text-sm text-gray-500 mb-1">低残圧ボンベ数</div>
          <div className="text-3xl font-bold text-red-500">{lowPressure}</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb] p-6 text-center">
          <div className="text-sm text-gray-500 mb-1">期限間近ボンベ数</div>
          <div className="text-3xl font-bold text-orange-500">{nearDeadline}</div>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-4 tracking-tight">ボンベ一覧</h3>
      {cylinders.length === 0 ? (
        <div className="text-gray-400">ボンベがありません</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cylinders.map((c: Cylinder) => {
            const pressurePercent = Math.max(0, Math.min(100, (c.current_pressure / c.initial_pressure) * 100));
            const isLow = c.current_pressure < PRESSURE_THRESHOLD;
            const isNearDeadline = daysUntil(c.return_deadline) <= DEADLINE_DAYS;
            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb] p-6 cursor-pointer transition-transform duration-200 hover:scale-[1.025] hover:shadow-md"
                onClick={() => router.push(`/${token}/cylinder/${c.id}`)}
                style={{ fontFamily: 'Inter, Noto Sans JP, Segoe UI, system-ui, sans-serif' }}
              >
                <div className="font-bold text-lg mb-2 tracking-tight">{c.container_number}</div>
                <div className="text-gray-500 mb-2">{c.gas_type} / {c.location}</div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500">残圧</span>
                  <div className="flex-1 h-3 rounded bg-[#e5e7eb] relative min-w-[80px] max-w-[120px]">
                    <div
                      className={`h-3 rounded transition-all ${isLow ? 'bg-red-400' : 'bg-blue-400'}`}
                      style={{ width: `${pressurePercent}%` }}
                    />
                  </div>
                  <span className={isLow ? 'text-red-500 font-bold' : 'text-gray-700'}>{c.current_pressure} MPa</span>
                </div>
                <div className="mb-2 text-xs text-gray-500">QRコード: <span className="font-mono text-gray-700">{c.qr_number ?? '-'}</span></div>
                <div className="mb-1 text-xs text-gray-500">返却期限: <span className={isNearDeadline ? 'text-red-500 font-bold' : 'text-gray-700'}>{c.return_deadline}</span></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
