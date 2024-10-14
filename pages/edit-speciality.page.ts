import { Page, Locator } from '@playwright/test';

export class SpecialtyEditPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly updateButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#name');
    this.updateButton = page.locator('button[type="submit"]:has-text("Update")');
    this.cancelButton = page.locator('button:has-text("Cancel")');
  }

  async fillSpecialtyName(name: string) {
    await this.nameInput.fill(name);
  }

  async submitForm() {
    await this.updateButton.click();
  }

  async cancelEdit() {
    await this.cancelButton.click();
  }
}
