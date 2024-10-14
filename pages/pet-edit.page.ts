import { Page, Locator } from '@playwright/test';

export class PetEditPage {
  readonly page: Page;
  readonly petNameInput: Locator;
  readonly birthDateInput: Locator;
  readonly petTypeDropdown: Locator;
  readonly saveButton: Locator;
  readonly deleteButton: Locator;  // New locator for delete button
  readonly ownerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.petNameInput = page.locator('#petName');
    this.birthDateInput = page.locator('#birthDate');
    this.petTypeDropdown = page.locator('#petType');
    this.saveButton = page.locator('button[type="submit"]');
    this.deleteButton =  page.locator('button:has-text("Delete")');
    this.ownerLink = page.locator('a.owner-link'); 
  }

  async fillPetDetails(name: string, birthDate: string, petType: string) {
    await this.petNameInput.fill(name);
    await this.birthDateInput.fill(birthDate);
    await this.petTypeDropdown.selectOption({ label: petType });
  }

  async submitForm() {
    await this.saveButton.click();
  }

  async clickDeleteButton(index: number) {
    await this.deleteButton.nth(index).click();
  }

  async gotoOwnerDetail() {
    await this.ownerLink.click();
  }
}
