import { getAllNewsForList } from '../src/lib/news'
import { getAllRecruitsForList } from '../src/lib/recruit'

async function checkImages() {
  try {
    // News
    console.log('\n=== NEWS IMAGES ===');
    const news = await getAllNewsForList();

    news.forEach((item, index) => {
      console.log(`\nNews ${index + 1}:`);
      console.log('ID:', item.id);
      console.log('Title:', item.title);
      console.log('Image URL:', item.imageUrl);
      console.log('URL starts with:', item.imageUrl.substring(0, 50));
    });

    // Recruit
    console.log('\n\n=== RECRUIT IMAGES ===');
    const recruits = await getAllRecruitsForList();

    recruits.forEach((item, index) => {
      console.log(`\nRecruit ${index + 1}:`);
      console.log('ID:', item.id);
      console.log('Title:', item.title);
      console.log('Image URL:', item.imageUrl);
      console.log('URL starts with:', item.imageUrl.substring(0, 50));
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

checkImages();
