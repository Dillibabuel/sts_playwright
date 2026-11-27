import { expect, Locator, Page } from '@playwright/test';

export class AppShellPage {
  readonly page: Page;
  readonly dashboardLink: Locator;
  readonly projectsLink: Locator;
  readonly invoicingLink: Locator;
  readonly adminLink: Locator;
  readonly editProjectMenuItemsLink: Locator;
  readonly addUserLink: Locator;
  readonly viewUsersLink: Locator;
  readonly logoutLink: Locator;
  readonly topLeftMenuToggle: Locator;
  readonly userMenuToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.projectsLink = page.getByRole('link', { name: 'Projects' });
    this.invoicingLink = page.getByRole('link', { name: 'PO and Invoice' });
    this.adminLink = page.getByRole('link', { name: 'Admin' });
    this.editProjectMenuItemsLink = page.getByRole('link', { name: 'Edit Project Menu Items' });
    this.addUserLink = page.getByRole('link', { name: 'Add A User' });
    this.viewUsersLink = page.getByRole('link', { name: 'View Users' });
    this.logoutLink = page.locator('a[href*="logout.php"]');
    this.topLeftMenuToggle = page.locator('nav button').first();
    this.userMenuToggle = page.locator('nav button').nth(1);
  }

  async assertAuthenticated(): Promise<void> {
    await expect(this.page.locator('text=Welcome!')).toBeVisible();
    await expect(this.dashboardLink).toBeVisible();
    await expect(this.projectsLink).toBeVisible();
    await expect(this.invoicingLink).toBeVisible();
  }

  async gotoDashboard(): Promise<void> {
    await this.dashboardLink.click();
    await this.page.waitForURL(/landing_page\.php/i);
  }

  async gotoProjects(): Promise<void> {
    await this.projectsLink.click();
    await this.page.waitForURL(/main\.php/i);
    await this.waitForLoadingToFinish();
  }

  async gotoInvoicing(): Promise<void> {
    await this.invoicingLink.click();
    await this.page.waitForURL(/invoicing_main\.php/i);
    await this.waitForLoadingToFinish();
  }

  async gotoViewUsers(): Promise<void> {
    await this.page.goto('users/view_users.php');
    await this.page.waitForURL(/users\/view_users\.php/i);
    await this.waitForLoadingToFinish();
  }

  async openAdminMenu(): Promise<void> {
    await this.adminLink.click();
  }

  async assertAdminMenuItemsVisible(): Promise<void> {
    await expect(this.editProjectMenuItemsLink).toBeVisible({ timeout: 10000 });
    await expect(this.addUserLink).toBeVisible({ timeout: 10000 });
    await expect(this.viewUsersLink).toBeVisible({ timeout: 10000 });
  }

  async assertAdminMenuItemTargets(): Promise<void> {
    await expect(this.editProjectMenuItemsLink).toHaveAttribute('href', /projects\/menu_edit\.php/i);
    await expect(this.addUserLink).toHaveAttribute('href', /users\/add_user\.php/i);
    await expect(this.viewUsersLink).toHaveAttribute('href', /users\/view_users\.php/i);
  }

  async logout(): Promise<void> {
    const logoutEndpoint = 'logout.php';

    if (!(await this.logoutLink.first().isVisible())) {
      if (await this.userMenuToggle.isVisible().catch(() => false)) {
        await this.userMenuToggle.click();
      }

      if (!(await this.logoutLink.first().isVisible())) {
        await this.topLeftMenuToggle.click();
      }
    }

    if (await this.logoutLink.first().isVisible().catch(() => false)) {
      await this.logoutLink.click();
      return;
    }

    await this.page.goto(logoutEndpoint);
  }

  private async waitForLoadingToFinish(): Promise<void> {
    await this.page.getByText('Loading...').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  }
}
