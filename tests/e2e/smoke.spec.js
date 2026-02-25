import { expect, test } from "@playwright/test";

test("landing page renders core sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /ArtsyLab/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Începe Călătoria/i })).toBeVisible();
});

