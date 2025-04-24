# 研究室ガスボンベ管理システム - 詳細プロジェクト構造

## プロジェクト概要

研究室で使用するガスボンベを管理するためのウェブアプリケーションを開発します。このシステムは、ガスボンベの登録、追跡、圧力履歴の記録、QRコード連携、および通知機能を提供し、完全に無料でホスティング可能な環境で実装します。

## 技術スタック

- **フロントエンド**: React.js (Next.js) - Notionライクなデザインの実現
- **バックエンド**: Firebase
  - Firestore: データベース
  - Cloud Functions: 通知機能などのサーバーレス処理
  - Hosting: Webアプリのホスティング
- **UI/UX**: Tailwind CSS + Headless UI
- **グラフ表示**: Recharts
- **QRコード**: react-qr-code
- **多言語対応**: i18next
- **通知機能**: Firebase Cloud Functions + node-fetch (Slack通知)

## 詳細ファイル構造

```
/
├── .env.local                   # 環境変数設定ファイル
├── .gitignore                   # Git除外ファイル設定
├── package.json                 # プロジェクト依存関係
├── next.config.js               # Next.js設定
├── postcss.config.js            # PostCSS設定（Tailwind用）
├── tailwind.config.js           # Tailwind CSS設定
├── tsconfig.json                # TypeScript設定（使用する場合）
├── components/                  # 共通コンポーネント
│   ├── Layout/
│   │   ├── Header.js            # ヘッダーコンポーネント（言語切替、設定リンク等）
│   │   ├── Footer.js            # フッターコンポーネント
│   │   ├── Layout.js            # レイアウトラッパー
│   │   └── Navigation.js        # ナビゲーションメニュー
│   ├── GasCylinder/
│   │   ├── CylinderCard.js      # ガスボンベカード表示コンポーネント
│   │   ├── CylinderForm.js      # ガスボンベ登録/編集フォーム
│   │   ├── CylinderList.js      # ガスボンベ一覧表示コンポーネント
│   │   ├── CylinderDetail.js    # ガスボンベ詳細表示コンポーネント
│   │   ├── PressureForm.js      # 圧力記録フォームコンポーネント
│   │   ├── PressureChart.js     # 圧力履歴グラフコンポーネント
│   │   └── FilterBar.js         # フィルタリング・検索バー
│   ├── QRCode/
│   │   ├── QRCodeGenerator.js   # QRコード生成コンポーネント
│   │   ├── QRCodeList.js        # QRコード一覧表示コンポーネント
│   │   └── QRCodePrint.js       # QRコード印刷用コンポーネント
│   ├── Charts/
│   │   ├── LineChart.js         # 折れ線グラフコンポーネント（圧力履歴用）
│   │   ├── BarChart.js          # 棒グラフコンポーネント（月別登録数用）
│   │   └── SummaryTable.js      # 統計サマリーテーブル
│   └── UI/
│       ├── Button.js            # ボタンコンポーネント
│       ├── Card.js              # カードコンポーネント
│       ├── Modal.js             # モーダルコンポーネント
│       ├── Badge.js             # バッジコンポーネント（低残圧表示等）
│       ├── Dropdown.js          # ドロップダウンコンポーネント
│       ├── Input.js             # 入力フィールドコンポーネント
│       ├── Select.js            # セレクトコンポーネント
│       ├── Tab.js               # タブコンポーネント
│       └── Loading.js           # ローディング表示コンポーネント
├── pages/                       # アプリケーションページ
│   ├── _app.js                  # アプリルートコンポーネント（i18n設定等）
│   ├── _document.js             # HTMLドキュメント設定
│   ├── index.js                 # ダッシュボード（ボンベ一覧表示）
│   ├── statistics.js            # 統計情報ページ
│   ├── settings.js              # 設定ページ
│   ├── qr-manager.js            # QRコード管理ページ
│   └── scan.js                  # QRスキャン結果表示ページ
├── lib/                         # ユーティリティ関数
│   ├── firebase.js              # Firebase設定と接続
│   ├── hooks/
│   │   ├── useCylinders.js      # ガスボンベデータ操作フック
│   │   ├── usePressureHistory.js # 圧力履歴データ操作フック
│   │   ├── useQRCodes.js        # QRコードデータ操作フック
│   │   └── useSettings.js       # 設定データ操作フック
│   └── utils/
│       ├── date.js              # 日付処理ユーティリティ
│       ├── pressure.js          # 圧力計算ユーティリティ
│       ├── formatter.js         # データフォーマットユーティリティ
│       └── statistics.js        # 統計計算ユーティリティ
├── public/                      # 静的ファイル
│   ├── favicon.ico              # サイトファビコン
│   ├── logo.svg                 # サイトロゴ
│   └── icons/                   # 各種アイコンファイル
├── styles/                      # グローバルスタイル
│   └── globals.css              # グローバルCSS（Tailwind設定含む）
├── locales/                     # 多言語化リソース
│   ├── ja/                      # 日本語
│   │   └── translation.json     # 日本語翻訳リソース
│   ├── en/                      # 英語
│   │   └── translation.json     # 英語翻訳リソース
│   └── zh/                      # 中国語
│       └── translation.json     # 中国語翻訳リソース
└── functions/                   # Cloud Functions
    ├── package.json             # Cloud Functions依存関係
    ├── index.js                 # メインCloud Functions（通知等）
    └── utils/                   # Cloud Functions用ユーティリティ
        ├── slack.js             # Slack通知関連関数
        └── notifications.js     # 通知処理関数
```

