import { expect, type Page } from '@playwright/test';

export async function verifyHeader(page: Page, isLogin: Boolean) {
  await expect(page.locator('#header-logo-hb')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Cari...' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'search' })).toBeVisible();

  if(!isLogin){
    await expect(page.getByRole('button', { name: 'Daftar' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Masuk' })).toBeVisible();
  }else{
    await expect(page.getByRole('button', { name: 'Daftar' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Masuk' })).toHaveCount(0);
  }

  await expect(page.getByRole('link').filter({ hasText: 'Beranda' })).toBeVisible();
  await expect(page.getByRole('link').filter({ hasText: /^Artikel$/ })).toBeVisible();
  await expect(page.getByRole('link').filter({ hasText: /^Komunitas$/ })).toBeVisible();
  await expect(page.getByRole('link').filter({ hasText: 'Info Acara' })).toBeVisible();
  await expect(page.getByRole('link').filter({ hasText: 'Hitung Masa Subur' })).toBeVisible();
  await expect(page.getByRole('link').filter({ hasText: 'Hitung HPL' })).toBeVisible();
  await expect(page.getByRole('link').filter({ hasText: 'Hubungi Kami' }).first()).toBeVisible();
}

export async function verifyFooter(page: Page){
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
