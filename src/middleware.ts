import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // /api・静的アセット・拡張子付きファイル(robots.txt, sitemap.xml, opengraph-image 等)は除外
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
