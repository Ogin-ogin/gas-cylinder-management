import React from 'react';
import TokenValidator from '../components/token-validator';

// 進捗率: 約98%

export default function HomePage() {
  const handleValid = (token: string) => {
    window.location.href = `/${token}`;
  };
  return (
    <main className="flex min-h-screen items-center justify-center flex-col gap-4">
      <h1 className="text-2xl font-bold">ガスボンベ管理システム</h1>
      <TokenValidator onValid={handleValid} />
    </main>
  );
}
