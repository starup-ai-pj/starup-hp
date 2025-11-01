/**
 * Test Member Data Fetching
 * メンバーデータ取得のテスト
 */

import dotenv from 'dotenv'
import { getAllMembersForList } from '../lib/members'

// .env.localを読み込み
dotenv.config({ path: '.env.local' })

async function testMemberFetch() {
  try {
    console.log('🚀 メンバーデータの取得テストを開始\n')

    const members = await getAllMembersForList()

    console.log('='.repeat(80))
    console.log(`📋 取得したメンバー数: ${members.length}`)
    console.log('='.repeat(80))

    members.forEach((member, index) => {
      console.log(`\n${index + 1}. ${member.name} (${member.englishName})`)
      console.log(`   ID: ${member.id}`)
      console.log(`   役職: ${member.position}`)
      console.log(`   説明: ${member.description.substring(0, 80)}${member.description.length > 80 ? '...' : ''}`)
      console.log(`   画像: ${member.imageUrl}`)

      const socialLinks = []
      if (member.socialLinks?.twitter) socialLinks.push(`Twitter: ${member.socialLinks.twitter}`)
      if (member.socialLinks?.facebook) socialLinks.push(`Facebook: ${member.socialLinks.facebook}`)
      if (member.socialLinks?.linkedin) socialLinks.push(`LinkedIn: ${member.socialLinks.linkedin}`)

      if (socialLinks.length > 0) {
        console.log(`   SNS: ${socialLinks.join(', ')}`)
      }
    })

    console.log('\n' + '='.repeat(80))
    console.log('✅ テスト完了')

  } catch (error) {
    console.error('❌ エラーが発生しました:', error)
    process.exit(1)
  }
}

testMemberFetch()
