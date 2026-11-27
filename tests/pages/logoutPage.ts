import { expect, Locator, Page } from '@playwright/test';

export class LogoutPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly requestAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'User Name' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.requestAccountButton = page.getByRole('button', { name: 'Request Account' });
  }

  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/STS - Logging in/i);
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.requestAccountButton).toBeVisible();
    await expect(this.page).toHaveURL(/\/sts\/(index\.php)?($|\?)/i);
    console.log('Logout successful');
  }
}
