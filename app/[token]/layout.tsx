import React from 'react';
import Navigation from '../../components/navigation';
import { notFound } from 'next/navigation';
import { validateToken } from '../../lib/auth';

export default async function TokenLayout({ children, params }: { children: React.ReactNode; params: { token: string } }) {
  // サーバーコンポーネントでトークン検証
  const isValid = await validateToken(params.token);
  if (!isValid) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation token={params.token} />
      <main className="max-w-4xl mx-auto p-4">{children}</main>
    </div>
  );
}
