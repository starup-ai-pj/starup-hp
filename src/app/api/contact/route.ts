import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const dataSourceId = process.env.NOTION_DATA_SOURCE_ID
const slackBotToken = process.env.SLACK_BOT_TOKEN
const slackChannelId = process.env.SLACK_CHANNEL_ID

// Slackに通知を送信する関数（Bot Token方式）
async function sendSlackNotification(data: {
  name: string
  company: string
  subject: string
  email: string
  message: string
  notionPageUrl: string
  notionPageId: string
}) {
  if (!slackBotToken || !slackChannelId) {
    console.warn('SLACK_BOT_TOKEN or SLACK_CHANNEL_ID is not set, skipping Slack notification')
    return
  }

  // 件名のラベルマッピング
  const subjectLabels: { [key: string]: string } = {
    'general': '💬 お問い合わせ',
    'business': '🤝 ビジネスパートナーシップ',
    'career': '💼 キャリア採用',
    'support': '🔧 サポート'
  }

  const subjectLabel = subjectLabels[data.subject] || data.subject
  const timestamp = new Date().toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const iconUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/images/slack-bot/starup-icon-white-line.png`

  const slackMessage = {
    channel: slackChannelId,
    username: 'J.A.R.V.I.S.',
    icon_url: iconUrl,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'STARUP HPよりお問い合わせ',
          emoji: true
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${subjectLabel}*`
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*氏名:* ${data.name}\n\n*会社名:* ${data.company || '未記入'}\n\n*メールアドレス:* ${data.email}\n\n*受信日時:* ${timestamp}`
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*📝 メッセージ内容*\n${data.message.length > 500 ? data.message.substring(0, 500) + '...' : data.message}`
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Notionで詳細を確認',
              emoji: true
            },
            url: data.notionPageUrl,
            style: 'primary'
          }
        ]
      }
    ]
  }

  try {
    console.log('Sending Slack message:', JSON.stringify(slackMessage, null, 2))

    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${slackBotToken}`
      },
      body: JSON.stringify(slackMessage),
    })

    const result = await response.json()

    if (!result.ok) {
      console.error('Slack API error details:', JSON.stringify(result, null, 2))
      throw new Error(`Slack API error: ${result.error}`)
    }

    console.log('Successfully sent Slack notification')
  } catch (error) {
    console.error('Failed to send Slack notification:', error)
    // Slack通知の失敗はエラーとして扱わない
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, subject, email, message } = body

    console.log('Received data:', { name, company, subject, email, message })

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      )
    }

    if (!dataSourceId) {
      console.error('NOTION_DATA_SOURCE_ID is not set')
      return NextResponse.json(
        { error: 'サーバー設定エラー' },
        { status: 500 }
      )
    }

    console.log('Using data source ID:', dataSourceId)

    // Notionにデータを追加
    const notionResponse = await notion.pages.create({
      parent: {
        type: 'data_source_id',
        data_source_id: dataSourceId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        email: {
          email: email,
        },
        company: {
          rich_text: [
            {
              text: {
                content: company || '',
              },
            },
          ],
        },
        subject: {
          rich_text: [
            {
              text: {
                content: subject || '',
              },
            },
          ],
        },
        message: {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
      },
    })

    console.log('Successfully created page:', notionResponse.id)

    // NotionページのURLを生成
    const notionPageUrl = `https://www.notion.so/${notionResponse.id.replace(/-/g, '')}`

    // Slackに通知を送信（Notionページのリンク付き）
    await sendSlackNotification({
      name,
      company,
      subject,
      email,
      message,
      notionPageUrl,
      notionPageId: notionResponse.id
    })

    return NextResponse.json(
      { success: true, id: notionResponse.id },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Notion API Error:', error)
    console.error('Error details:', error.body || error.message)
    return NextResponse.json(
      { error: 'データの保存に失敗しました', details: error.message },
      { status: 500 }
    )
  }
}