## 主要コンポーネントと機能の詳細説明

### データモデル（Firestore）

#### 1. cylinders コレクション
```javascript
{
  id: "auto-generated",           // ドキュメントID
  cylinderId: "ABC123",           // 容器番号
  gasType: "酸素",                // ガスの種類
  location: "実験室A",            // 設置場所
  initialPressure: 14.7,          // 初期圧力（MPa）
  currentPressure: 10.2,          // 現在圧力（MPa）
  registrationDate: timestamp,    // 登録日時
  returnDeadline: timestamp,      // 返却期限
  returnDate: timestamp || null,  // 返却日時（返却済みの場合のみ）
  qrCodeId: "QR001",              // 紐付けQRコード
  status: "active",               // ステータス（active/returned）
  notes: "研究プロジェクトA用"     // 備考
}
```

#### 2. pressureHistory コレクション
```javascript
{
  id: "auto-generated",           // ドキュメントID
  cylinderId: "cy123",            // ボンベのドキュメントID参照
  cylinderNumber: "ABC123",       // 検索用容器番号
  recordedAt: timestamp,          // 記録日時
  pressure: 10.2,                 // 記録圧力（MPa）
  recordedBy: "山田太郎"          // 記録者
}
```

#### 3. qrCodes コレクション
```javascript
{
  id: "QR001",                    // QRコードID
  cylinderId: "cy123" || null,    // 紐付けボンベID（未使用の場合はnull）
  status: "unused",               // ステータス（unused/used）
  createdAt: timestamp            // 作成日時
}
```

#### 4. settings コレクション
```javascript
{
  id: "system",                   // システム設定ID（固定）
  lowPressureThreshold: 3.0,      // 低残圧閾値（MPa）
  deadlineWarningDays: 14,        // 返却期限警告日数
  slackWebhookUrl: "https://hooks.slack.com/...", // Slack通知URL
  notificationTime: "09:00",      // 通知時刻（毎週月曜実行）
  language: "ja"                  // デフォルト言語
}
```

### 主要ページ詳細

#### 1. index.js（ダッシュボード）
- メイン画面でボンベ一覧をカード形式で表示
- フィルタリング・検索機能を提供
- 「全て」「低残圧」「返却期限間近」のタブ切り替え
- 各ボンベカードはクリックで詳細モーダルを表示
- 新規ボンベ登録ボタン（モーダルフォーム表示）

#### 2. statistics.js（統計情報）
- ガス種ごとの保有本数・平均残圧のサマリーテーブル
- 月別新規登録本数の棒グラフ（直近12ヶ月）
- ガス種別使用本数の円グラフ（オプション）

#### 3. settings.js（設定ページ）
- 低残圧閾値、期限警告日数の設定
- Slack Webhook URLの設定
- 通知時間の設定
- デフォルト言語設定

#### 4. qr-manager.js（QRコード管理）
- QRコード生成フォーム（生成数指定）
- 生成済みQRコード一覧表示（使用中/未使用でフィルタリング可能）
- QRコード印刷用レイアウト表示
- ボンベとQRコードの紐付け管理（オプション）

