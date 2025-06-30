// ...ボンベ編集ダイアログ雛形...
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Cylinder } from '../types';

// 進捗率: 約55%

export default function EditCylinderDialog({ cylinder }: { cylinder: Cylinder }) {
  // すべてstring型で初期化
  const [form, setForm] = useState({
    ...cylinder,
    initial_pressure: String(cylinder.initial_pressure ?? ''),
    current_pressure: String(cylinder.current_pressure ?? '')
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    const { error } = await supabase.from('cylinders').update({
      ...form,
      initial_pressure: parseFloat(form.initial_pressure),
      current_pressure: parseFloat(form.current_pressure)
    }).eq('id', cylinder.id);
    setLoading(false);
    setMsg(error ? '更新失敗' : '更新完了');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input name="container_number" placeholder="ボンベ番号" value={form.container_number} onChange={handleChange} required />
      <Input name="gas_type" placeholder="ガス種" value={form.gas_type} onChange={handleChange} required />
      <Input name="location" placeholder="設置場所" value={form.location} onChange={handleChange} required />
      <Input name="initial_pressure" placeholder="初期圧力" value={form.initial_pressure} onChange={handleChange} required type="number" />
      <Input name="current_pressure" placeholder="現在圧力" value={form.current_pressure} onChange={handleChange} required type="number" />
      <Input name="return_deadline" placeholder="返却期限 (YYYY-MM-DD)" value={form.return_deadline} onChange={handleChange} required type="date" />
      <Button type="submit" disabled={loading}>{loading ? '更新中...' : '編集'}</Button>
      {msg && <div>{msg}</div>}
    </form>
  );
}
