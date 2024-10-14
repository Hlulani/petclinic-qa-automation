import { test, expect } from "@playwright/test";
import { VetAddPage } from "../../../pages/add-vet.page";

test.describe("Add New Veterinarian Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/petclinic/vets/add");
  });

  test("Add a new veterinarian successfully", async ({ page }) => {
    const vetAddPage = new VetAddPage(page);

    await vetAddPage.fillVetDetails("John", "Doe", 1);

    await vetAddPage.saveVet();

    await expect(page).toHaveURL(/vets/);
  });

  test("Save button is disabled when required fields are missing", async ({
    page,
  }) => {
    const vetAddPage = new VetAddPage(page);

    await expect(vetAddPage.isSaveButtonDisabled()).toBeTruthy();

    await vetAddPage.fillVetDetails("John", "", 1);

    await expect(vetAddPage.isSaveButtonDisabled()).toBeTruthy();
  });

  test("Display error message for invalid first name", async ({ page }) => {
    const vetAddPage = new VetAddPage(page);

    await vetAddPage.fillVetDetails("John123", "Doe", 1);

    await expect(vetAddPage.isSaveButtonDisabled()).toBeTruthy();

    await expect(vetAddPage.firstNameErrorMessage).toHaveText(
      "First Name may only consist of letters",
    );
  });

  test("Display error message for invalid last name", async ({ page }) => {
    const vetAddPage = new VetAddPage(page);
    await vetAddPage.fillVetDetails("John", "Doe123", 1);

    await expect(vetAddPage.isSaveButtonDisabled()).toBeTruthy();

    await expect(page.locator(".help-block")).toContainText(
      "Last Name may only consist of letters",
    );
  });

  test("Back button redirects to Vet List page", async ({ page }) => {
    const vetAddPage = new VetAddPage(page);

    await vetAddPage.goBack();

    await expect(page).toHaveURL("http://localhost:4200/petclinic/vets");
  });
});
