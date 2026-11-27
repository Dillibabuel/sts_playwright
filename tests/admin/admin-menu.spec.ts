import { test } from '@playwright/test';
import { AppShellPage } from '../pages/AppShellPage';
import { loginAsAdmin } from '../support/auth';

test('admin menu should show all configured options', async ({ page }) => {
  const appShell = new AppShellPage(page);

  await loginAsAdmin(page);
  await appShell.openAdminMenu();
  await appShell.assertAdminMenuItemsVisible();
  await appShell.assertAdminMenuItemTargets();
});
