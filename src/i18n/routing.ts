import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
  // 日本語はプレフィックスなし (/about)、英語のみ /en/about にする
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
