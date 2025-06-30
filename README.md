# ガスボンベ管理システム

このアプリは研究室向けのガスボンベ在庫・残圧・QRコード・多言語・Slack通知管理Webアプリです。

## 進捗状況
- 2025/06/27時点：実装完了（進捗: 100%）
- CRUD・認証・多言語・通知・RLS・UI/UX・設計書通りの機能を実装済み

## サポート・今後の拡張
- バグ報告・要望はGitHub Issue等で受付
- 今後の拡張: PWA/プッシュ通知/分析/自動トークンローテーション等（設計書13章参照）

## セットアップ

1. 依存パッケージのインストール
   ```sh
   npm install
   ```
2. 環境変数ファイルの作成
   ```sh
   cp .env.example .env
   # .envを編集
   ```
3. Supabaseでデータベース作成・スキーマ適用
   ```sh
   psql < scripts/database-setup.sql
   ```
4. 開発サーバ起動
   ```sh
   npm run dev
   ```

## 主な技術
- Next.js 15 (App Router)
- React 18, TypeScript
- Tailwind CSS, shadcn/ui
- Supabase (PostgreSQL)
- Slack Webhook

## 使い方
- トークンを入力してダッシュボードにアクセス
- ボンベ管理・QR管理・Slack通知・多言語切替など全機能利用可能

## 注意事項
- SupabaseのRLS/セキュリティ設定必須
- Slack Webhook/環境変数の設定必須
- 設計書.md も参照

## ディレクトリ構成
設計書.md を参照
