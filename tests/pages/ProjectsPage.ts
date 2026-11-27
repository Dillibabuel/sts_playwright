import { expect, Locator, Page } from '@playwright/test';

export class ProjectsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly createNewLink: Locator;
  readonly clearSearchButton: Locator;
  readonly exportCsvButton: Locator;
  readonly projectCodeFilter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { name: 'Projects Overview' });
    this.createNewLink = page.getByRole('link', { name: 'Create New' });
    this.clearSearchButton = page.getByRole('button', { name: 'Clear Search' });
    this.exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
    this.projectCodeFilter = page.getByRole('textbox', { name: 'Project Code' });
  }

  async assertLoaded(): Promise<void> {
    await this.page.getByText('Loading...').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
    await expect(this.title).toBeVisible({ timeout: 15000 });
    await expect(this.createNewLink).toBeVisible({ timeout: 15000 });
    await expect(this.clearSearchButton).toBeVisible({ timeout: 15000 });
    await expect(this.exportCsvButton).toBeVisible({ timeout: 15000 });
  }

  async getFirstProjectCode(): Promise<string> {
    const firstCodeCell = this.page.locator('table tbody tr td:nth-child(2)').first();
    await expect(firstCodeCell).toBeVisible();
    return (await firstCodeCell.textContent())?.trim() || '';
  }

  async searchByProjectCode(projectCode: string): Promise<void> {
    await this.projectCodeFilter.fill(projectCode);
  }

  async assertProjectCodePresent(projectCode: string): Promise<void> {
    await expect(this.page.locator('table')).toContainText(projectCode);
  }

  async clearSearch(): Promise<void> {
    await this.clearSearchButton.click();
  }
}
