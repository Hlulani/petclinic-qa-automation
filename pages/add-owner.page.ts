import { Page, Locator } from '@playwright/test';

export class AddOwnerPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly telephoneInput: Locator;
  readonly addOwnerButton: Locator;
  readonly backButton: Locator;
  readonly firstNameErrorMessage: Locator;
  readonly lastNameErrorMessage: Locator;
  readonly phoneNumberErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.addressInput = page.locator('#address');
    this.cityInput = page.locator('#city');
    this.telephoneInput = page.locator('#telephone');
    this.addOwnerButton = page.locator('button[type="submit"]');
    this.backButton = page.locator('button:has-text("Back")');
    this.firstNameErrorMessage = page.locator('span.help-block:has-text("First name must consist of letters only")');
    this.lastNameErrorMessage = page.locator('span.help-block:has-text("Last name must consist of letters only")');
    this.phoneNumberErrorMessage = page.locator('span.help-block:has-text("Phone number only accept digits")');
  }

  async isAddOwnerButtonDisabled(): Promise<boolean> {
    return await this.addOwnerButton.isDisabled();
  }

  async fillOwnerDetails(firstName: string, lastName: string, address: string, city: string, telephone: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.addressInput.fill(address);
    await this.cityInput.fill(city);
    await this.telephoneInput.fill(telephone);
  }

  async submitForm() {
    await this.addOwnerButton.click();
  }

  async goBack() {
    await this.backButton.click();
  }
}
