// ...ナビゲーションコンポーネント雛形...
import Link from 'next/link';

export default function Navigation({ token }: { token: string }) {
  return (
    <nav className="bg-white shadow p-4 flex gap-4">
      <Link href={`/${token}`}>ダッシュボード</Link>
      <Link href={`/${token}/cylinders`}>ボンベ一覧</Link>
      <Link href={`/${token}/qr-codes`}>QRコード管理</Link>
      <Link href={`/${token}/settings`}>設定</Link>
    </nav>
  );
}
