import React from 'react';
import TokenValidatorClient from '../components/token-validator-client';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center flex-col gap-4">
      <h1 className="text-2xl font-bold">ガスボンベ管理システム</h1>
      <TokenValidatorClient />
    </main>
  );
}
