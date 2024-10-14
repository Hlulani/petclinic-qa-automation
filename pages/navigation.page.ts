import { Page } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToHome() {
    await this.page.locator('a[routerlink="welcome"]').dispatchEvent('click');
  }

  async goToOwnersSearch() {
    await this.page.locator('a[routerlink="/owners"]').dispatchEvent('click');
  }

  async goToAddNewOwner() {
    await this.page.locator('a[routerlink="/owners/add"]').dispatchEvent('click');
  }

  async goToVets() {
    await this.page.locator('a[routerlink="/vets"]').dispatchEvent('click');
  }

  async goToAddNewVet() {
    await this.page.locator('a[routerlink="/vets/add"]').dispatchEvent('click');
  }

  async goToPetTypes() {
    await this.page.locator('a[routerlink="/pettypes"]').dispatchEvent('click');
  }

  async goToSpecialties() {
    await this.page.locator('a[routerlink="/specialties"]').dispatchEvent('click');
  }
}
