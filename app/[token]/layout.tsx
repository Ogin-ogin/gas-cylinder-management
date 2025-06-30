import React from 'react';
import { validateToken } from '../../lib/auth';
import Navigation from '../../components/navigation';
import { notFound } from 'next/navigation';

// 進捗率: 約92%

export default async function TokenLayout({ children, params }: { children: React.ReactNode; params: { token: string } }) {
  const isValid = await validateToken(params.token);
  if (!isValid) {
    // 404ページ表示＋エラーメッセージ
    notFound();
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation token={params.token} />
      <main className="max-w-4xl mx-auto p-4">{children}</main>
    </div>
  );
}
