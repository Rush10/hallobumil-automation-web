import { test, expect, type Page } from '@playwright/test';
import * as Utils from '../hb-lp-utils/utils';
import * as Constant from '../hb-lp-utils/constant';

test.beforeEach(async ({ page }) => {
  await page.goto(Constant.DEFAULT_PAGE);
});

test.describe('Home/Main Page', () => {
  
  //TITLE
  test('should has title', async ({ page }) => {
    await expect(page).toHaveTitle('Hallobumil #MengertiMama - Aplikasi Kehamilan & Parenting Mama');
  });

  //HEADER
  test('should has header', async ({ page }) => {
    await Utils.verifyHeader(page, false);
  }); 

  //CTA DOWNLOAD 1
  test('should has CTA download 1 section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Hallobumil #MengertiMama' })).toBeVisible();
    await expect(page.getByRole('main').locator('#home-play-store').getByRole('img', { name: 'image' })).toBeVisible();
    await expect(page.getByRole('main').locator('#home-app-store').getByRole('img', { name: 'image' })).toBeVisible();
    await expect(page.getByRole('main').getByRole('img', { name: 'image', exact: true }).nth(2)).toBeVisible();
  });

  test('should allow me to go to hallobumil app on playstore when clicked on playstore icon', async ({ page, browserName }) => {
    const storePagePromise = page.waitForEvent('popup');
    await page.getByRole('main').locator('#home-play-store').getByRole('img', { name: 'image' }).click();
    
    if(browserName == 'webkit'){
      const storePage = await storePagePromise;
      await expect(storePage).toHaveURL(Constant.HB_APP_APPSTORE_URL);
    }else{
      const storePage = await storePagePromise;
      await expect(storePage).toHaveURL(Constant.HB_APP_PLAYSTORE_URL);
    }
  });

  test('should allow me to go to hallobumil app on playstore when clicked on appstore icon', async ({ page, browserName }) => {
    const storePagePromise = page.waitForEvent('popup');
    await page.getByRole('main').locator('#home-app-store').getByRole('img', { name: 'image' }).click()
    
    if(browserName == 'webkit'){
      const storePage = await storePagePromise;
      await expect(storePage).toHaveURL(Constant.HB_APP_APPSTORE_URL);
    }else{
      const storePage = await storePagePromise;
      await expect(storePage).toHaveURL(Constant.HB_APP_PLAYSTORE_URL);
    }
  });

  //FEATURE EXPLANATION
  test('should has feature explanation section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Bantu Mama rencanain' })).toBeVisible();
    //pre-pregnancy
    await expect(page.getByRole('img', { name: 'image-atribut-journey1' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Fase Pra Kehamilan' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'image-journey1' })).toBeVisible();
    //pregnancy
    await expect(page.getByRole('img', { name: 'image-atribut-journey2' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'image-journey-' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Fase Kehamilan' })).toBeVisible();
    //post-pregnancy
    await expect(page.getByRole('heading', { name: 'Fase Tumbuh Kembang Anak' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'image-journey3' })).toBeVisible();
  });

  //ARTICLE RECOMMNENDATION (!!!)
  test('should has article recommendation section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Bacaan untuk Mama' })).toBeVisible();
    await expect(page.locator('.slick-slide.slick-active').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Lihat Semua Artikel' })).toBeVisible();
  });

  test('should allow me to go to list article page when clicked on see all article button', async ({ page, baseURL }) => {
    await page.getByRole('link', { name: 'Lihat Semua Artikel' }).click()
    
    await expect(page).toHaveURL(baseURL + Constant.LIST_ARTICLE_PAGE);
    await expect(page.getByRole('heading', { name: 'Kumpulan Artikel Hallobumil' })).toBeVisible();
  });

  //PROMO (!!!)
  test('should has promo section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Promo Menarik Buat Mama' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Prenagen' })).toBeVisible(); //!!!
  });

  test('should allow me to go to promo link when clicked on a promo', async ({ page }) => {
    const prenagenPagePromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Prenagen' }).click(); //!!!
    const prenagenPage = await prenagenPagePromise;
    await expect(prenagenPage).toHaveURL('https://www.prenagen.com/id');
    await expect(prenagenPage.getByRole('link', { name: 'Prenagen', exact: true })).toBeVisible();
  });

  //EVENT (!!!)
  test('should has event section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Event Spesial buat Mama' })).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^zzzzzzz15 Jul 202513:40 - 13:42 WIBEvent OfflineTest Nara 2Lihat Detail$/ }).nth(2)).toBeVisible(); //!!!
    await expect(page.getByRole('link', { name: 'Lihat Semua Event' })).toBeVisible();
  });

  test('should allow me to go to list event page when clicked on see all event button', async ({ page, baseURL }) => {
    await page.getByRole('link', { name: 'Lihat Semua Event' }).click();
    
    await expect(page).toHaveURL(baseURL + Constant.LIST_EVENT_PAGE);
    await expect(page.getByRole('heading', { name: 'Semua Event' })).toBeVisible();
  });

  //COMMUNITY
  test('should has community section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Yuk Ma, gabung dengan' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Lihat Komunitas' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'komunitas-section' })).toBeVisible();
  });

  test('should allow me to go to community page when clicked on see community button', async ({ page, baseURL }) => {
    await page.getByRole('button', { name: 'Lihat Komunitas' }).click();
    
    await expect(page).toHaveURL(baseURL + Constant.COMMUNITY_PAGE);
    await expect(page.getByRole('heading', { name: 'Tentang Komunitas Hallobumil' })).toBeVisible();
  });

  //TESTIMONY (!!!)
  test('should has testimony section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Cerita dari Mama' })).toBeVisible();
    await expect(page.getByText('love banget sama apps iniJohn').nth(1)).toBeVisible(); //!!!
  });

  //FAQ (!!!)
  test('should has faq section', async ({ page }) => {
    await expect(page.locator('span').filter({ hasText: 'FAQ' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sering ditanyakan' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'faq landing-page Apa saja' })).toBeVisible(); //!!!
    await expect(page.getByRole('link', { name: 'Hubungi Kami Yuk, Ma' })).toBeVisible();
  });

  //CTA DOWNLOAD 2
  test('should has CTA download 2 section', async ({ page }) => {
    await expect(page.getByText('Semua yang Mama dan Papa Butuhkan Ada di HallobumilDari perencanaan, kehamilan')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Download Sekarang' })).toBeVisible();
    await expect(page.getByRole('main').getByRole('img', { name: 'Image', exact: true })).toBeVisible();
  });

  test('should allow me to go to hallobumil app on playstore when clicked on download button', async ({ page, browserName }) => {
    const storePagePromise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Download Sekarang' }).click();
    
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

