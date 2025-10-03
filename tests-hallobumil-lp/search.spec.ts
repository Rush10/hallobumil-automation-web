import { test, expect, type Page } from '@playwright/test';
import * as Constant from '../hb-lp-utils/constant';

test.beforeEach(async ({ page }) => {
  await page.goto(Constant.DEFAULT_PAGE);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('Search Article', () => {
  test('should found the article', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Cari...' }).click();
    await page.getByRole('textbox', { name: 'Cari...' }).fill('Test Pregnancy Article');
    await page.getByRole('button', { name: 'search' }).click();
    await expect(page.getByRole('heading', { name: 'Hasil Pencarian " Test' })).toBeVisible();
    await expect(page.getByText('" Test Pregnancy Article "')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Test Pregnancy Article Test' })).toBeVisible();
  });

  test('should not found the article', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Cari...' }).click();
    await page.getByRole('textbox', { name: 'Cari...' }).fill('hjk');
    await page.getByRole('button', { name: 'search' }).click();
    await expect(page.getByRole('heading', { name: 'Hasil Pencarian " hjk "' })).toBeVisible();
    await expect(page.getByText('" hjk "')).toBeVisible();
    await expect(page.getByRole('img', { name: 'Data Tidak Ditemukan' })).toBeVisible();
  });

  test('should go to the detail article of found article', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Cari...' }).click();
    await page.getByRole('textbox', { name: 'Cari...' }).fill('Panduan Diet untuk Ibu Hamil yang Mengalami Obesitas');
    await page.getByRole('button', { name: 'search' }).click();
    await page.getByRole('link', { name: 'Panduan Diet untuk Ibu Hamil yang Mengalami Obesitas' }).click();
    await expect(page.getByRole('heading', { name: 'Panduan Diet untuk Ibu Hamil yang Mengalami Obesitas' })).toBeVisible();
    // await expect(page.getByText('Test Pre-Pregnancy Article Body')).toBeVisible();
  });
});

