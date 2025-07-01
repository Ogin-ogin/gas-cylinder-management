"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import EditCylinderDialog from '../../../../components/edit-cylinder-dialog';
import PressureChart from '../../../../components/pressure-chart';
import UpdatePressureDialog from '../../../../components/update-pressure-dialog';
import { Cylinder } from '../../../../types';

export default function CylinderDetailPage() {
  const { id } = useParams();
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

  if (loading) return <div className="p-4">読み込み中...</div>;
  if (!cylinder) return <div className="p-4">データがありません</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-bold mb-2">ボンベ詳細</h2>
      {/* 残圧即時更新 */}
      <div className="bg-white rounded shadow p-4 mb-4">
        <h3 className="font-semibold mb-2">残圧をすぐに更新</h3>
        <UpdatePressureDialog cylinderId={cylinder.id} />
      </div>
      {/* 編集フォーム */}
      <div className="bg-white rounded shadow p-4 mb-4">
        <h3 className="font-semibold mb-2">登録情報の編集</h3>
        <EditCylinderDialog cylinder={cylinder} />
      </div>
      {/* 残圧履歴グラフ */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">残圧履歴グラフ</h3>
        <PressureChart cylinderId={cylinder.id} />
      </div>
    </div>
  );
}
