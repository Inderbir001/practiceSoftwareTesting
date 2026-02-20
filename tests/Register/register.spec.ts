import { expect, test, type Page, type Locator } from '@playwright/test';
import { Register } from '../../pages/registerPage';

test('New Registration', async ({ page }) => {
  const registerPage = new Register(page);
  await registerPage.goto();
  await registerPage.newRegistration('Inderbir', 'Singh', '2002-11-25', 'Test Street', '123456', 'Test City', 'test State', 'India', '1234567890', 'test@test.com', 'Tashan@1021');
  await registerPage.registerButton.click();
  await expect(page).toHaveURL(/login/i);
});
