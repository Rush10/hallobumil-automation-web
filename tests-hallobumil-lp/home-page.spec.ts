import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://stg.hallobumil.com/');
});

test.describe('Home/Main Page', () => {
  
  test('should has title', async ({ page }) => {
    await expect(page).toHaveTitle('Hallobumil #MengertiMama - Aplikasi Kehamilan & Parenting Mama');
  });

  test('should has header', async ({ page }) => {
    await verifyNonLoginHeader(page);
  });

  test('should has CTA download 1 section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Hallobumil #MengertiMama' })).toBeVisible();
    await expect(page.getByRole('main').locator('#home-play-store').getByRole('img', { name: 'image' })).toBeVisible();
    await expect(page.getByRole('main').locator('#home-app-store').getByRole('img', { name: 'image' })).toBeVisible();
    await expect(page.getByRole('main').getByRole('img', { name: 'image', exact: true }).nth(2)).toBeVisible();
  });

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

  test('should has recommendation article section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Bacaan untuk Mama' })).toBeVisible();
    await expect(page.locator('.slick-slide.slick-active').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Lihat Semua Artikel' })).toBeVisible();
  });

  test('should has promo section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Promo Menarik Buat Mama' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Prenagen' })).toBeVisible(); //!!!
  });

  test('should has event section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Event Spesial buat Mama' })).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^zzzzzzz15 Jul 202513:40 - 13:42 WIBEvent OfflineTest Nara 2Lihat Detail$/ }).nth(2)).toBeVisible(); //!!!
    await expect(page.getByRole('link', { name: 'Lihat Semua Event' })).toBeVisible();
  });

  test('should has community section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Yuk Ma, gabung dengan' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Lihat Komunitas' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'komunitas-section' })).toBeVisible();
  });

  test('should has testimony section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Cerita dari Mama' })).toBeVisible();
    await expect(page.getByText('love banget sama apps iniJohn').nth(1)).toBeVisible(); //!!!
  });

  test('should has faq section', async ({ page }) => {
    await expect(page.locator('span').filter({ hasText: 'FAQ' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sering ditanyakan' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'faq landing-page Apa saja' })).toBeVisible(); //!!!
    await expect(page.getByRole('link', { name: 'Hubungi Kami Yuk, Ma' })).toBeVisible();
  });

  test('should has CTA download 2 section', async ({ page }) => {
    await expect(page.getByText('Semua yang Mama dan Papa Butuhkan Ada di HallobumilDari perencanaan, kehamilan')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Download Sekarang' })).toBeVisible();
    await expect(page.getByRole('main').getByRole('img', { name: 'Image', exact: true })).toBeVisible();
  });

  test('should has footer section', async ({ page }) => {
    await verifyFooter(page);
  });
});

async function verifyNonLoginHeader(page: Page) {
  await expect(page.locator('#header-logo-hb')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Cari...' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'search' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Daftar' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Masuk' })).toBeVisible();
  await expect(page.getByRole('link').filter({ hasText: 'Beranda' })).toBeVisible();
  await expect(page.getByRole('link').filter({ hasText: /^Artikel$/ })).toBeVisible();
  await expect(page.getByRole('link').filter({ hasText: /^Komunitas$/ })).toBeVisible();
  await expect(page.getByRole('link').filter({ hasText: 'Info Acara' })).toBeVisible();
  await expect(page.getByRole('link').filter({ hasText: 'Hitung Masa Subur' })).toBeVisible();
  await expect(page.getByRole('link').filter({ hasText: 'Hitung HPL' })).toBeVisible();
  await expect(page.getByRole('link').filter({ hasText: 'Hubungi Kami' }).first()).toBeVisible();
}

async function verifyFooter(page: Page){
  await expect(page.locator('#footer-logo-hb')).toBeVisible();
  await expect(page.locator('#footer-syarat-dan-ketentuan-hb')).toBeVisible();
  await expect(page.locator('#footer-kebijakan-privasi-hb')).toBeVisible();
  await expect(page.locator('#footer-cookie-consent-hb')).toBeVisible();
  await expect(page.locator('#footer-persetujuan-pelanggan-hb')).toBeVisible();
  await expect(page.locator('#footer-persetujuan-pelanggan-anak-hb')).toBeVisible();
  await expect(page.locator('#footer-hubungi-kami')).toBeVisible();
  await expect(page.locator('footer #home-play-store').getByRole('img', { name: 'image' })).toBeVisible();
  await expect(page.locator('footer #home-app-store').getByRole('img', { name: 'image' })).toBeVisible();
  await expect(page.getByText('Media Sosial')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Facebook' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Instagram' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Tiktok' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Youtube' })).toBeVisible();
  await expect(page.getByText('HalloBumil. All rights reserved.')).toBeVisible();
}
