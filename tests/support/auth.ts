import { expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { getStsRuntimeConfig } from './runtimeConfig';

export async function loginAsAdmin(page: Page): Promise<void> {
  const config = getStsRuntimeConfig();
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(config.username, config.password);
  await expect(page).toHaveURL(/landing_page\.php|main\.php|invoicing_main\.php/i);
}
