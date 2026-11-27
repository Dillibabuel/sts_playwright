import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
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

  async goto(): Promise<void> {
    await this.page.goto('');
  }

  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/STS - Logging in/i);
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.requestAccountButton).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async evaluateLoginOutcome(): Promise<'success' | 'invalid'> {
    const successUrl = /landing_page\.php|main\.php|invoicing_main\.php/i;
    const isSuccess = await this.page
      .waitForURL(successUrl, { timeout: 5000 })
      .then(() => true)
      .catch(() => false);

    if (isSuccess) {
      console.log('Login successful');
      return 'success';
    }

    await this.assertLoaded();
    console.log('Invalid credentials');
    return 'invalid';
  }
}
