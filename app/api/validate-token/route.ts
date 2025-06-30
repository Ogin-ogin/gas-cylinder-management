// ...トークン検証API雛形...
import { NextRequest, NextResponse } from 'next/server';
import { validateToken } from '../../../lib/auth';

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const isValid = await validateToken(token);
  return NextResponse.json({ valid: isValid });
}
