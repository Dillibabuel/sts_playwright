import { expect, Locator, Page } from '@playwright/test';

export class AdminEditMenuPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly menuNameHeader: Locator;
  readonly menuValueHeader: Locator;
  readonly submitButton: Locator;
  readonly resetButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Edit Menu Items' });
    this.menuNameHeader = page.getByRole('columnheader', { name: 'Menu Name' });
    this.menuValueHeader = page.getByRole('columnheader', { name: 'Menu Value' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/projects\/menu_edit\.php/i);
    await expect(this.heading).toBeVisible({ timeout: 15000 });
    await expect(this.menuNameHeader).toBeVisible();
    await expect(this.menuValueHeader).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.resetButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
  }
}
