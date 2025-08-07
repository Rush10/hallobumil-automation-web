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

test.describe('Detail Pre-Pregnancy Article Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(Constant.DETAIL_PH1_ARTICLE_PAGE);
  });
  
  //TITLE
  test('should has title', async ({ page }) => {
    await expect(page).toHaveTitle('Test Pre-Pregnancy Article');
  });

  // //HEADER
  // test('should has header section', async ({ page }) => {
  //   await Utils.verifyHeader(page, false);
  // }); 
});