#### 5. scan.js（QRスキャン結果）
- スキャンされたQRコードのボンベ情報表示
- ボンベ詳細情報（容器番号、気体種類、設置場所、圧力等）
- 圧力履歴グラフ（Recharts利用）
- 現在圧力記録フォーム

### 主要コンポーネント詳細

#### 1. CylinderCard.js
```javascript
// CylinderCard.js の基本構造
import React from 'react';
import { Badge, Card } from '../UI';
import { formatDate, calculateRemainingDays } from '../../lib/utils/date';
import { useTranslation } from 'react-i18next';

const CylinderCard = ({ cylinder, onClick }) => {
  const { t } = useTranslation();
  const remainingDays = calculateRemainingDays(cylinder.returnDeadline);
  const isLowPressure = cylinder.currentPressure <= 3.0; // 実際には設定値から取得
  
  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium">{cylinder.cylinderId}</h3>
        {isLowPressure && (
          <Badge type="warning">{t('lowPressure')}</Badge>
        )}
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <p>{cylinder.gasType}</p>
        <p>{t('location')}: {cylinder.location}</p>
        <p>{t('pressure')}: {cylinder.currentPressure} MPa</p>
        <p>{t('returnDeadline')}: {formatDate(cylinder.returnDeadline)}</p>
        <p>{t('remainingDays')}: {remainingDays} {t('days')}</p>
      </div>
    </Card>
  );
};

export default CylinderCard;
```

#### 2. PressureChart.js
```javascript
// PressureChart.js の基本構造
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { formatDateShort } from '../../lib/utils/date';

const PressureChart = ({ pressureHistory }) => {
  const { t } = useTranslation();
  
  // 日付順にソート
  const sortedData = [...pressureHistory].sort((a, b) => a.recordedAt - b.recordedAt);
  
  // グラフ表示用にデータを加工
  const chartData = sortedData.map(record => ({
    date: formatDateShort(record.recordedAt),
    pressure: record.pressure,
  }));

  return (
    <div className="h-64 w-full">
      <h4 className="text-md font-medium mb-2">{t('pressureHistory')}</h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 'dataMax + 2']} />
          <Tooltip />
          <Line type="monotone" dataKey="pressure" stroke="#3B82F6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PressureChart;
```

#### 3. QRCodeGenerator.js
```javascript
// QRCodeGenerator.js の基本構造
import React, { useState } from 'react';
import { Button, Input } from '../UI';
import { useTranslation } from 'react-i18next';
import { useQRCodes } from '../../lib/hooks/useQRCodes';

const QRCodeGenerator = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(1);
  const { generateQRCodes, loading } = useQRCodes();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (count > 0) {
      await generateQRCodes(count);
      setCount(1);
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">{t('generateQRCodes')}</h2>
      <form onSubmit={handleSubmit} className="flex items-end gap-4">
        <div>
          <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-1">
            {t('count')}
          </label>
          <Input
            id="count"
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? t('generating') : t('generate')}
        </Button>
      </form>
    </div>
  );
};

export default QRCodeGenerator;
```

### カスタムフック詳細

#### 1. useCylinders.js
```javascript
// useCylinders.js の基本構造
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export const useCylinders = () => {
  const [cylinders, setCylinders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ボンベ一覧を取得
  const fetchCylinders = async (status = 'active') => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'cylinders'),
        where('status', '==', status),
        orderBy('registrationDate', 'desc')
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCylinders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // ボンベ登録
  const addCylinder = async (cylinderData) => {
    try {
      const docRef = await addDoc(collection(db, 'cylinders'), {
        ...cylinderData,
        registrationDate: new Date(),
        status: 'active'
      });
      return docRef.id;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  // ボンベ更新
  const updateCylinder = async (id, data) => {
    try {
      await updateDoc(doc(db, 'cylinders', id), data);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  // ボンベ返却処理（論理削除）
  const returnCylinder = async (id, qrCodeId) => {
    try {
      // トランザクションで処理するべき
      await updateDoc(doc(db, 'cylinders', id), {
        status: 'returned',
        returnDate: new Date()
      });
      
      // QRコードのステータスを未使用に戻す
      if (qrCodeId) {
        await updateDoc(doc(db, 'qrCodes', qrCodeId), {
          status: 'unused',
          cylinderId: null
        });
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  // 初期データ読み込み
  useEffect(() => {
    fetchCylinders();
  }, []);
  
  return {
    cylinders,
    loading,
    error,
    fetchCylinders,
    addCylinder,
    updateCylinder,
    returnCylinder
  };
};
```

