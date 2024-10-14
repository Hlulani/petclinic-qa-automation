import { Page, Locator } from '@playwright/test';

export class SpecialtyAddPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#name');
    this.saveButton = page.locator('button[type="submit"]');
  }

  async isSaveButtonDisabled(): Promise<boolean> {
    return await this.saveButton.isDisabled();
  }

  async fillSpecialtyName(name: string) {
    await this.nameInput.fill(name);
  }

  async submitForm() {
    await this.saveButton.click();
  }
}
