
import { Page, Locator } from '@playwright/test';

export class VetAddPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly specialtiesDropdown: Locator;
  readonly saveButton: Locator;
  readonly backButton: Locator;
  readonly firstNameErrorMessage: Locator;
  readonly lastNameErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.specialtiesDropdown = page.locator('#specialties');
    this.saveButton = page.locator('button[type="submit"]');
    this.backButton = page.locator('button:has-text("Back")');
    this.firstNameErrorMessage = page.locator('span.help-block:has-text("First Name may only consist of letters")');
    this.lastNameErrorMessage = page.locator('span.help-block:has-text("Last Name must consist of letters only")');
  }
  async fillVetDetails(firstName: string, lastName: string, specialtyIndex: number) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.specialtiesDropdown.selectOption({ index: specialtyIndex });
  }

  async saveVet() {
    await this.saveButton.click();
  }

  async goBack() {
    await this.backButton.click();
  }

  async isSaveButtonDisabled(): Promise<boolean> {
    return await this.saveButton.isDisabled();
  }
}
