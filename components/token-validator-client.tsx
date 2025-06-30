'use client';
import TokenValidator from './token-validator';

export default function TokenValidatorClient() {
  const handleValid = (token: string) => {
    window.location.href = `/${token}`;
  };
  return <TokenValidator onValid={handleValid} />;
}
