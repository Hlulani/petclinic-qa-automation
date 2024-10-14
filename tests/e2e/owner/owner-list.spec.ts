import { test } from '../../../fixtures/fixtures.js';
import { expect } from '@playwright/test';
import { OwnerListPage } from '../../../pages/owner-list.page';

test.describe('Owner List Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/petclinic/owners');
  });

  test('Search for an owner and verify in table', async ({ page }) => {
    const ownerListPage = new OwnerListPage(page);

    // Search for a specific owner
    await ownerListPage.searchForOwner('Franklin');

    // Verify that the owner appears in the table
    await ownerListPage.verifyOwnerInTable('George Franklin');
  });

  test('Add New Owner button is present', async ({ page }) => {
    const ownerListPage = new OwnerListPage(page);

    // Verify that the 'Add Owner' button exists
    await expect(ownerListPage.addOwnerButton).toBeVisible();
  });

});