#### 2. usePressureHistory.js
```javascript
// usePressureHistory.js の基本構造
import { useState } from 'react';
import { collection, query, where, orderBy, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const usePressureHistory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 特定ボンベの履歴取得
  const fetchPressureHistory = async (cylinderId) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'pressureHistory'),
        where('cylinderId', '==', cylinderId),
        orderBy('recordedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  // 圧力記録追加
  const recordPressure = async (cylinderId, cylinderNumber, pressure, recordedBy) => {
    try {
      await addDoc(collection(db, 'pressureHistory'), {
        cylinderId,
        cylinderNumber,
        pressure,
        recordedBy,
        recordedAt: new Date()
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  return {
    loading,
    error,
    fetchPressureHistory,
    recordPressure
  };
};
```

### Cloud Functions 詳細

#### index.js (Cloud Functions)
```javascript
// Cloud Functions の基本構造
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { sendSlackNotification } = require('./utils/slack');

admin.initializeApp();
const db = admin.firestore();

// 毎週月曜9時に実行する定期通知
exports.weeklyNotification = functions.pubsub
  .schedule('0 9 * * 1')
  .timeZone('Asia/Tokyo')
  .onRun(async (context) => {
    try {
      // システム設定を取得
      const settingsDoc = await db.collection('settings').doc('system').get();
      if (!settingsDoc.exists) {
        console.error('System settings not found');
        return null;
      }
      
      const settings = settingsDoc.data();
      const { lowPressureThreshold, deadlineWarningDays, slackWebhookUrl } = settings;
      
      if (!slackWebhookUrl) {
        console.error('Slack webhook URL not configured');
        return null;
      }
      
      // 現在日時
      const now = admin.firestore.Timestamp.now();
      
      // 低残圧ボンベを取得
      const lowPressureQuery = await db.collection('cylinders')
        .where('status', '==', 'active')
        .where('currentPressure', '<=', lowPressureThreshold)
        .get();
        
      const lowPressureCylinders = lowPressureQuery.docs.map(doc => doc.data());
      
      // 返却期限間近ボンベを取得
      const deadlineDate = new Date();
      deadlineDate.setDate(deadlineDate.getDate() + deadlineWarningDays);
      const deadlineTimestamp = admin.firestore.Timestamp.fromDate(deadlineDate);
      
      const deadlineQuery = await db.collection('cylinders')
        .where('status', '==', 'active')
        .where('returnDeadline', '<=', deadlineTimestamp)
        .get();
        
      const deadlineCylinders = deadlineQuery.docs.map(doc => doc.data());
      
      // Slack通知メッセージを構築
      let message = '*ガスボンベ管理システム通知*\n\n';
      
      if (lowPressureCylinders.length > 0) {
        message += `*低残圧ボンベ (${lowPressureCylinders.length}本)*\n`;
        lowPressureCylinders.forEach(cylinder => {
          message += `- ${cylinder.cylinderId} (${cylinder.gasType}): ${cylinder.currentPressure}MPa, 場所: ${cylinder.location}\n`;
        });
        message += '\n';
      }
      
      if (deadlineCylinders.length > 0) {
        message += `*返却期限間近ボンベ (${deadlineCylinders.length}本)*\n`;
        deadlineCylinders.forEach(cylinder => {
          const deadline = cylinder.returnDeadline.toDate();
          const daysLeft = Math.ceil((deadline - now.toDate()) / (1000 * 60 * 60 * 24));
          message += `- ${cylinder.cylinderId} (${cylinder.gasType}): 期限まであと${daysLeft}日, 場所: ${cylinder.location}\n`;
        });
      }
      
      // 通知対象がない場合は終了
      if (lowPressureCylinders.length === 0 && deadlineCylinders.length === 0) {
        console.log('No cylinders need notification');
        return null;
      }
      
      // Slack通知を送信
      await sendSlackNotification(slackWebhookUrl, message);
      console.log('Notification sent successfully');
      
      return null;
    } catch (error) {
      console.error('Error sending notification:', error);
      return null;
    }
  });

// 圧力記録時に自動的にボンベの現在圧力を更新
exports.updateCylinderPressure = functions.firestore
  .document('pressureHistory/{historyId}')
  .onCreate(async (snapshot, context) => {
    try {
      const pressureRecord = snapshot.data();
      const { cylinderId, pressure } = pressureRecord;
      
      // ボンベドキュメントを更新
      await db.collection('cylinders').doc(cylinderId).update({
        currentPressure: pressure
      });
      
      console.log(`Updated pressure for cylinder ${cylinderId} to ${pressure} MPa`);
      return null;
    } catch (error) {
      console.error('Error updating cylinder pressure:', error);
      return null;
    }
  });
```

