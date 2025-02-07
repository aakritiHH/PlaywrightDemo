import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByRole('link', { name: 'GILETS' }).click();
  await page.getByRole('link', { name: 'W CORSICA PL VEST W CORSICA' }).click();
  await page.getByText('Choose a size').click();
  await page.getByRole('option', { name: '10' }).click();
  await page.getByRole('button', { name: 'Add to bag' }).click();
});