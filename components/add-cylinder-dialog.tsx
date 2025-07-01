// ...ボンベ追加ダイアログ雛形...
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from './ui/input';
import { Button } from './ui/button';

// 進捗率: 約50%

export default function AddCylinderDialog({ onSubmit, onClose }: { onSubmit: (form: any) => void, onClose: () => void }) {
  const [form, setForm] = useState({
    container_number: '',
    gas_type: '',
    location: '',
    initial_pressure: '',
    current_pressure: '',
    return_deadline: ''
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
    await onSubmit(form);
    setLoading(false);
    setMsg('登録完了');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-lg">新規ボンベ登録</div>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl">×</button>
      </div>
      <Input name="container_number" placeholder="ボンベ番号" value={form.container_number} onChange={handleChange} required />
      <Input name="gas_type" placeholder="ガス種" value={form.gas_type} onChange={handleChange} required />
      <Input name="location" placeholder="設置場所" value={form.location} onChange={handleChange} required />
      <Input name="initial_pressure" placeholder="初期圧力" value={form.initial_pressure} onChange={handleChange} required type="number" />
      <Input name="current_pressure" placeholder="現在圧力" value={form.current_pressure} onChange={handleChange} required type="number" />
      <Input name="return_deadline" placeholder="返却期限 (YYYY-MM-DD)" value={form.return_deadline} onChange={handleChange} required type="date" />
      <Button type="submit" disabled={loading}>{loading ? '登録中...' : 'ボンベ追加'}</Button>
      {msg && <div>{msg}</div>}
    </form>
  );
}
