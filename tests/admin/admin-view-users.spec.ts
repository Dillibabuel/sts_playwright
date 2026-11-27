import { test } from '@playwright/test';
import { AppShellPage } from '../pages/AppShellPage';
import { AdminViewUsersPage } from '../pages/AdminViewUsersPage';
import { loginAsAdmin } from '../support/auth';

test('admin view users page should load with users table columns', async ({ page }) => {
  const appShell = new AppShellPage(page);
  const viewUsersPage = new AdminViewUsersPage(page);

  await loginAsAdmin(page);
  await appShell.openAdminMenu();
  await appShell.viewUsersLink.click();
  await viewUsersPage.assertLoaded();
});
