import React from 'react';
import Navigation from '../../components/navigation';

export default function TokenLayout({ children, params }: { children: React.ReactNode; params: { token: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation token={params.token} />
      <main className="max-w-4xl mx-auto p-4">{children}</main>
    </div>
  );
}
