"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import EditCylinderDialog from '../../../../components/edit-cylinder-dialog';
import PressureChart from '../../../../components/pressure-chart';
import UpdatePressureDialog from '../../../../components/update-pressure-dialog';
import { Cylinder } from '../../../../types';
import { useParams } from 'next/navigation';

export default function CylinderDetailPage() {
  const params = useParams() as { token: string; id: string };
  const { id } = params;
  const [cylinder, setCylinder] = useState<Cylinder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('cylinders').select('*').eq('id', id).single();
      if (!error && data) setCylinder(data);
      setLoading(false);
    };
    if (id) fetchDetail();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-gray-400">読み込み中...</div>;
  if (!cylinder) return <div className="p-8 text-center text-gray-400">データがありません</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8 bg-white rounded-2xl shadow-sm border border-[#e5e7eb]">
      <h2 className="text-2xl font-bold mb-4 tracking-tight">ボンベ詳細</h2>
      {/* 残圧即時更新 */}
      <section className="rounded-xl bg-[#f9fafb] p-6 mb-6 shadow-sm">
        <h3 className="font-semibold mb-3 text-lg">残圧をすぐに更新</h3>
        <UpdatePressureDialog cylinderId={cylinder.id} />
      </section>
      {/* 編集フォーム */}
      <section className="rounded-xl bg-[#f9fafb] p-6 mb-6 shadow-sm">
        <h3 className="font-semibold mb-3 text-lg">登録情報の編集</h3>
        <EditCylinderDialog cylinder={cylinder} />
      </section>
      {/* 残圧履歴グラフ */}
      <section className="rounded-xl bg-[#f9fafb] p-6 shadow-sm">
        <h3 className="font-semibold mb-3 text-lg">残圧履歴グラフ</h3>
        <PressureChart cylinderId={cylinder.id} />
      </section>
    </div>
  );
}
