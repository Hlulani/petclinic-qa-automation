import { Page, Locator } from '@playwright/test';

export class SpecialtyListPage {
  readonly page: Page;
  readonly specialtiesTableRows: Locator;
  readonly homeButton: Locator;
  readonly addButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.specialtiesTableRows = page.locator('#specialties tbody tr');
    this.homeButton = page.locator('button:has-text("Home")');
    this.addButton = page.locator('button:has-text("Add")');
  }

  async getSpecialtyNames(): Promise<string[]> {
    const names = await this.specialtiesTableRows.locator('td:first-child input').evaluateAll(inputs =>
      inputs.map(input => (input as HTMLInputElement).value)
    );
    return names;
  }

  async clickEditButton(index: number) {
    await this.specialtiesTableRows.nth(index).locator('button:has-text("Edit")').click();
  }

  async clickDeleteButton(index: number) {
    await this.specialtiesTableRows.nth(index).locator('button:has-text("Delete")').click();
  }

  async clickHomeButton() {
    await this.homeButton.click();
  }

  async clickAddButton() {
    await this.addButton.click();
  }

  async countSpecialties(): Promise<number> {
    return await this.specialtiesTableRows.count();
  }
}
