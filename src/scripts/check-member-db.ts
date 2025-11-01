/**
 * Check Member Database Structure
 * メンバーデータベースの構造を確認するスクリプト
 */

import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

// .env.localを読み込み
dotenv.config({ path: '.env.local' })

const NOTION_API_KEY = process.env.NOTION_API_KEY
const MEMBER_DATABASE_ID = process.env.NOTION_MEMBER_DATABASE_ID

if (!NOTION_API_KEY) {
  console.error('❌ エラー: NOTION_API_KEY が設定されていません')
  process.exit(1)
}

if (!MEMBER_DATABASE_ID) {
  console.error('❌ エラー: NOTION_MEMBER_DATABASE_ID が設定されていません')
  process.exit(1)
}

const notion = new Client({ auth: NOTION_API_KEY })

async function checkMemberDatabase() {
  try {
    console.log('🚀 メンバーデータベースの構造を確認中...\n')
    console.log(`データベースID: ${MEMBER_DATABASE_ID}\n`)

    // データベースから最初のページを取得
    const response = await notion.dataSources.query({
      data_source_id: MEMBER_DATABASE_ID,
      page_size: 1,
    })

    if (response.results.length === 0) {
      console.log('⚠️  データベースにページが見つかりませんでした')
      console.log('データベースが空か、アクセス権限がない可能性があります')
      return
    }

    const firstPage = response.results[0]

    if (firstPage.object !== 'page') {
      console.error('❌ エラー: 想定外のオブジェクトタイプです')
      return
    }

    console.log('='.repeat(80))
    console.log('📋 データベースのプロパティ構造')
    console.log('='.repeat(80))

    // @ts-ignore - Notion API の型定義の問題を回避
    const properties = firstPage.properties

    for (const [propertyName, property] of Object.entries(properties)) {
      console.log(`\n📌 プロパティ名: "${propertyName}"`)
      console.log(`   タイプ: ${(property as any).type}`)
      console.log(`   ID: ${(property as any).id}`)

      // 値のサンプルを表示
      const prop = property as any
      switch (prop.type) {
        case 'title':
          console.log(`   値: ${prop.title?.[0]?.plain_text || '(空)'}`)
          break
        case 'rich_text':
          console.log(`   値: ${prop.rich_text?.[0]?.plain_text || '(空)'}`)
          break
        case 'unique_id':
          console.log(`   値: ${prop.unique_id?.prefix || ''}${prop.unique_id?.number || ''}`)
          break
        case 'select':
          console.log(`   値: ${prop.select?.name || '(空)'}`)
          break
        case 'multi_select':
          console.log(`   値: ${prop.multi_select?.map((s: any) => s.name).join(', ') || '(空)'}`)
          break
        case 'date':
          console.log(`   値: ${prop.date?.start || '(空)'}`)
          break
        case 'checkbox':
          console.log(`   値: ${prop.checkbox}`)
          break
        case 'url':
          console.log(`   値: ${prop.url || '(空)'}`)
          break
        case 'email':
          console.log(`   値: ${prop.email || '(空)'}`)
          break
        case 'phone_number':
          console.log(`   値: ${prop.phone_number || '(空)'}`)
          break
        case 'files':
          if (prop.files && prop.files.length > 0) {
            const file = prop.files[0]
            const url = file.type === 'file' ? file.file?.url : file.external?.url
            console.log(`   値: ${url || '(空)'}`)
          } else {
            console.log(`   値: (空)`)
          }
          break
        case 'number':
          console.log(`   値: ${prop.number !== null ? prop.number : '(空)'}`)
          break
        default:
          console.log(`   値: (サポートされていないタイプ)`)
      }
    }

    console.log('\n' + '='.repeat(80))
    console.log('\n✅ 構造確認完了\n')

    // 全ページ数を取得
    const allPages = await notion.dataSources.query({
      data_source_id: MEMBER_DATABASE_ID,
    })
    console.log(`📊 データベース内のページ数: ${allPages.results.length}`)

  } catch (error: any) {
    console.error('❌ エラーが発生しました:')
    if (error.code === 'object_not_found') {
      console.error('データベースが見つかりません。データベースIDを確認してください。')
      console.error('または、Notion Integrationにデータベースへのアクセス権限が付与されているか確認してください。')
    } else if (error.code === 'unauthorized') {
      console.error('認証エラー: API キーが無効か、アクセス権限がありません。')
    } else {
      console.error(error.message || error)
    }
    process.exit(1)
  }
}

checkMemberDatabase()
