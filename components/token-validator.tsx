// ...トークン検証コンポーネント雛形...
'use client';
import { useState } from 'react';

export default function TokenValidator({ onValid }: { onValid: (token: string) => void }) {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: APIでトークン検証
    if (token.length >= 32) {
      onValid(token);
    } else {
      setError('無効なトークンです');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        value={token}
        onChange={e => setToken(e.target.value)}
        placeholder="トークンを入力"
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">ログイン</button>
      {error && <span className="text-red-500">{error}</span>}
    </form>
  );
}
