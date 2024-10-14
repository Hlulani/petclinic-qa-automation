import { test } from '../../../fixtures/fixtures.js';
import { expect } from '@playwright/test';


test.describe('Check Class and Image Existence', () => {

  test('Check if col-md-12 class and pets logo image exist', async ({ page }) => {
  
    const divExists = await page.locator('div.col-md-12').isVisible();
    expect(divExists).toBeTruthy();

    // Check if the image with the pets logo exists
    const imgExists = await page.locator('img[src="./assets/images/pets.png"][alt="pets logo"]').isVisible();
    expect(imgExists).toBeTruthy();
  });

});
