import { test, expect, type Page } from '@playwright/test';
import * as Constant from '../hb-lp-utils/constant';

test.describe('Footer', () => {
  //term & condition (tac) button
  test('should allow me to go to TAC page when clicked on TAC button', async ({ page, baseURL }) => {
    await page.goto(Constant.DEFAULT_PAGE);
    await page.locator('#footer-syarat-dan-ketentuan-hb').click();
    await expect(page).toHaveURL(baseURL + Constant.TAC_CONSENT_PAGE);
  });
  
  //privacy policy button
  test('should allow me to go to privacy policy page when clicked on privacy policy button', async ({ page, baseURL }) => {
    await page.goto(Constant.DEFAULT_PAGE);
    await page.locator('#footer-kebijakan-privasi-hb').click();
    await expect(page).toHaveURL(baseURL + Constant.PRIVACY_POLICY_CONSENT_PAGE);
  });
  
  //cookie consent button
  test('should allow me to go to cookie consent page when clicked on cookie consent button', async ({ page, baseURL }) => {
    await page.goto(Constant.DEFAULT_PAGE);
    await page.locator('#footer-cookie-consent-hb').click();
    await expect(page).toHaveURL(baseURL + Constant.COOKIE_CONSENT_PAGE);
  });

  //user agreement button (navbar)
  test('should allow me to go to user agreement page when clicked on user agreement button', async ({ page, baseURL }) => {
    await page.goto(Constant.DEFAULT_PAGE);
    page.locator('#footer-persetujuan-pelanggan-hb').click();
    await expect(page).toHaveURL(baseURL + Constant.USER_AGREEMENT_CONSENT_PAGE);
  });

  //child user agreement button
  test('should allow me to go to child user agreement page when clicked on child user agreement button', async ({ page, baseURL }) => {
    await page.goto(Constant.DEFAULT_PAGE);
    page.locator('#footer-persetujuan-pelanggan-anak-hb').click();
    await expect(page).toHaveURL(baseURL + Constant.CHILD_USER_AGREEMENT_CONSENT_PAGE);
  });

  //contact us button
  test('should allow me to go to contact us page when clicked on contact us button', async ({ page, baseURL }) => {
    await page.goto(Constant.DEFAULT_PAGE);
    page.locator('#footer-hubungi-kami').click();
    await expect(page).toHaveURL(baseURL + Constant.CONTACT_US_PAGE);
  });

  //playstore icon
  test('should allow me to go to hallobumil app on playstore when clicked on playstore icon', async ({ page, browserName }) => {
    await page.locator('footer #home-play-store').getByRole('img', { name: 'image' }).click();
    
    const storePagePromise = page.waitForEvent('popup');
    if(browserName == 'webkit'){
      const storePage = await storePagePromise;
      await expect(storePage).toHaveURL(Constant.HB_APP_APPSTORE_URL);
    }else{
      const storePage = await storePagePromise;
      await expect(storePage).toHaveURL(Constant.HB_APP_PLAYSTORE_URL);
    }
  });

  //appstore icon
  test('should allow me to go to hallobumil app on playstore when clicked on appstore icon', async ({ page, browserName }) => {
    await page.locator('footer #home-app-store').getByRole('img', { name: 'image' }).click();
    
    const storePagePromise = page.waitForEvent('popup');
    if(browserName == 'webkit'){
      const storePage = await storePagePromise;
      await expect(storePage).toHaveURL(Constant.HB_APP_APPSTORE_URL);
    }else{
      const storePage = await storePagePromise;
      await expect(storePage).toHaveURL(Constant.HB_APP_PLAYSTORE_URL);
    }
  });

  //facebook icon
  test('should allow me to go to hallobumil account on facebook when clicked on facebook icon', async ({ page }) => {
    await page.getByRole('link', { name: 'Facebook' }).click();
    // await page.getByRole('link', { name: 'Facebook' }).click();

    await expect(page).toHaveURL(Constant.HB_FB_PAGE);

    // const fbPagePromise = page.waitForEvent('popup');
    // const fbPage = await fbPagePromise;
    // await expect(fbPage).toHaveURL(Constant.HB_FB_PAGE);
  });

  //instagram icon
  test('should allow me to go to hallobumil account on instagram when clicked on instagram icon', async ({ page }) => {
    await page.getByRole('link', { name: 'Instagram' }).click();
    // await page.getByRole('link', { name: 'Instagram' }).click();

    await expect(page).toHaveURL(Constant.HB_IG_PAGE);

    // const igPagePromise = page.waitForEvent('popup');
    // const igPage = await igPagePromise;
    // await expect(igPage).toHaveURL(Constant.HB_IG_PAGE);
  });

  //tiktok icon
  test('should allow me to go to hallobumil account on tiktok when clicked on tiktok icon', async ({ page }) => {
    await page.getByRole('link', { name: 'Tiktok' }).click();
    // await page.getByRole('link', { name: 'Tiktok' }).click();
  
    await expect(page).toHaveURL(Constant.HB_TIKTOK_PAGE);

    // const tiktokPagePromise = page.waitForEvent('popup');
    // const tiktokPage = await tiktokPagePromise;
    // await expect(tiktokPage).toHaveURL(Constant.HB_TIKTOK_PAGE);
  });

  //youtube icon
  test('should allow me to go to hallobumil account on youtube when clicked on youtube icon', async ({ page }) => {
    await page.getByRole('link', { name: 'Youtube' }).click();
    // await page.getByRole('link', { name: 'Youtube' }).click();
    
    await expect(page).toHaveURL(Constant.HB_YT_PAGE);

    // const ytPagePromise = page.waitForEvent('popup');await page.getByRole('link', { name: 'Youtube' }).click();
    // const ytPage = await ytPagePromise;
    // await expect(ytPage).toHaveURL(Constant.HB_YT_PAGE);
  });
});

