// ...設定コンテンツ雛形...
import React, { useState } from 'react';
import { Button } from './ui/button';
import LanguageSwitcher from './language-switcher';

// 進捗率: 約95%

export default function SettingsContent() {
  const [msg, setMsg] = useState('');
  const handleTestNotify = async () => {
    setMsg('送信中...');
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'テスト通知 from ガスボンベ管理システム' })
    });
    setMsg(res.ok ? '送信成功' : '送信失敗');
  };
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-bold">多言語切替</h4>
        <LanguageSwitcher />
      </div>
      <div>
        <h4 className="font-bold">Slack通知テスト</h4>
        <Button onClick={handleTestNotify}>Slack通知テスト</Button>
        {msg && <div>{msg}</div>}
      </div>
      <div>
        <h4 className="font-bold">現在のトークン</h4>
        <span>{typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : ''}</span>
      </div>
    </div>
  );
}
