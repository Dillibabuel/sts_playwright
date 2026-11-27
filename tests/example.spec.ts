import { expect, test } from '@playwright/test';
import { AppShellPage } from './pages/AppShellPage';
import { InvoicingPage } from './pages/InvoicingPage';
import { LoginPage } from './pages/LoginPage';
import { LogoutPage } from './pages/logoutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { getStsRuntimeConfig } from './support/runtimeConfig';

const config = getStsRuntimeConfig();

test.describe('STS Login', () => {
  test('login page should render all mandatory controls', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.assertLoaded();
  });

  test('user should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appShell = new AppShellPage(page);

    await loginPage.goto();
    await loginPage.login(config.username, config.password);

    const outcome = await loginPage.evaluateLoginOutcome();
    await expect(outcome).toBe('success');
    await appShell.assertAuthenticated();
  });

  test('user should see invalid credentials state with invalid username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid-user', 'invalid-password');
    const outcome = await loginPage.evaluateLoginOutcome();
    await expect(outcome).toBe('invalid');
  });
});

test.describe('STS Authenticated Journeys', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(config.username, config.password);
    await expect(page).toHaveURL(/landing_page\.php|main\.php|invoicing_main\.php/i);
  });

  test('top navigation links should be visible for authenticated user', async ({ page }) => {
    const appShell = new AppShellPage(page);
    await appShell.assertAuthenticated();
  });

  test('projects module should load with table controls', async ({ page }) => {
    const appShell = new AppShellPage(page);
    const projectsPage = new ProjectsPage(page);

    await appShell.gotoProjects();
    await projectsPage.assertLoaded();
  });

  test('project code search and clear search should work', async ({ page }) => {
    const appShell = new AppShellPage(page);
    const projectsPage = new ProjectsPage(page);

    await appShell.gotoProjects();
    await projectsPage.assertLoaded();

    const firstProjectCode = await projectsPage.getFirstProjectCode();
    test.skip(!firstProjectCode, 'No project rows are available to test search behavior.');

    await projectsPage.searchByProjectCode(firstProjectCode);
    await projectsPage.assertProjectCodePresent(firstProjectCode);
    await projectsPage.clearSearch();
    await expect(projectsPage.projectCodeFilter).toHaveValue('');
  });

  test('invoicing module should load with quick actions', async ({ page }) => {
    const appShell = new AppShellPage(page);
    const invoicingPage = new InvoicingPage(page);

    await appShell.gotoInvoicing();
    await invoicingPage.assertLoaded();
  });

  test('admin links should be reachable', async ({ page }) => {
    const appShell = new AppShellPage(page);

    await appShell.openAdminMenu();
    await appShell.assertAdminMenuItemsVisible();
    await appShell.assertAdminMenuItemTargets();

    await appShell.gotoViewUsers();
    await expect(page).toHaveURL(/users\/view_users\.php/i);
    await expect(page.getByRole('heading', { name: /Users|User/i })).toBeVisible();
  });

  test('logout from dashboard should return user to login page', async ({ page }) => {
    const appShell = new AppShellPage(page);
    const logoutPage = new LogoutPage(page);

    await appShell.gotoDashboard();
    await appShell.logout();
    await logoutPage.assertLoaded();
  });

  test('logout from projects should return user to login page', async ({ page }) => {
    const appShell = new AppShellPage(page);
    const logoutPage = new LogoutPage(page);

    await appShell.gotoProjects();
    await appShell.logout();
    await logoutPage.assertLoaded();
  });

  test('logout from invoicing should return user to login page', async ({ page }) => {
    const appShell = new AppShellPage(page);
    const logoutPage = new LogoutPage(page);

    await appShell.gotoInvoicing();
    await appShell.logout();
    await logoutPage.assertLoaded();
  });
});
