import { Page, Locator } from '@playwright/test';

export class PetTypeListPage {
  readonly page: Page;
  readonly petTypesTable: Locator;
  readonly petTypeNameInputs: Locator;
  readonly editButtons: Locator;
  readonly deleteButtons: Locator;
  readonly homeButton: Locator;
  readonly addButton: Locator;
  readonly petTypeRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.petTypesTable = page.locator('#pettypes');
    this.petTypeNameInputs = page.locator('tbody tr td input[name="pettype_name"]');
    this.editButtons = page.locator('tbody tr td button:has-text("Edit")');
    this.deleteButtons = page.locator('tbody tr td button:has-text("Delete")');
    this.homeButton = page.locator('button:has-text("Home")');
    this.addButton = page.locator('button:has-text("Add")');
    this.deleteButtons = page.locator('button:has-text("Delete")');
    this.petTypeRows = page.locator('tbody tr');
  }

  async countPetTypes(): Promise<number> {
    return await this.petTypeRows.count();
  }
  
  async getPetTypeNames(): Promise<string[]> {
    const petTypes = await this.petTypeNameInputs.evaluateAll(inputs =>
      inputs.map(input => (input as HTMLInputElement).value)
    );
    return petTypes;
  }

  async clickEditButton(index: number): Promise<void> {
    await this.editButtons.nth(index).click();
  }

  async clickDeleteButton(index: number): Promise<void> {
    await this.deleteButtons.nth(index).click();
  }

  async clickHomeButton(): Promise<void> {
    await this.homeButton.click();
  }

  async clickAddButton(): Promise<void> {
    await this.addButton.click();
  }
}
