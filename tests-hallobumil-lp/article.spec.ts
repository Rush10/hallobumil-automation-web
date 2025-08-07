import { test, expect, type Page } from '@playwright/test';
import * as Utils from '../hb-lp-utils/utils';
import * as Constant from '../hb-lp-utils/constant';

test.describe('List Article Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(Constant.LIST_ARTICLE_PAGE);
  });
  
  //TITLE
  test('should has title', async ({ page }) => {
    await expect(page).toHaveTitle('Artikel Kehamilan & Parenting Terlengkap untuk Mama');
  });

  //HEADER
  test('should has header section', async ({ page }) => {
    await Utils.verifyHeader(page, false);
  }); 

  //ARTICLE CATEGORY CHIPS & HIGHLIGHT 
  test('should has category chips & article highlight section', async ({ page }) => {
    await expect(page.getByText('Bacaan Untuk Mama')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Semua Topik' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Pra Kehamilan' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Kehamilan', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Pasca Kehamilan' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Resep Makanan' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Artikel Favorit' })).toBeVisible();
  });

  test('should allow me to see all article', async ({ page }) => {
    await page.getByRole('button', { name: 'Pra Kehamilan' }).click();
    await page.getByRole('button', { name: 'Semua Topik' }).click();
    await expect(page).toHaveURL(Constant.LIST_ARTICLE_PAGE);
    await expect(page.getByRole('heading', { name: 'Artikel Favorit' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Kumpulan Artikel Hallobumil' })).toBeVisible();
  });

  test('should allow me to filter the article to category pre-pregnancy article when clicked on category pre-pregnancy', async ({ page }) => {
    await page.getByRole('button', { name: 'Pra Kehamilan' }).click();
    await expect(page).toHaveURL(Constant.LIST_PH1_ARTICLE_PAGE);
    await expect(page.getByRole('heading', { name: 'Artikel Favorit' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Kumpulan Artikel Pra Kehamilan' })).toBeVisible();
  });
  
  test('should allow me to filter the article to category pregnancy article when clicked on category pregnancy', async ({ page }) => {
    await page.getByRole('button', { name: 'Kehamilan', exact: true }).click();
    await expect(page).toHaveURL(Constant.LIST_PH2_ARTICLE_PAGE);
    await expect(page.getByRole('heading', { name: 'Artikel Favorit' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Kumpulan Artikel Kehamilan' })).toBeVisible();
  });

  test('should allow me to filter the article to category post-pregnancy article when clicked on category post-pregnancy', async ({ page }) => {
    await page.getByRole('button', { name: 'Pasca Kehamilan' }).click();
    await expect(page).toHaveURL(Constant.LIST_PH3_ARTICLE_PAGE);
    await expect(page.getByRole('heading', { name: 'Artikel Favorit' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Kumpulan Artikel Pasca' })).toBeVisible();
  });

  test('should allow me to filter the article to category recipe article when clicked on category recipe', async ({ page }) => {
    await page.getByRole('button', { name: 'Resep Makanan' }).click();
    await expect(page).toHaveURL(Constant.LIST_RECIPE_ARTICLE_PAGE);
    await expect(page.getByRole('heading', { name: 'Artikel Favorit' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Inspirasi Resep Pilihan Mama' })).toBeVisible();
  });

  //LIST ALL ARTICLE
  test('should has list all article section', async ({ page}) => {  
    await expect(page.getByRole('heading', { name: 'Kumpulan Artikel Hallobumil' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Artikel Lainnya' })).toBeVisible();
  });

  //!!
  // test('should allow me to add more article to the list article', async ({ page }) => {
  //   await page.getByRole('button', { name: 'Artikel Lainnya' }).click();
  // });

  //CTA DOWNLOAD
  test('should has CTA download section', async ({ page }) => {
    await page.getByText('Baca lewat aplikasi lebih').click();
    await expect(page.getByRole('button', { name: 'Download Sekarang' })).toBeVisible();
  });

  test('should allow me to go to hallobumil app on playstore/appstore when clicked on download button', async ({ page, browserName }) => {
    await page.getByRole('button', { name: 'Download Sekarang' }).click();
    
    const storePagePromise = page.waitForEvent('popup');
    if(browserName == 'webkit'){
      const storePage = await storePagePromise;
      await expect(storePage).toHaveURL(Constant.HB_APP_APPSTORE_URL);
    }else{
      const storePage = await storePagePromise;
      await expect(storePage).toHaveURL(Constant.HB_APP_PLAYSTORE_URL);
    }
  });

  //FOOTER
  test('should has footer section', async ({ page }) => {
    await Utils.verifyFooter(page);
  });
});

//Only For Staging Environment & Non Login User
test.describe('Detail Pre-Pregnancy Article Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(Constant.DETAIL_PH1_ARTICLE_PAGE);
  });
  
  //TITLE
  test('should has title', async ({ page }) => {
    await expect(page).toHaveTitle('Test Pre-Pregnancy Article');
  });

  //HEADER
  test('should has header section', async ({ page }) => {
    await Utils.verifyHeader(page, false);
  }); 

  //BREADCRUMBS
  test('should has breadcrumbs section', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Artikel', exact: true })).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'Pra Kehamilan/' }).getByRole('link')).toBeVisible();
    await expect(page.getByText('Test Pre Pregnancy Article')).toBeVisible();
  }); 

  test('should allow me to see list all article when clicked on article button (breadcrumbs)', async ({ page }) => {
    await page.getByRole('link', { name: 'Artikel', exact: true }).click();
    await Utils.verifyListAllArticlePage(page);
  });

  test('should allow me to see list pre-pregnancy article when clicked on article category button (breadcrumbs)', async ({ page }) => {
    await page.locator('span').filter({ hasText: 'Pra Kehamilan/' }).getByRole('link').click();
    await Utils.verifyListPrePregnancyArticlePage(page);
  });

  //TITLE
  test('should has title section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Test Pre-Pregnancy Article' })).toBeVisible();
    await expect(page.locator('#detail-artikel-pra-kehamilan')).toBeVisible();
  }); 

  test('should allow me to see list pre-pregnancy article when clicked on article category button', async ({ page }) => {
    await page.locator('#detail-artikel-pra-kehamilan').click();
    await Utils.verifyListPrePregnancyArticlePage(page);
  });

  //AUTHOR
  test('should has author section', async ({ page }) => {
    await expect(page.locator('span').filter({ hasText: 'Tim Ahli Hallobumil |' }).locator('span')).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'Ditinjau oleh Tim Ahli' }).locator('span')).toBeVisible();
  }); 

  //SHARE #1
  test('should has share section #1', async ({ page }) => {
    await expect(page.locator('div').filter({ hasText: /^Pra KehamilanBagikan$/ }).getByRole('article')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Pra KehamilanBagikan$/ }).locator('#detail-artikel-Facebook')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Pra KehamilanBagikan$/ }).locator('#detail-artikel-Twitter')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Pra KehamilanBagikan$/ }).locator('#detail-artikel-WA')).toBeVisible();
    await expect(page.locator('#CopyLink').getByRole('img', { name: 'copylink' })).toBeVisible();
  }); 

  test('should allow me to share the article to facebook when clicked on facebook icon button #1', async ({ page }) => {
    await page.locator('div').filter({ hasText: /^Pra KehamilanBagikan$/ }).locator('#detail-artikel-Facebook').click();
    const sharePagePromise = page.waitForEvent('popup');
    const sharePage = await sharePagePromise;
    await expect(sharePage).toHaveURL('https://www.facebook.com/sharer/sharer.php?u=https://stg.hallobumil.com/pra-kehamilan/test-pre-pregnancy-article');
  });

  test('should allow me to share the article to twitter when clicked on twitter icon button #1', async ({ page }) => {
    await page.locator('div').filter({ hasText: /^Pra KehamilanBagikan$/ }).locator('#detail-artikel-Twitter').click();
    const sharePagePromise = page.waitForEvent('popup');
    const sharePage = await sharePagePromise;
    await expect(sharePage).toHaveURL('https://x.com/intent/post?url=https%3A%2F%2Fstg.hallobumil.com%2Fpra-kehamilan%2Ftest-pre-pregnancy-article');
  }); 

  test('should allow me to share the article to whatsapp when clicked on whatsapp icon button #1', async ({ page }) => {
    await page.locator('div').filter({ hasText: /^Pra KehamilanBagikan$/ }).locator('#detail-artikel-WA').click();
    const sharePagePromise = page.waitForEvent('popup');
    const sharePage = await sharePagePromise;
    await expect(sharePage).toHaveURL('https://api.whatsapp.com/send?text=https://stg.hallobumil.com/pra-kehamilan/test-pre-pregnancy-article');
  }); 

  test('should allow me to copy the article link when clicked on copy icon button #1', async ({ page, headless }) => {
    test.skip(headless, 'This test is for headed mode due to visual differences.');

    await page.locator('#CopyLink').getByRole('img', { name: 'copylink' }).click();
    await expect(page.getByText('Copied')).toBeVisible();
    await expect(page.getByRole('button').filter({ hasText: 'X' })).toBeVisible();  
    await page.getByRole('button').filter({ hasText: 'X' }).click();  
    await expect(page.getByText('Copied')).not.toBeVisible();
  }); 

  //SHORT DESCRIPTION
  test('should has short description section', async ({ page }) => {
    await expect(page.getByText('Test Pre-Pregnancy Article Short Desc')).toBeVisible();
  }); 

  //IMAGE
  test('should has article image section', async ({ page }) => {
    await expect(page.getByRole('img', { name: 'test-pre-pregnancy-article' })).toBeVisible();
  }); 

  //CONTENT
  test('should has content section', async ({ page }) => {
    await expect(page.getByText('Test Pre-Pregnancy Article Body')).toBeVisible();
  }); 

  //REFERENCE
  test('should has reference section', async ({ page }) => {
    await expect(page.locator('div').filter({ hasText: /^Referensi$/ }).nth(1)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Icon Arrow Referensi' })).toBeVisible();
  }); 

  test('should allow me to open/close reference when clicked on reference section', async ({ page }) => {
    await page.getByRole('button', { name: 'Icon Arrow Referensi' }).click();
    await expect(page.getByText('Test Pre-Pregnancy Article Reference')).toBeVisible();
    await page.getByRole('button', { name: 'Icon Arrow Referensi' }).click();
    await expect(page.getByText('Test Pre-Pregnancy Article Reference')).not.toBeVisible();
  }); 

  //CTA DOWNLOAD
  test('should has CTA download section', async ({ page }) => {
    await expect(page.getByText('Baca lewat aplikasi lebih')).toBeVisible();
    await expect(page.locator('#download-sekarang')).toBeVisible();
  });

  test('should allow me to go to hallobumil app on playstore/appstore when clicked on download button', async ({ page, browserName }) => {
    await page.locator('#download-sekarang').click();
    
    const storePagePromise = page.waitForEvent('popup');
    if(browserName == 'webkit'){
      const storePage = await storePagePromise;
      await expect(storePage).toHaveURL(Constant.HB_APP_APPSTORE_URL);
    }else{
      const storePage = await storePagePromise;
      await expect(storePage).toHaveURL(Constant.HB_APP_PLAYSTORE_URL);
    }
  });

  //USER INTERACTION
  test('should has user interaction section', async ({ page }) => {
    await expect(page.locator('#detail-artikel-bookmark').getByRole('img')).toBeVisible();
    await expect(page.locator('#detail-artikel-like').getByRole('img')).toBeVisible();
    await expect(page.locator('#detail-artikel-comments').getByRole('img')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Lihat semua komentar' })).toBeVisible();
  });

  test('should allow me to show cta login modal when clicked on bookmark icon button', async ({ page }) => {
    await page.locator('#detail-artikel-bookmark').getByRole('img').click();
    await Utils.verifyCTALoginModal(page);
  });

  test('should allow me to show cta login modal when clicked on like icon button', async ({ page }) => {
    await page.locator('#detail-artikel-like').getByRole('img').click();
    await Utils.verifyCTALoginModal(page);
  });

  test('should allow me to show cta login modal when clicked on comment icon button', async ({ page }) => {
    await page.locator('#detail-artikel-comments').getByRole('img').click();
    await Utils.verifyCTALoginModal(page);
  });

  test('should allow me to show cta download modal when clicked on see all comment button', async ({ page }) => {
    await page.getByRole('button', { name: 'Lihat semua komentar' }).click();
    await Utils.verifyCTADownloadModal(page);
  });

  //SHARE #2
  test('should has share section #2', async ({ page }) => {
    await expect(page.getByText('Bagikan').nth(1)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Facebook' }).nth(1)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Twitter' }).nth(1)).toBeVisible();
    await expect(page.getByRole('link', { name: 'WA' }).nth(1)).toBeVisible();
    await expect(page.locator('#detail-artikel-CopyLink').getByRole('img', { name: 'copylink' })).toBeVisible();
  }); 

  test('should allow me to share the article to facebook when clicked on facebook icon button #2', async ({ page }) => {
    await page.getByRole('link', { name: 'Facebook' }).nth(1).click();
    const sharePagePromise = page.waitForEvent('popup');
    const sharePage = await sharePagePromise;
    await expect(sharePage).toHaveURL('https://www.facebook.com/sharer/sharer.php?u=https://stg.hallobumil.com/pra-kehamilan/test-pre-pregnancy-article');
  });

  test('should allow me to share the article to twitter when clicked on twitter icon button #2', async ({ page }) => {
    await page.getByRole('link', { name: 'Twitter' }).nth(1).click();
    const sharePagePromise = page.waitForEvent('popup');
    const sharePage = await sharePagePromise;
    await expect(sharePage).toHaveURL('https://x.com/intent/post?url=https%3A%2F%2Fstg.hallobumil.com%2Fpra-kehamilan%2Ftest-pre-pregnancy-article');
  }); 

  test('should allow me to share the article to whatsapp when clicked on whatsapp icon button #2', async ({ page }) => {
    await page.getByRole('link', { name: 'WA' }).nth(1).click();
    const sharePagePromise = page.waitForEvent('popup');
    const sharePage = await sharePagePromise;
    await expect(sharePage).toHaveURL('https://api.whatsapp.com/send?text=https://stg.hallobumil.com/pra-kehamilan/test-pre-pregnancy-article');
  }); 

  test('should allow me to copy the article link when clicked on copy icon button #2', async ({ page, headless }) => {
    test.skip(headless, 'This test is for headed mode due to visual differences.');

    await page.locator('#detail-artikel-CopyLink').getByRole('img', { name: 'copylink' }).click();
    await expect(page.getByText('Copied')).toBeVisible();
    await expect(page.getByRole('button').filter({ hasText: 'X' })).toBeVisible();  
    await page.getByRole('button').filter({ hasText: 'X' }).click();  
    await expect(page.getByText('Copied')).not.toBeVisible();
  }); 

  //OTHER ARTICLE
  test('should has other article section', async ({ page }) => {
    await expect(page.getByText('Artikel Lainnya untuk Mama')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cek semua artikel' })).toBeVisible();
  });

  test('should allow me to go to list article page when clicked on see all article button', async ({ page }) => {
    await page.getByRole('link', { name: 'Cek semua artikel' }).click()
    await Utils.verifyListAllArticlePage(page);
  });

  //COMMUNITY
  test('should has community section', async ({ page }) => {
    await expect(page.getByText('Saling Dukung dan Berbagi')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Gabung Komunitas Program Hamil' })).toBeVisible();
    await expect(page.getByRole('main').getByRole('img', { name: 'image' })).toBeVisible();
  });

  test('should allow me to go to whatsapp group invitation link when clicked on join community button', async ({ page }) => {
    await page.getByRole('button', { name: 'Gabung Komunitas Program Hamil' }).click();
    const communityPagePromise = page.waitForEvent('popup');
    const communityPage = await communityPagePromise;  
    const communityPageURL = communityPage.url();
    expect(communityPageURL).toContain(Constant.HB_WA_CHAT_PAGE);
  }); 

  //FOOTER
  test('should has footer section', async ({ page }) => {
    await Utils.verifyFooter(page);
  });
});

// test.afterEach(async ({ page }) => {
//   await page.close();
// });

