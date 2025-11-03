const https = require('https');

// Final Unsplash URLs from image-gallery-map.ts
const unsplashUrls = [
  'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=800&q=80',
  'https://images.unsplash.com/photo-1663868652528-04970e627cc2?w=800&q=80',
  'https://images.unsplash.com/photo-1592832343983-48e2b801d129?w=800&q=80',
  'https://images.unsplash.com/photo-1495473351003-ba0a460f7961?w=800&q=80',
  'https://images.unsplash.com/photo-1443706340763-4b60757a36ce?w=800&q=80',
  'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&q=80',
  'https://plus.unsplash.com/premium_photo-1666256629479-d049bc3cf40b?w=800&q=80',
  'https://images.unsplash.com/photo-1724178395638-42b12b1a6238?w=800&q=80',
  'https://images.unsplash.com/photo-1500805987811-1913fdec59e6?w=800&q=80',
  'https://images.unsplash.com/photo-1462392627162-2baa2b3518a8?w=800&q=80',
  'https://plus.unsplash.com/premium_photo-1673843714930-f214274eb201?w=800&q=80',
  'https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?w=800&q=80',
  'https://images.unsplash.com/photo-1576341912554-68bf44eeab7d?w=800&q=80',
  'https://images.unsplash.com/vector-1746720020454-48761cc07922?w=800&q=80',
  'https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?w=800&q=80',
];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { method: 'HEAD' }, (res) => {
      resolve({
        url,
        status: res.statusCode,
        ok: res.statusCode >= 200 && res.statusCode < 300,
      });
    }).on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        ok: false,
        error: err.message,
      });
    });
  });
}

async function checkAllUrls() {
  console.log('=== Verifying Final Unsplash URLs ===\n');

  const results = [];

  for (let i = 0; i < unsplashUrls.length; i++) {
    const url = unsplashUrls[i];
    console.log(`[${i + 1}/${unsplashUrls.length}] Checking...`);

    const result = await checkUrl(url);
    results.push(result);

    if (result.ok) {
      console.log(`  ✅ OK (${result.status})\n`);
    } else {
      console.log(`  ❌ FAILED (${result.status})\n`);
    }

    // Small delay
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log('\n=== SUMMARY ===\n');

  const failed = results.filter(r => !r.ok);
  const passed = results.filter(r => r.ok);

  console.log(`Total URLs: ${results.length}`);
  console.log(`✅ Passed: ${passed.length}`);
  console.log(`❌ Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.log('\n=== FAILED URLs ===\n');
    failed.forEach((result, index) => {
      console.log(`${index + 1}. Status ${result.status}`);
      console.log(`   ${result.url}`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
      console.log('');
    });
  } else {
    console.log('\n🎉 All URLs are working correctly!');
  }
}

checkAllUrls().catch(console.error);
