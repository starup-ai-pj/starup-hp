/**
 * List All Accessible Databases
 * Integrationでアクセス可能なすべてのデータベースをリスト表示
 */

import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

// .env.localを読み込み
dotenv.config({ path: '.env.local' })

const NOTION_API_KEY = process.env.NOTION_API_KEY

if (!NOTION_API_KEY) {
  console.error('❌ エラー: NOTION_API_KEY が設定されていません')
  process.exit(1)
}

const notion = new Client({ auth: NOTION_API_KEY })

async function listAllDatabases() {
  try {
    console.log('🚀 Integrationでアクセス可能なデータベースを検索中...\n')

    // すべてのデータベースを検索
    const response = await notion.search({
      filter: {
        property: 'object',
        value: 'data_source',
      },
      page_size: 100,
    })

    if (response.results.length === 0) {
      console.log('⚠️  アクセス可能なデータベースが見つかりませんでした')
      return
    }

    console.log('='.repeat(80))
    console.log(`📋 アクセス可能なデータベース (${response.results.length}件)`)
    console.log('='.repeat(80))

    for (const db of response.results) {
      // @ts-expect-error - Notion API の型定義の問題を回避
      const title = db.title?.[0]?.plain_text || '(タイトルなし)'
      console.log(`\n📌 タイトル: "${title}"`)
      console.log(`   Object: ${db.object}`)
      console.log(`   ID: ${db.id}`)
      console.log(`   URL: ${db.url}`)

      // プロパティ一覧を表示
      // @ts-expect-error - Notion API の型定義の問題を回避
      const properties = db.properties || {}
      const propNames = Object.keys(properties)
      if (propNames.length > 0) {
        console.log(`   プロパティ: ${propNames.join(', ')}`)
      }
    }

    console.log('\n' + '='.repeat(80))

    // member-contentを含むデータベースを検索
    console.log('\n🔍 "member" または "content" を含むデータベースを検索中...\n')

    const memberDatabases = response.results.filter(db => {
      // @ts-expect-error - Notion API の型定義の問題を回避
      const title = (db.title?.[0]?.plain_text || '').toLowerCase()
      return title.includes('member') || title.includes('content')
    })

    if (memberDatabases.length > 0) {
      console.log('✅ 該当するデータベース:')
      for (const db of memberDatabases) {
        // @ts-expect-error - Notion API の型定義の問題を回避
        const title = db.title?.[0]?.plain_text || '(タイトルなし)'
        console.log(`\n   📌 "${title}"`)
        console.log(`      ID: ${db.id}`)
      }
    } else {
      console.log('⚠️  "member" または "content" を含むデータベースが見つかりませんでした')
    }

    console.log('\n✅ 検索完了')

  } catch (error: any) {
    console.error('❌ エラーが発生しました:')
    if (error.code === 'unauthorized') {
      console.error('認証エラー: API キーが無効です。')
    } else {
      console.error(error.message || error)
    }
    process.exit(1)
  }
}

listAllDatabases()
