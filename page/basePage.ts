import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Common method 1: Navigate to URL
  async goto(url: string) {
    await this.page.goto(url);
  }

  // Common method 2: Get locator
  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  // Common method 3: Wait for element
  async waitForElement(selector: string, timeout = 5000) {
    await this.page.locator(selector).waitFor({ timeout });
  }

  // Common method 4: Check if element is visible
  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  // Common method 5: Fill input field
  async fillInput(selector: string, text: string) {
    await this.page.locator(selector).fill(text);
  }

  // Common method 6: Click element
  async clickElement(selector: string) {
    await this.page.locator(selector).click();
  }

  // Common method 7: Get text
  async getText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() || '';
  }

  // Common method 8: Assert element visible
  async assertElementVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  // Common method 9: Assert URL
  async assertUrlContains(urlPart: string) {
    await expect(this.page).toHaveURL(new RegExp(urlPart));
  }

  // Common method 10: Take screenshot
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}
