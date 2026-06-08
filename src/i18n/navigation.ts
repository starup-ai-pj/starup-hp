import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// locale を意識した Link / router / usePathname を提供する。
// usePathname は locale プレフィックスを取り除いたパスを返す。
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
