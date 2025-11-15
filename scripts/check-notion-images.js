async function checkImages() {
  try {
    // Dynamic import for ES modules
    const { queryDatabase } = await import('../src/lib/notion/client.js');

    // News Database
    console.log('\n=== NEWS DATABASE ===');
    const newsDb = await queryDatabase(process.env.NOTION_NEWS_DATABASE_ID);

    newsDb.forEach((page, index) => {
      console.log(`\nNews ${index + 1}:`);
      console.log('Title:', page.properties.Name?.title?.[0]?.plain_text || 'N/A');

      const thumbnail = page.properties.Thumbnail?.files?.[0];
      if (thumbnail) {
        console.log('Thumbnail type:', thumbnail.type);
        if (thumbnail.type === 'file') {
          console.log('File URL:', thumbnail.file.url);
          console.log('Expires at:', thumbnail.file.expiry_time);
        } else if (thumbnail.type === 'external') {
          console.log('External URL:', thumbnail.external.url);
        }
      } else {
        console.log('No thumbnail');
      }
    });

    // Recruit Database
    console.log('\n\n=== RECRUIT DATABASE ===');
    const recruitDb = await queryDatabase(process.env.NOTION_RECRUIT_DATABASE_ID);

    recruitDb.forEach((page, index) => {
      console.log(`\nRecruit ${index + 1}:`);
      console.log('Title:', page.properties.Name?.title?.[0]?.plain_text || 'N/A');

      const thumbnail = page.properties.Thumbnail?.files?.[0];
      if (thumbnail) {
        console.log('Thumbnail type:', thumbnail.type);
        if (thumbnail.type === 'file') {
          console.log('File URL:', thumbnail.file.url);
          console.log('Expires at:', thumbnail.file.expiry_time);
        } else if (thumbnail.type === 'external') {
          console.log('External URL:', thumbnail.external.url);
        }
      } else {
        console.log('No thumbnail');
      }
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

checkImages();
