import { test } from '@playwright/test';
import { AppShellPage } from '../pages/AppShellPage';
import { AdminEditMenuPage } from '../pages/AdminEditMenuPage';
import { loginAsAdmin } from '../support/auth';

test('admin edit project menu items page should load with required controls', async ({ page }) => {
  const appShell = new AppShellPage(page);
  const editMenuPage = new AdminEditMenuPage(page);

  await loginAsAdmin(page);
  await appShell.openAdminMenu();
  await appShell.editProjectMenuItemsLink.click();
  await editMenuPage.assertLoaded();
});
