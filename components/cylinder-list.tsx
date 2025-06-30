// ボンベリストコンポーネント
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Cylinder } from '../types';
import { Card } from './ui/card';

// 進捗率: 約40%

export default function CylinderList() {
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

  if (loading) return <div>読み込み中...</div>;
  if (cylinders.length === 0) return <div>ボンベがありません</div>;

  return (
    <div className="grid gap-4">
      {cylinders.map((cylinder) => (
        <Card key={cylinder.id}>
          <div className="font-bold">{cylinder.container_number}</div>
          <div>{cylinder.gas_type} / {cylinder.location}</div>
          <div>残圧: {cylinder.current_pressure} MPa</div>
          <div>返却期限: {cylinder.return_deadline}</div>
        </Card>
      ))}
    </div>
  );
}
