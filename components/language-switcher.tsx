// ...言語切り替えコンポーネント雛形...
'use client';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../lib/i18n';

// 進捗率: 約80%

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const labels: Record<string, string> = {
    ja: '日本語',
    en: 'English',
    zh: '中文',
    fr: 'Français',
    de: 'Deutsch',
    sv: 'Svenska',
    ar: 'العربية'
  };
  return (
    <select value={language} onChange={e => setLanguage(e.target.value)} className="border p-1 rounded">
      {languages.map(lang => (
        <option key={lang} value={lang}>{labels[lang] || lang}</option>
      ))}
    </select>
  );
}
