import { Page, Locator } from '@playwright/test';

export class VetEditPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly specialtiesInput: Locator;
  readonly saveButton: Locator;
  readonly backButton: Locator;
  readonly vetRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.specialtiesInput = page.locator('mat-select[formcontrolname="specialties"]');
    this.saveButton = page.locator('button[type="submit"]');
    this.backButton = page.locator('button:has-text("Back")');
    this.vetRows = page.locator('#vets tbody tr');
  }

  async fillVetDetails(firstName: string, lastName: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async selectSpecialty(specialty: string) {
    await this.specialtiesInput.click();
    await this.page.locator(`mat-option:has-text("${specialty}")`).click();
  }

  async saveVet() {
    await this.saveButton.click();
  }

  async goBack() {
    await this.backButton.click();
  }

  async getEditButtonByIndex(index: number): Promise<Locator> {
    return this.vetRows.nth(index).locator('button:has-text("Edit Vet")');
  }



}
