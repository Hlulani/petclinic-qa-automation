
import { test } from '../../../fixtures/fixtures.js';
import { expect } from '@playwright/test';
import { NavigationPage } from '../../../pages/navigation.page.js';

test.describe('Navigation Tests', () => {

  test('Navigate to Home page', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await navigationPage.goToHome();
    await expect(page).toHaveURL(/welcome/);
  });

  test('Navigate to Owners Search', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await navigationPage.goToOwnersSearch();
    await expect(page).toHaveURL(/owners/);
  });

  test('Navigate to Add New Owner', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await navigationPage.goToAddNewOwner();
    await expect(page).toHaveURL(/owners/);
  });

  test('Navigate to Veterinarians All', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await navigationPage.goToVets();
    await expect(page).toHaveURL(/vets/);
  });

  test('Navigate to Add New Veterinarian', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await navigationPage.goToAddNewVet();
    await expect(page).toHaveURL(/vets/);
  });

  test('Navigate to Pet Types', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await navigationPage.goToPetTypes();
    await expect(page).toHaveURL(/pettypes/);
  });

  test('Navigate to Specialties', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await navigationPage.goToSpecialties();
    await expect(page).toHaveURL(/specialties/);
  });
});
