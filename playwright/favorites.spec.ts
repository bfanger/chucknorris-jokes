import { expect, test } from "@playwright/test";

test("favorite state survives a page reload", async ({ page }) => {
  await page.goto("/");
  const cards = page.getByTestId(/^joke-/);
  await expect(cards).toHaveCount(10);

  // Pause the timer so the joke list doesn't rotate mid-test
  await page.getByTitle("Pause").click();

  const joke = cards.first();
  const favorite = joke.getByRole("switch", { name: "Mark as favorite" });

  await test.step("mark the joke as favorite", async () => {
    await expect(favorite).toHaveAttribute("aria-checked", "false");
    await favorite.click();
    await expect(joke.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  await test.step("check the favorites page", async () => {
    await page.getByRole("link", { name: /Favorites/ }).click();
    const favorites = page.getByTestId(/^joke-/);
    await expect(favorites).toHaveCount(1);
    await expect(favorites.first()).toBeVisible();
  });

  await test.step("favorite state survives a page reload", async () => {
    await page.reload();
    await expect(
      page
        .getByTestId(/^joke-/)
        .first()
        .getByRole("switch"),
    ).toHaveAttribute("aria-checked", "true");
  });
});
