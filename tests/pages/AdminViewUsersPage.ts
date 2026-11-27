import { expect, Locator, Page } from '@playwright/test';

export class AdminViewUsersPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly actionsHeader: Locator;
  readonly nameHeader: Locator;
  readonly usernameHeader: Locator;
  readonly emailHeader: Locator;
  readonly privilegesHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'List of Users' });
    this.actionsHeader = page.getByRole('columnheader', { name: 'Actions' });
    this.nameHeader = page.getByRole('columnheader', { name: 'Name', exact: true });
    this.usernameHeader = page.getByRole('columnheader', { name: 'UserName' });
    this.emailHeader = page.getByRole('columnheader', { name: 'Email' });
    this.privilegesHeader = page.getByRole('columnheader', { name: 'Privileges' });
  }

  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/users\/view_users\.php/i);
    await expect(this.heading).toBeVisible({ timeout: 15000 });
    await expect(this.actionsHeader).toBeVisible();
    await expect(this.nameHeader).toBeVisible();
    await expect(this.usernameHeader).toBeVisible();
    await expect(this.emailHeader).toBeVisible();
    await expect(this.privilegesHeader).toBeVisible();
  }
}
