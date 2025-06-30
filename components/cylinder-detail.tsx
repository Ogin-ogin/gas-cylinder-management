// ボンベ詳細コンポーネント
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Cylinder } from '../types';
import { useParams } from 'next/navigation';

// 進捗率: 約45%

export default function CylinderDetail() {
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

  if (loading) return <div>読み込み中...</div>;
  if (!cylinder) return <div>データがありません</div>;

  return (
    <div>
      <h3 className="text-lg font-semibold">{cylinder.container_number}</h3>
      <div>ガス種: {cylinder.gas_type}</div>
      <div>設置場所: {cylinder.location}</div>
      <div>初期圧力: {cylinder.initial_pressure} MPa</div>
      <div>現在圧力: {cylinder.current_pressure} MPa</div>
      <div>返却期限: {cylinder.return_deadline}</div>
    </div>
  );
}
