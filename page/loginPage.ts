import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  readonly url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  // Selectors specific to LoginPage
  private readonly selectors = {
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
    loginForm: 'form.oxd-form',
    errorMessage: 'p[class*="oxd-alert-content-text"]',
    userDropdown: 'li.oxd-userdropdown',
    logoutOption: 'a:has-text("Logout")',
  };

  constructor(page: Page) {
    super(page);  // Call parent constructor
  }

  // Override goto for this specific page
  async goto() {
    await super.goto(this.url);
  }

  // LoginPage-specific method 1: Login
  async login(username: string, password: string) {
    await this.fillInput(this.selectors.usernameInput, username);
    await this.fillInput(this.selectors.passwordInput, password);
    await this.clickElement(this.selectors.loginButton);
  }

  // LoginPage-specific method 2: Check login form visible
  async expectLoginFormVisible() {
    await this.assertElementVisible(this.selectors.loginForm);
  }

  // LoginPage-specific method 3: Check error message
  async expectInvalidCredentialsError() {
    await this.assertElementVisible(this.selectors.errorMessage);
    await expect(this.locator(this.selectors.errorMessage)).toContainText('Invalid credentials');
  }

  // LoginPage-specific method 4: Logout
  async logout() {
    await this.clickElement(this.selectors.userDropdown);
    await this.clickElement(this.selectors.logoutOption);
  }
}

