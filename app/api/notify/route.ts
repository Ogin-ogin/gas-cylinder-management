import { NextRequest, NextResponse } from 'next/server';

// 進捗率: 約85%

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return NextResponse.json({ ok: false, error: 'Webhook未設定' }, { status: 500 });
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: message })
  });
  if (!res.ok) return NextResponse.json({ ok: false, error: 'Slack送信失敗' }, { status: 500 });
  return NextResponse.json({ ok: true });
}
