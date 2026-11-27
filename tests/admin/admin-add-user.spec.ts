import { test } from '@playwright/test';
import { AppShellPage } from '../pages/AppShellPage';
import { AdminAddUserPage } from '../pages/AdminAddUserPage';
import { loginAsAdmin } from '../support/auth';

test('admin add user page should load with required fields', async ({ page }) => {
  const appShell = new AppShellPage(page);
  const addUserPage = new AdminAddUserPage(page);

  await loginAsAdmin(page);
  await appShell.openAdminMenu();
  await appShell.addUserLink.click();
  await addUserPage.assertLoaded();
});
