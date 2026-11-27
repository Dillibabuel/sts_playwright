import { expect, Locator, Page } from '@playwright/test';

export class InvoicingPage {
  readonly page: Page;
  readonly title: Locator;
  readonly uploadButton: Locator;
  readonly ewButton: Locator;
  readonly invoiceStatusButton: Locator;
  readonly clearSearchButton: Locator;
  readonly exportCsvButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { name: 'Invoice Overview' });
    this.uploadButton = page.getByRole('button', { name: 'Upload' });
    this.ewButton = page.getByRole('button', { name: 'EW', exact: true });
    this.invoiceStatusButton = page.getByRole('button', { name: 'Invoice Status' });
    this.clearSearchButton = page.getByRole('button', { name: 'Clear Search' });
    this.exportCsvButton = page.getByRole('button', { name: 'Export CSV' });
  }

  async assertLoaded(): Promise<void> {
    await this.page.getByText('Loading...').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
    await expect(this.title).toBeVisible({ timeout: 15000 });
    await expect(this.uploadButton).toBeVisible({ timeout: 15000 });
    await expect(this.ewButton).toBeVisible({ timeout: 15000 });
    await expect(this.invoiceStatusButton).toBeVisible({ timeout: 15000 });
    await expect(this.clearSearchButton).toBeVisible({ timeout: 15000 });
    await expect(this.exportCsvButton).toBeVisible({ timeout: 15000 });
  }
}
