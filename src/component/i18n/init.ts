import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import localZh_CN from '@i18n/translate/zh-CN.json';
import localZh_HK from '@i18n/translate/zh-HK.json';
import localEn_US from '@i18n/translate/en-US.json';

/**
 * 区域性名称和标识符
 * https://www.runoob.com/note/33684
 */

export type LANGUAGE = 'zh-CN' | 'zh-HK' | 'en';
export const LANGUAGE_MAP: Record<LANGUAGE, { label: string }> = {
  en: { label: 'English' },
  ['zh-CN']: { label: '中文-简体' },
  ['zh-HK']: { label: '中文-繁体' },
};

const resources = {
  ['zh-CN']: {
    translation: localZh_CN,
  },
  ['zh-HK']: {
    translation: localZh_HK,
  },
  en: {
    translation: localEn_US,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      caches: ['localStorage'],
    },
  });

export default i18n;
