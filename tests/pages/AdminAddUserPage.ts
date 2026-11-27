import { expect, Locator, Page } from '@playwright/test';

export class AdminAddUserPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly privilegesDropdown: Locator;
  readonly submitButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Add New User' });
    this.firstNameInput = page.locator('tr:has-text("First Name") input').first();
    this.lastNameInput = page.locator('tr:has-text("Last Name") input').first();
    this.usernameInput = page.locator('tr:has-text("Username (Science ID)") input').first();
    this.emailInput = page.locator('tr:has-text("Email") input').first();
    this.privilegesDropdown = page.locator('tr:has-text("Privileges") select').first();
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/users\/add_user\.php/i);
    await expect(this.heading).toBeVisible({ timeout: 15000 });
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.privilegesDropdown).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
  }
}
