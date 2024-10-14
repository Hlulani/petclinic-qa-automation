import { test } from '../../../fixtures/fixtures.js';
import { expect } from '@playwright/test';
import { AddOwnerPage } from '../../../pages/add-owner.page';

test.describe('Add New Owner Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/petclinic/owners/add');
  });

  test('Add a new owner successfully', async ({ page }) => {
    const addOwnerPage = new AddOwnerPage(page);

    await addOwnerPage.fillOwnerDetails(
      'John',     
      'Doe',     
      '123 Elm St', 
      'New York', 
      '1234567890' 
    );

    await addOwnerPage.submitForm();

    await expect(page).toHaveURL(/owners/);
  });
  test('Submit button is disabled when required fields are missing', async ({ page }) => {
    const addOwnerPage = new AddOwnerPage(page);

    // The button should be disabled initially
    await expect(addOwnerPage.isAddOwnerButtonDisabled()).toBeTruthy();

    await addOwnerPage.fillOwnerDetails(
      'John',    
      'Doe',     
      '123 Elm St', 
      'New York', 
      ''          
    );

    // The button should still be disabled
    await expect(addOwnerPage.isAddOwnerButtonDisabled()).toBeTruthy();

  });

  test('Display error message for invalid phone number', async ({ page }) => {
    const addOwnerPage = new AddOwnerPage(page);

    await addOwnerPage.fillOwnerDetails(
      'John',    
      'Doe',     
      '123 Elm St', 
      'New York', 
      'ABC12345'  
    );

    await expect(addOwnerPage.isAddOwnerButtonDisabled()).toBeTruthy();


    // Verify that the error message for the phone number is displayed
    await expect(addOwnerPage.phoneNumberErrorMessage).toBeVisible();
    await expect(addOwnerPage.phoneNumberErrorMessage).toHaveText('Phone number only accept digits');
  });

  test('Display error message for invalid last name', async ({ page }) => {
    const addOwnerPage = new AddOwnerPage(page);

    await addOwnerPage.fillOwnerDetails(
      'John',    
      'Doe123',  
      '123 Elm St', 
      'New York', 
      '1234567890' 
    );


    await expect(addOwnerPage.isAddOwnerButtonDisabled()).toBeTruthy();

    await expect(addOwnerPage.lastNameErrorMessage).toBeVisible();
    await expect(addOwnerPage.lastNameErrorMessage).toHaveText('Last name must consist of letters only');
  });

  test('Display error message for invalid first name', async ({ page }) => {
    const addOwnerPage = new AddOwnerPage(page);

    
    await addOwnerPage.fillOwnerDetails(
      'John123',  
      'Doe',     
      '123 Elm St', 
      'New York', 
      '1234567890' 
    );

    await expect(addOwnerPage.isAddOwnerButtonDisabled()).toBeTruthy();

    // Verify that the error message for the first name is displayed
    await expect(addOwnerPage.firstNameErrorMessage).toBeVisible();
    await expect(addOwnerPage.firstNameErrorMessage).toHaveText('First name must consist of letters only');
  });

  test('Back button redirects to Owners page', async ({ page }) => {
    const addOwnerPage = new AddOwnerPage(page);

    await addOwnerPage.goBack();

    await expect(page).toHaveURL('http://localhost:4200/petclinic/owners');
  });

});
