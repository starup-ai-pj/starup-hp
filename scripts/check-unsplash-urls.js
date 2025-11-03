const https = require('https');

// Unsplash URLs from image-gallery-map.ts (using Source API)
const unsplashUrls = [
  'https://source.unsplash.com/PjVkPaKdp3M/800x800',
  'https://source.unsplash.com/7WGrC9J7skg/800x800',
  'https://source.unsplash.com/-iXMoAUDX4o/800x800',
  'https://source.unsplash.com/sxnuzW9ZWu0/800x800',
  'https://source.unsplash.com/uBqykD-ejsY/800x800',
  'https://source.unsplash.com/FDzRG30DeVM/800x800',
  'https://source.unsplash.com/qQWV91TTBrE/800x800',
  'https://source.unsplash.com/j6SMGak8v4A/800x800',
  'https://source.unsplash.com/Z6X0tpN9kQY/800x800',
  'https://source.unsplash.com/j50aeDzf92g/800x800',
  'https://source.unsplash.com/P8gLaJ-PZL0/800x800',
  'https://source.unsplash.com/AD6rn3vqG7o/800x800',
  'https://source.unsplash.com/zqWi0K5KoGs/800x800',
  'https://source.unsplash.com/Qy2KMPRV3X4/800x800',
  'https://source.unsplash.com/ZEp1ekh2Mjw/800x800',
  'https://source.unsplash.com/2Af7POLf1Z4/800x800',
  'https://source.unsplash.com/P_omd-Xvn1M/800x800',
  'https://source.unsplash.com/Nl_FMFpXo2g/800x800',
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
  console.log('Checking Unsplash URLs...\n');

  const results = [];

  for (let i = 0; i < unsplashUrls.length; i++) {
    const url = unsplashUrls[i];
    console.log(`[${i + 1}/${unsplashUrls.length}] Checking: ${url}`);

    const result = await checkUrl(url);
    results.push(result);

    if (result.ok) {
      console.log(`  ✅ OK (${result.status})`);
    } else {
      console.log(`  ❌ FAILED (${result.status})`);
    }

    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n=== SUMMARY ===\n');

  const failed = results.filter(r => !r.ok);
  const passed = results.filter(r => r.ok);

  console.log(`Total: ${results.length}`);
  console.log(`Passed: ${passed.length}`);
  console.log(`Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.log('\n=== FAILED URLs ===\n');
    failed.forEach((result, index) => {
      console.log(`${index + 1}. Status ${result.status}: ${result.url}`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    });
  }
}

checkAllUrls().catch(console.error);
