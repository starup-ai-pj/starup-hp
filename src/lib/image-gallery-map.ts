/**
 * Image gallery configuration for member pages
 * Maps member slugs to their personalized photo collections and settings
 */

export interface GalleryImageSource {
  type: 'local' | 'unsplash'
  url: string
}

export interface MemberGalleryData {
  bgColor: string
  images: GalleryImageSource[]
}

type MemberGalleryConfig = {
  [slug: string]: MemberGalleryData
}

const memberGalleryConfig: MemberGalleryConfig = {
  'daigo-fujii': {
    bgColor: 'rgb(235, 235, 235)', // 白っぽい背景
    images: [
      // Local images
      { type: 'local', url: '/images/member/daigo-fujii/B745B9C8-2A42-43B0-95CD-B7A31D95842F.jpg' },
      { type: 'local', url: '/images/member/daigo-fujii/IMG_1382.jpg' },
      { type: 'local', url: '/images/member/daigo-fujii/IMG_2341.jpg' },
      { type: 'local', url: '/images/member/daigo-fujii/IMG_2912.jpg' },
      { type: 'local', url: '/images/member/daigo-fujii/IMG_3392.jpg' },
      { type: 'local', url: '/images/member/daigo-fujii/IMG_3704.jpg' },
      { type: 'local', url: '/images/member/daigo-fujii/IMG_4791.jpg' },
      { type: 'local', url: '/images/member/daigo-fujii/IMG_5016.jpg' },
      { type: 'local', url: '/images/member/daigo-fujii/IMG_5667.jpg' },
      { type: 'local', url: '/images/member/daigo-fujii/IMG_7775.jpg' },
      { type: 'local', url: '/images/member/daigo-fujii/IMG_8762.jpg' },
      { type: 'local', url: '/images/member/daigo-fujii/IMG_9474.jpg' },

      // Unsplash images
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=800&q=80' }, // 黄色とピンクの背景の絵
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1663868652528-04970e627cc2?w=800&q=80' }, // 本を持つ手
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1592832343983-48e2b801d129?w=800&q=80' }, // 昼間の川に浮かぶ白と青のボート
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1495473351003-ba0a460f7961?w=800&q=80' }, // 夜間の黒い高層ビル
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1443706340763-4b60757a36ce?w=800&q=80' }, // 緑の芝生の広角写真
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&q=80' }, // アソートタイトルブックロット / ホッキョクグマ
      { type: 'unsplash', url: 'https://plus.unsplash.com/premium_photo-1666256629479-d049bc3cf40b?w=800&q=80' }, // 砂浜の上でサーフボードに乗る男
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1724178395638-42b12b1a6238?w=800&q=80' }, // 空を背景にした大きな空のスタジアム
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1500805987811-1913fdec59e6?w=800&q=80' }, // 夜間のライト付き店舗サイネージ
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1462392627162-2baa2b3518a8?w=800&q=80' }, // 茶色の木製棚の本
      { type: 'unsplash', url: 'https://plus.unsplash.com/premium_photo-1673843714930-f214274eb201?w=800&q=80' }, // 昼間白い雲の下の海岸近くの2本のココヤシの木
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?w=800&q=80' }, // 木々を背景にした雪の中の小道
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1576341912554-68bf44eeab7d?w=800&q=80' }, // ビール入り透明なグラス
      { type: 'unsplash', url: 'https://images.unsplash.com/vector-1746720020454-48761cc07922?w=800&q=80' }, // 茶色の木製棚
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?w=800&q=80' }, // 茶色の木製の床に茶色と白の羊
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1495473351003-ba0a460f7961?w=800&q=80' }, // OKジェスチャーを手作業で行います
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1443706340763-4b60757a36ce?w=800&q=80' }, // 4棟の高層ビルのローアングル撮影
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=800&q=80' }, // 追加 (繰り返し)
    ],
  },
  'yuki-tanaka': {
    bgColor: 'rgb(40, 40, 40)', // 黒っぽい背景
    images: [
      // Local images
      { type: 'local', url: '/images/member/yuki-tanaka/8DA9839C-58EB-48E4-8E19-EF3B208A0B42.jpg' },
      { type: 'local', url: '/images/member/yuki-tanaka/IMG_1107.jpg' },
      { type: 'local', url: '/images/member/yuki-tanaka/IMG_1176.jpg' },
      { type: 'local', url: '/images/member/yuki-tanaka/IMG_1384.jpg' },
      { type: 'local', url: '/images/member/yuki-tanaka/IMG_3006.jpg' },
      { type: 'local', url: '/images/member/yuki-tanaka/IMG_3217.jpg' },
      { type: 'local', url: '/images/member/yuki-tanaka/IMG_5016.jpg' },
      { type: 'local', url: '/images/member/yuki-tanaka/IMG_5740.jpg' },
      { type: 'local', url: '/images/member/yuki-tanaka/IMG_6024.jpg' },
      { type: 'local', url: '/images/member/yuki-tanaka/IMG_6077.png' },

      // Unsplash images
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1601113329251-0aebe217bdbe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1621750627159-cf77b0b91aac?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3131' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2275' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1328' },
      { type: 'unsplash', url: 'https://plus.unsplash.com/premium_photo-1670505062582-fdaa83c23c9e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2671' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1529078155058-5d716f45d604?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2669' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1701523600650-007b393ed2fe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2669' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1521805103424-d8f8430e8933?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
    ],
  },
  'haruki-kimura': {
    bgColor: 'rgb(52, 48, 48)',
    images: [
      // Local images
      { type: 'local', url: '/images/member/kimura-haruki/034.JPG' },
      { type: 'local', url: '/images/member/kimura-haruki/IMG_0539.jpg' },
      { type: 'local', url: '/images/member/kimura-haruki/IMG_1127.jpeg' },
      { type: 'local', url: '/images/member/kimura-haruki/IMG_1301.png' },
      { type: 'local', url: '/images/member/kimura-haruki/IMG_1302.jpg' },
      { type: 'local', url: '/images/member/kimura-haruki/IMG_1350.jpeg' },
      { type: 'local', url: '/images/member/kimura-haruki/IMG_6780.jpeg' },

      // Unsplash images
      { type: 'unsplash', url: 'https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1557409518-691ebcd96038?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1597205820234-31fd66836ca2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1288' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1684803880836-724f1ee0e5de?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1525230071276-4a87f42f469e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1585442581492-a4f38c1cfc14?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2148' },
      { type: 'unsplash', url: 'https://plus.unsplash.com/premium_photo-1682144776432-0bad9b656462?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1455165814004-1126a7199f9b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://plus.unsplash.com/premium_photo-1682144922945-09786c2988dc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1992' },
      { type: 'unsplash', url: 'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1612321990915-cc47f5e98896?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1335' },
      { type: 'unsplash', url: 'https://plus.unsplash.com/premium_photo-1682391039938-e9782294c1a3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2050' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1626775238053-4315516eedc9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2673' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1604345250885-11f528eec3ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2719' },
    ],
  },
  'takehiro-kikkawa': {
    bgColor: 'rgb(23, 34, 27)',
    images: [
      // Local images
      { type: 'local', url: '/images/member/takehiro-kikkawa/IMG_0746.jpg' },
      { type: 'local', url: '/images/member/takehiro-kikkawa/IMG_1512.jpg' },
      { type: 'local', url: '/images/member/takehiro-kikkawa/IMG_4767.jpg' },
      { type: 'local', url: '/images/member/takehiro-kikkawa/IMG_5810.jpg' },
      { type: 'local', url: '/images/member/takehiro-kikkawa/IMG_6569.jpg' },

      // Unsplash images
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1662805522314-d316b95046b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1630175772812-3368aad7982d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1635547821500-77542481940c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1579837916352-c6a72e5d52da?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2274' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1579832524311-1ba96cf6636a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1227' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1709076905613-c711890e5bd9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1555037015-1498966bcd7c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1503149779833-1de50ebe5f8a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1335' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1659374432717-8ab765971655?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1290' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1657174280282-a5a3c9d09a9c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1301' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1675536275862-d688dcd67c2d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2669' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1656488095446-0701db831f9e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2274' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1675150277436-9c7348972c11?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2664' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1668072921628-6e024f6aadd8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1558980664-2cd663cf8dde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1558981001-5864b3250a69?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1434569117012-ce134ee1a088?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1535242208474-9a2793260ca8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1364' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1568687692035-fb816ea12e07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1752854046725-5195a1ee4709?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3130' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1574238752695-675b86d49267?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1655855055440-bb76fc92e1ba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
      { type: 'unsplash', url: 'https://images.unsplash.com/photo-1730979221568-c380d63b755c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670' },
    ],
  },
}

/**
 * Get gallery configuration for a specific member
 * @param slug - Member slug
 * @returns Gallery data (bgColor and images) or null if not found
 */
export function getMemberGalleryData(slug: string): MemberGalleryData | null {
  return memberGalleryConfig[slug] || null
}

/**
 * Get default gallery images (fallback)
 * @param count - Number of default images to generate
 * @returns Array of default image sources
 */
export function getDefaultGalleryImages(count: number = 180): GalleryImageSource[] {
  return Array.from({ length: count }, (_, index) => ({
    type: 'unsplash' as const,
    url: `https://images.unsplash.com/photo-${1500000000000 + index}?w=800&q=80`,
  }))
}
