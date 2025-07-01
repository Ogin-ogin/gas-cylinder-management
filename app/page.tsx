import React from "react";
import { Card } from "../components/ui/card";
import { Alert } from "../components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center flex-col gap-4 bg-gray-50">
      <Card className="p-8 max-w-xl w-full flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">ガスボンベ管理システム</h1>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4 mr-2" />
          このページには直接アクセスできません。<br />有効なURL（例: <code>https://yourdomain.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</code>）からアクセスしてください。
        </Alert>
      </Card>
    </main>
  );
}
