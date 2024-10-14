import { test, expect } from '@playwright/test';
import { PetTypeListPage } from '../../../pages/pet-type-list.page';
import { PetTypeAddPage } from '../../../pages/add-pet-type.page';


test.describe('Pet Type List Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/petclinic/pettypes');
  });

  test('should display all pet types', async ({ page }) => {
    const petTypeListPage = new PetTypeListPage(page);

    const petTypes = await petTypeListPage.getPetTypeNames();

    const validPetTypes = petTypes.filter(type => /^[a-zA-Z]+$/.test(type));

    expect(validPetTypes.length).toBeGreaterThan(0);

    const expectedTypes = ['cat', 'dog', 'hamster', 'snake'];
    for (const expectedType of expectedTypes) {
      expect(validPetTypes).toContain(expectedType);
    }
  });

  
  test('should click on edit button for the second pet type', async ({ page }) => {
    const petTypeListPage = new PetTypeListPage(page);

    await petTypeListPage.clickEditButton(1); 
    
    await expect(page).toHaveURL(/\/pettypes\/2\/edit/);
  });

  test.skip('should click on delete button for the third pet type', async ({ page }) => {
    const petTypeListPage = new PetTypeListPage(page);

    const initialPetTypes = await petTypeListPage.getPetTypeNames();
    expect(initialPetTypes).toContain('lizard'); 

    await petTypeListPage.clickDeleteButton(3);

    
    await page.waitForTimeout(1000); 
    
    const updatedPetTypes = await petTypeListPage.getPetTypeNames();

    expect(updatedPetTypes).not.toContain('lizard');

    expect(updatedPetTypes.length).toBe(initialPetTypes.length - 1);
  });

  test.skip('should decrease the number of pet types after deleting one', async ({ page }) => {
    const petTypeListPage = new PetTypeListPage(page);
  
    await page.goto('http://localhost:4200/petclinic/pettypes');
  
    const initialCount = await petTypeListPage.countPetTypes();
    expect(initialCount).toBeGreaterThan(0); 
  
    await petTypeListPage.clickDeleteButton(2);
  
    const newCount = await petTypeListPage.countPetTypes();
  
    expect(newCount).toBe(initialCount - 1);
  });
  test('should redirect to the home page when clicking on Home button', async ({ page }) => {
    const petTypeListPage = new PetTypeListPage(page);

    await petTypeListPage.clickHomeButton();

    await expect(page).toHaveURL('http://localhost:4200/petclinic/welcome');
  });


  test('should open the add pet type form and submit successfully', async ({ page }) => {
    const petTypeListPage = new PetTypeListPage(page);

    await petTypeListPage.clickAddButton();

    const petTypeAddPage = new PetTypeAddPage(page);

    await expect(await petTypeAddPage.isSaveButtonDisabled()).toBeTruthy();

    await petTypeAddPage.fillPetTypeName('snake');

    await expect(await petTypeAddPage.isSaveButtonDisabled()).toBeFalsy();

    await petTypeAddPage.submitForm();

    await expect(page).toHaveURL(/\/pettypes/);
  });

  test('should keep the save button disabled if the form is not filled', async ({ page }) => {
    const petTypeListPage = new PetTypeListPage(page);

    await petTypeListPage.clickAddButton();

    const petTypeAddPage = new PetTypeAddPage(page);

    await expect(await petTypeAddPage.isSaveButtonDisabled()).toBeTruthy();

    await petTypeAddPage.fillPetTypeName('');

    await expect(await petTypeAddPage.isSaveButtonDisabled()).toBeTruthy();
  });

});
