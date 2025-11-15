/**
 * Notion Integrationでアクセス可能なデータベース一覧を取得
 */

async function listAccessibleDatabases() {
  const apiKey = process.env.NOTION_API_KEY

  if (!apiKey) {
    console.error('❌ NOTION_API_KEY が設定されていません')
    process.exit(1)
  }

  const NOTION_API_VERSION = '2022-06-28'
  const NOTION_API_BASE_URL = 'https://api.notion.com/v1'

  console.log('🔍 Notion Integrationでアクセス可能なデータベースを検索中...\n')

  try {
    // Notionの検索APIを使用してデータベースを取得
    const response = await fetch(`${NOTION_API_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_API_VERSION,
      },
      body: JSON.stringify({
        filter: {
          property: 'object',
          value: 'database'
        },
        page_size: 100
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ エラー:', errorText)
      process.exit(1)
    }

    const data = await response.json()

    if (data.results.length === 0) {
      console.log('⚠️  アクセス可能なデータベースが見つかりませんでした')
      console.log('\n💡 Notionでデータベースを開き、右上「...」→「接続」からIntegrationを追加してください')
      return
    }

    console.log(`✅ ${data.results.length}個のデータベースが見つかりました:\n`)
    console.log('=' .repeat(80))

    data.results.forEach((db: any, index: number) => {
      const title = db.title?.[0]?.plain_text || '(タイトルなし)'
      const id = db.id
      const url = db.url

      console.log(`\n${index + 1}. 【${title}】`)
      console.log(`   ID: ${id}`)
      console.log(`   URL: ${url}`)
      console.log(`   作成日: ${new Date(db.created_time).toLocaleString('ja-JP')}`)
      console.log(`   更新日: ${new Date(db.last_edited_time).toLocaleString('ja-JP')}`)

      // プロパティ一覧
      if (db.properties) {
        const props = Object.keys(db.properties).slice(0, 5)
        console.log(`   プロパティ: ${props.join(', ')}${Object.keys(db.properties).length > 5 ? '...' : ''}`)
      }
    })

    console.log('\n' + '='.repeat(80))
    console.log('\n📋 .env.local に設定する例:')
    console.log('=' .repeat(80))

    data.results.forEach((db: any) => {
      const title = db.title?.[0]?.plain_text || '(タイトルなし)'
      const id = db.id
      console.log(`# ${title}`)
      console.log(`NOTION_DATABASE_ID=${id}\n`)
    })

    // 環境変数との比較
    console.log('\n🔍 現在の環境変数との比較:')
    console.log('=' .repeat(80))

    const envVars = {
      'NOTION_NEWS_DATABASE_ID': process.env.NOTION_NEWS_DATABASE_ID,
      'NOTION_RECRUIT_DATABASE_ID': process.env.NOTION_RECRUIT_DATABASE_ID,
      'NOTION_MEMBER_DATABASE_ID': process.env.NOTION_MEMBER_DATABASE_ID,
    }

    const accessibleIds = data.results.map((db: any) => db.id)

    Object.entries(envVars).forEach(([key, value]) => {
      if (value) {
        const isAccessible = accessibleIds.includes(value)
        const status = isAccessible ? '✅ アクセス可能' : '❌ アクセス不可'
        const dbInfo = data.results.find((db: any) => db.id === value)
        const dbName = dbInfo?.title?.[0]?.plain_text || '(不明)'

        console.log(`\n${key}=${value}`)
        console.log(`  ${status}${isAccessible ? ` - 【${dbName}】` : ''}`)
      }
    })

    console.log('\n' + '='.repeat(80))

  } catch (error) {
    console.error('❌ エラーが発生しました:', error)
    process.exit(1)
  }
}

listAccessibleDatabases()
