const https = require('https');

// Unsplash photo IDs from the URLs provided by user
const photoIds = [
  'PjVkPaKdp3M', // 黄色とピンクの背景の絵
  '7WGrC9J7skg', // 本を持つ手
  '-iXMoAUDX4o', // 昼間の川に浮かぶ白と青のボート
  'sxnuzW9ZWu0', // 夜間の黒い高層ビル
  'uBqykD-ejsY', // 緑の芝生の広角写真
  'FDzRG30DeVM', // アソートタイトルブックロット
  'qQWV91TTBrE', // 日中の雪に覆われた地面のホッキョクグマ
  'j6SMGak8v4A', // 砂浜の上でサーフボードに乗る男
  'Z6X0tpN9kQY', // 空を背景にした大きな空のスタジアム
  'j50aeDzf92g', // 夜間のライト付き店舗サイネージ
  'P8gLaJ-PZL0', // 茶色の木製棚の本
  'AD6rn3vqG7o', // 昼間白い雲の下の海岸近くの2本のココヤシの木
  'zqWi0K5KoGs', // 木々を背景にした雪の中の小道
  'Qy2KMPRV3X4', // ビール入り透明なグラス
  'ZEp1ekh2Mjw', // 茶色の木製棚
  '2Af7POLf1Z4', // 茶色の木製の床に茶色と白の羊
  'P_omd-Xvn1M', // OKジェスチャーを手作業で行います
  'Nl_FMFpXo2g', // 4棟の高層ビルのローアングル撮影
];

// Try Unsplash Source API format
console.log('Testing Unsplash Source API format:\n');

photoIds.forEach((photoId, index) => {
  const sourceUrl = `https://source.unsplash.com/${photoId}/800x800`;
  console.log(`${index + 1}. Photo ID: ${photoId}`);
  console.log(`   Source API URL: ${sourceUrl}`);
  console.log(`   Suggested URL: https://images.unsplash.com/${photoId}?w=800&q=80\n`);
});

console.log('\n=== TypeScript Code ===\n');
console.log('const memberGalleryImages: MemberGalleryMap = {');
console.log('  \'daigo-fujii\': [');
console.log('    // Local images...');
console.log('');
console.log('    // Unsplash images (using Source API)');

photoIds.forEach((photoId, index) => {
  const descriptions = [
    '黄色とピンクの背景の絵',
    '本を持つ手',
    '昼間の川に浮かぶ白と青のボート',
    '夜間の黒い高層ビル',
    '緑の芝生の広角写真',
    'アソートタイトルブックロット',
    '日中の雪に覆われた地面のホッキョクグマ',
    '砂浜の上でサーフボードに乗る男',
    '空を背景にした大きな空のスタジアム',
    '夜間のライト付き店舗サイネージ',
    '茶色の木製棚の本',
    '昼間白い雲の下の海岸近くの2本のココヤシの木',
    '木々を背景にした雪の中の小道',
    'ビール入り透明なグラス',
    '茶色の木製棚',
    '茶色の木製の床に茶色と白の羊',
    'OKジェスチャーを手作業で行います',
    '4棟の高層ビルのローアングル撮影',
  ];

  console.log(`    { type: 'unsplash', url: 'https://source.unsplash.com/${photoId}/800x800' }, // ${descriptions[index]}`);
});

console.log('  ],');
console.log('};');
