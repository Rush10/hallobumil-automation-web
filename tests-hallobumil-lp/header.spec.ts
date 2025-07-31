import { test, expect, type Page } from '@playwright/test';
import * as Constant from '../hb-lp-utils/constant';

test.describe('Header', () => {
  //hallobumil icon
  test('should allow me to go to home/main page when clicked on hallobumil icon', async ({ page }) => {
    await page.goto(Constant.LIST_ARTICLE_PAGE);
    await page.locator('#header-logo-hb').click();
    await expect(page).toHaveURL(Constant.DEFAULT_PAGE);
    await expect(page.getByRole('heading', { name: 'Hallobumil #MengertiMama' })).toBeVisible();
  });

  //home/main button (navbar)
  test('should allow me to go to home/main page when clicked on home button (navbar)', async ({ page }) => {
    await page.goto(Constant.COMMUNITY_PAGE);
    await page.getByRole('link').filter({ hasText: 'Beranda' }).click();
    await expect(page).toHaveURL(Constant.DEFAULT_PAGE);
    await expect(page.getByRole('heading', { name: 'Hallobumil #MengertiMama' })).toBeVisible();
  });

  //article button (navbar)
  test('should allow me to go to list article page when clicked on article button (navbar)', async ({ page }) => {
    await page.goto(Constant.DEFAULT_PAGE);
    await page.getByRole('link').filter({ hasText: /^Artikel$/ }).click();
    await expect(page).toHaveURL(Constant.LIST_ARTICLE_PAGE);
    await expect(page.getByRole('heading', { name: 'Kumpulan Artikel Hallobumil' })).toBeVisible();
  });

  //community button (navbar)
  test('should allow me to go to community page when clicked on community button (navbar)', async ({ page }) => {
    await page.goto(Constant.DEFAULT_PAGE);
    await page.getByRole('link').filter({ hasText: /^Komunitas$/ }).click();
    await expect(page).toHaveURL(Constant.COMMUNITY_PAGE);
    await expect(page.getByRole('heading', { name: 'Tentang Komunitas Hallobumil' })).toBeVisible();
  });

  //event button (navbar)
  test('should allow me to go to list event page when clicked on event button (navbar)', async ({ page }) => {
    await page.goto(Constant.DEFAULT_PAGE);
    await page.getByRole('link').filter({ hasText: 'Info Acara' }).click();
    await expect(page).toHaveURL(Constant.LIST_EVENT_PAGE);
    await expect(page.getByRole('heading', { name: 'Semua Event' })).toBeVisible();
  });

  //calculator button (navbar)
  test('should allow me to go to fertility calendar page when clicked on fertility calendar button (navbar)', async ({ page }) => {
    await page.goto(Constant.DEFAULT_PAGE);
    await page.getByRole('link').filter({ hasText: 'Hitung Masa Subur' }).click();
    await expect(page).toHaveURL(Constant.FERTILITY_CALENDAR_PAGE);
    await expect(page.getByRole('heading', { name: 'Perhitungan Masa Subur' })).toBeVisible();
  });

  //hpl button (navbar)
  test('should allow me to go to HPL page when clicked on HPL button (navbar)', async ({ page }) => {
    await page.goto(Constant.DEFAULT_PAGE);
    await page.getByRole('link').filter({ hasText: 'Hitung HPL' }).click();
    await expect(page).toHaveURL(Constant.HPL_PAGE);
    await expect(page.getByRole('heading', { name: 'Hari Perkiraan Lahir' })).toBeVisible();
  });

  //contact us button (navbar) 
  test('should allow me to go to contact us page when clicked on contact us button (navbar)', async ({ page }) => {
    await page.goto(Constant.DEFAULT_PAGE);
    await page.getByRole('link').filter({ hasText: 'Hubungi Kami' }).first().click();
    await expect(page).toHaveURL(Constant.CONTACT_US_PAGE);
    await expect(page.getByRole('heading', { name: 'Hubungi Kami', exact: true })).toBeVisible();
  });
});

