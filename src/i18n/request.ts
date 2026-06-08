import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

// ドメインごとに分割したメッセージファイル。並行編集の衝突を避けるため分割している。
const MESSAGE_DOMAINS = ['core', 'about', 'service', 'recruit', 'home'] as const;

type Messages = Record<string, unknown>;

function isPlainObject(value: unknown): value is Messages {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** ネストした namespace を保持したままディープマージする */
function deepMerge(target: Messages, source: Messages): Messages {
  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = target[key];
    if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
      target[key] = deepMerge({ ...targetValue }, sourceValue);
    } else {
      target[key] = sourceValue;
    }
  }
  return target;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const loaded = await Promise.all(
    MESSAGE_DOMAINS.map(
      async (domain) =>
        (await import(`../../messages/${locale}/${domain}.json`)).default as Messages,
    ),
  );

  const messages = loaded.reduce<Messages>((acc, part) => deepMerge(acc, part), {});

  return { locale, messages };
});