### i18n 設定詳細

#### _app.js（i18n初期化）
```javascript
// _app.js の基本構造
import React, { useEffect } from 'react';
import { Layout } from '../components/Layout/Layout';
import { initReactI18next, useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useSettings } from '../lib/hooks/useSettings';
import '../styles/globals.css';

// 言語リソースのインポート
import jaTranslation from '../locales/ja/translation.json';
import enTranslation from '../locales/en/translation.json';
import zhTranslation from '../locales/zh/translation.json';

// i18n初期化
i18n
  .use(initReactI18next)
  .init({
    resources: {
      ja: { translation: jaTranslation },
      en: { translation: enTranslation },
      zh: { translation: zhTranslation }
    },
    lng: 'ja', // デフォルト言語
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

function MyApp({ Component, pageProps }) {
  const { settings } = useSettings();
  const { i18n } = useTranslation();
  
  // 設定から言語を取得・設定
  useEffect(() => {
    if (settings && settings.language) {
      i18n.changeLanguage(settings.language);
    }
  }, [settings, i18n]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```

### 多言語化ファイル例

#### locales/ja/translation.json
```json
{
  "appTitle": "ガスボンベ管理システム",
  "dashboard": "ダッシュボード",
  "statistics": "統計情報",
  "settings": "設定",
  "qrManager": "QRコード管理",
  "all": "全て",
  "lowPressure": "低残圧",
  "returnDeadline": "返却期限",
  "deadlineComing": "期限間近",
  "remaining": "残",
  "days": "日",
  "location": "設置場所",
  "gasType": "ガスの種類",
  "pressure": "圧力",
  "currentPressure": "現在圧力",
  "initialPressure": "初期圧力",
  "cylinderId": "容器番号",
  "registrationDate": "登録日",
  "returnDate": "返却日",
  "status": "状態",
  "notes": "備考",
  "active": "使用中",
  "returned": "返却済",
  "addNew": "新規登録",
  "edit": "編集",
  "save": "保存",
  "cancel": "キャンセル",
  "delete": "削除",
  "confirmReturn": "返却処理",
  "search": "検索",
  "filter": "フィルター",
  "recordPressure": "圧力を記録",
  "recordedBy": "記録者",
  "pressureHistory": "圧力履歴",
  "generateQRCodes": "QRコード生成",
  "count": "生成数",
  "generate": "生成",
  "generating": "生成中",
  "qrCodeList": "QRコード一覧",
  "printQRCodes": "印刷",
  "usedStatus": "使用中",
  "unusedStatus": "未使用",
  "lowPressureThreshold": "低残圧閾値",
  "deadlineWarningDays": "期限警告日数",
  "slackWebhookUrl": "Slack Webhook URL",
  "notificationTime": "通知時間",
  "language": "言語",
  "japanese": "日本語",
  "english": "英語",
  "chinese": "中国語",
  "saveSettings": "設定を保存",
  "settingsSaved": "設定を保存しました",
  "cylinderSummary": "ガスボンベ集計",
  "totalCylinders": "総本数",
  "averagePressure": "平均残圧",
  "monthlyRegistration": "月別登録数",
  "month": "月",
  "noData": "データがありません",
  "scanResult": "スキャン結果",
  "recordedSuccessfully": "記録しました",
  "errorOccurred": "エラーが発生しました",
  "confirmReturnMessage": "このボンベを返却済みにしますか？",
  "yes": "はい",
  "no": "いいえ",
  "loading": "読み込み中...",
  "requiredField": "必須項目です",
  "invalidValue": "無効な値です"
}
