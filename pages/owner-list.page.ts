import { Locator, Page } from '@playwright/test';

export class OwnerListPage {
  readonly page: Page;
  readonly lastNameInput: Locator;
  readonly findOwnerButton: Locator;
  readonly ownersTable: Locator;
  readonly addOwnerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lastNameInput = page.locator('#lastName');
    this.findOwnerButton = page.locator('button[type="submit"]');
    this.ownersTable = page.locator('#ownersTable');
    this.addOwnerButton = page.locator('button:has-text("Add Owner")');
  }

  async searchForOwner(lastName: string) {
    await this.lastNameInput.fill(lastName);
    await this.findOwnerButton.dispatchEvent('click');
  }

  async verifyOwnerInTable(ownerName: string) {
    await this.page.locator(`.ownerFullName >> text=${ownerName}`).isVisible();
  }

  async clickAddOwner() {
    await this.addOwnerButton.dispatchEvent('click');
  }
}
