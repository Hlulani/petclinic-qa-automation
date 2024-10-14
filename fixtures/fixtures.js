import { test as baseTest } from "@playwright/test";

const test = baseTest.extend({
  page: async ({ page }, use) => {
    await use(page);
  },
});

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/petclinic/");
});

export { test, expect } from "@playwright/test";