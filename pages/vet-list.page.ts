import { Page, Locator } from '@playwright/test';

export class VetListPage {
  readonly page: Page;
  readonly header: Locator;
  readonly vetTable: Locator;
  readonly editButtons: Locator;
  readonly deleteButtons: Locator;
  readonly homeButton: Locator;
  readonly addVetButton: Locator;
  readonly vetTableRows: Locator;
  readonly vetNames: Locator;
  readonly vetSpecialties: Locator;
  readonly vetRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('h2:has-text("Veterinarians")');
    this.vetTable = page.locator('#vets');
    this.editButtons = page.locator('button:has-text("Edit Vet")');
    this.deleteButtons = page.locator('button:has-text("Delete Vet")');
    this.homeButton = page.locator('button:has-text("Home")');
    this.addVetButton = page.locator('button:has-text("Add Vet")');
    this.vetTableRows = page.locator('#vets tbody tr');
    this.vetNames = page.locator('#vets tbody tr td:nth-child(1)');
    this.vetSpecialties = page.locator('#vets tbody tr td:nth-child(2)');
    this.vetRows = page.locator('#vets tbody tr');

  }

  async navigateTo() {
    await this.page.goto('http://localhost:4200/petclinic/vets');
  }

  async clickDeleteButton(index: number) {
    await this.deleteButtons.nth(index).click();
  }

  async clickHomeButton() {
    await this.homeButton.click();
  }

  async clickAddVetButton() {
    await this.addVetButton.click();
  }

  async getVetNames(): Promise<string[]> {
    return await this.vetNames.allTextContents();
  }

  async getVetSpecialties(): Promise<string[]> {
    return await this.vetSpecialties.allTextContents();
  }

  async numberOfVets(): Promise<number> {
    return await this.vetTableRows.count();
  }

  async getVetNameByIndex(index: number): Promise<{ firstName: string, lastName: string }> {
    const fullName = await this.page.locator(`tbody tr:nth-child(${index + 1}) td:first-child`).textContent();
    const [firstName, lastName] = fullName?.trim().split(' ') || [];
    return { firstName, lastName };
  }

  async getEditButtonByIndex(index: number): Promise<Locator> {
    return this.vetRows.nth(index).locator('button:has-text("Edit Vet")');
  }

  async clickEditButton(vetIndex: number): Promise<void> {
    const editButton = this.page.locator('#vets tbody tr').nth(vetIndex).locator('button:has-text("Edit Vet")');
    await editButton.click();
  }

  async getVetDetailsByIndex(vetIndex: number): Promise<{ id: number; firstName: string; lastName: string }> {
    const row = this.page.locator('#vets tbody tr').nth(vetIndex);
    const firstName = await row.locator('td').nth(0).textContent();
    const lastName = await row.locator('td').nth(1).textContent();
    const id = vetIndex + 1; 

    return { id, firstName: firstName?.trim() || '', lastName: lastName?.trim() || '' };
  }


}
