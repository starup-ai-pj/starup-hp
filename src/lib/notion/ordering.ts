/**
 * 一覧の並べ替えヘルパー
 * Notion の sorts 取得後に、アプリ側で安定ソートを上乗せするための汎用関数。
 * プロパティ名は呼び出し側（各ドメイン）が渡すため、DB構造の知識はここに持たせない。
 */

import { NotionPage } from './types'
import { getNumber } from './fields'

/**
 * 手動並び順（number プロパティ）で昇順に並べ替える。
 * - 値が小さいものほど上に来る。
 * - 未設定 / プロパティ未追加のレコードは最後尾に回す（= まだ番号を振っていないものは下）。
 * - Array.prototype.sort は安定ソートのため、番号が同値・未設定同士の並びは
 *   Notion の sorts（Date 降順）の結果がそのまま維持される。
 *   → 「Order 優先、未設定は Date 降順」を、Order プロパティが無くても壊さず実現する。
 */
export function byManualOrder(property: string) {
  return (pages: NotionPage[]): NotionPage[] =>
    [...pages].sort((a, b) => {
      const va = getNumber(a, property) ?? Number.POSITIVE_INFINITY
      const vb = getNumber(b, property) ?? Number.POSITIVE_INFINITY
      return va - vb
    })
}
