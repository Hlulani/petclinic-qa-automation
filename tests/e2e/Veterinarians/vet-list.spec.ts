import { test } from '../../../fixtures/fixtures.js';
import { expect } from '@playwright/test';
import { VetListPage } from '../../../pages/vet-list.page'; 
import { VetEditPage } from '../../../pages/vet-edit.page';

test.describe('Vet List Tests', () => {
    let vetListPage;

  test.beforeEach(async ({ page }) => {
     vetListPage = new VetListPage(page);
    await vetListPage.navigateTo();
  });

  test('should display Veterinarians header', async ({  }) => {
    await expect(vetListPage.header).toBeVisible();
  });

  test('should list all veterinarians dynamically', async ({ page }) => {
    const vetListPage = new VetListPage(page);
    
    
    const numberOfVets = await vetListPage.numberOfVets();
    expect(numberOfVets).toBeGreaterThan(0);

    // Verify each veterinarian name is non-empty
    const vetNames = await vetListPage.getVetNames();
    for (const name of vetNames) {
      expect(name.trim()).not.toBe('');
    }


    const vetSpecialties = await vetListPage.getVetSpecialties();
    for (const specialty of vetSpecialties) {
      expect(specialty).toBeDefined();
    }
  });

  test('should click on edit button for first vet', async ({ page }) => {
    // Click the edit button for the first veterinarian (index 0)
    await vetListPage.clickEditButton(0);
    
    await expect(page).toHaveURL("http://localhost:4200/petclinic/vets/1/edit");

  });

  test.skip('should dynamically click on edit button for second vet and verify details', async ({ page }) => {
    const vetListPage = new VetListPage(page);
    const vetEditPage = new VetEditPage(page);

    const vetIndex = 2; 

    await vetListPage.clickEditButton(vetIndex);
  
    const { id, firstName, lastName } = await vetListPage.getVetDetailsByIndex(vetIndex);
  
    await expect(page).toHaveURL(new RegExp(`/vets/${id}/edit`));
  
    await expect(vetEditPage.firstNameInput).toHaveValue(firstName);
    await expect(vetEditPage.lastNameInput).toHaveValue(lastName);
  
    await vetEditPage.fillVetDetails('UpdatedFirstName', 'UpdatedLastName');
    await vetEditPage.saveVet();
  
    await expect(page).toHaveURL(/\/vets/);
});

  test('should click on delete button for second vet', async ({  }) => {
    
    await vetListPage.clickDeleteButton(1);
  });

  test('should redirect to home page on clicking home button', async ({ page }) => {
    await vetListPage.clickHomeButton();
    await expect(page).toHaveURL('http://localhost:4200/petclinic/welcome');
  });

  test('should navigate to Add Vet page', async ({ page }) => {
    await vetListPage.clickAddVetButton();
    await expect(page).toHaveURL('http://localhost:4200/petclinic/vets/add');
  });
});
