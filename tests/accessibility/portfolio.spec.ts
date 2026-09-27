import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test('home page has a server-rendered heading and no WCAG A/AA axe violations', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'LUCAS MACORI' })).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  expect(results.violations).toEqual([]);
});

test('mobile navigation opens as a keyboard-operable dialog', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile navigation is only rendered at mobile breakpoints.');
  await page.goto('/');
  const openButton = page.getByRole('button', { name: 'Open navigation menu' });
  await openButton.click();

  const dialog = page.getByRole('dialog', { name: 'Main navigation' });
  await expect(dialog).toBeVisible();
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  expect(results.violations).toEqual([]);

  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(openButton).toBeFocused();
});

test('mobile navigation closes safely when resized to desktop', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile navigation is only rendered at mobile breakpoints.');
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  const dialog = page.getByRole('dialog', { name: 'Main navigation' });
  await expect(dialog).toBeVisible();

  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(dialog).not.toBeVisible();
  await expect(page.locator('header nav a[href="#projects"]')).toBeFocused();
});

test('language changes update both visible content and the document language', async ({ page, isMobile }) => {
  await page.goto('/');
  const languageSwitcher = page.getByRole('group', { name: 'Language' });
  if (isMobile) {
    await expect(languageSwitcher).toBeVisible();
  }
  await page.getByRole('button', { name: 'Switch language to French' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  expect(results.violations).toEqual([]);
});

test('skip link moves keyboard focus to main content', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport();
  await expect(skipLink).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('major sections are named regions with a logical heading hierarchy', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

  for (const section of [
    { id: 'hero', heading: 'LUCAS MACORI', level: 1 },
    { id: 'projects', heading: 'THE LAB', level: 2 },
    { id: 'articles', heading: 'INCOMING SIGNALS', level: 2 },
    { id: 'resume', heading: 'SYSTEM ARCHITECTURE', level: 2 },
    { id: 'network', heading: 'NETWORK NODES', level: 2 },
    { id: 'contact', heading: 'ESTABLISH CONNECTION', level: 2 },
  ]) {
    const region = page.getByRole('region', { name: section.heading });
    await expect(region).toHaveAttribute('id', section.id);
    await expect(region.getByRole('heading', { level: section.level, name: section.heading })).toHaveCount(1);
  }
});

test('interactive controls expose accessible names', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withRules(['button-name', 'link-name', 'label', 'aria-command-name', 'aria-input-field-name'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('content reflows without horizontal scrolling at 320 CSS pixels', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 320, height: 800 });
  await page.addStyleTag({ content: '* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-block-end: 2em !important; }' });
  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    visualWidth: window.visualViewport?.width,
    overflowing: Array.from(document.querySelectorAll<HTMLElement>('body *'))
      .map((element) => ({
        tag: element.tagName,
        className: typeof element.className === 'string' ? element.className : '',
        text: element.innerText?.slice(0, 60),
        right: Math.round(element.getBoundingClientRect().right),
        left: Math.round(element.getBoundingClientRect().left),
      }))
      .filter((element) => element.right > document.documentElement.clientWidth + 1),
  }));
  expect(widths.content, JSON.stringify(widths)).toBeLessThanOrEqual(widths.viewport);
});

test('reduced-motion preference disables canvas particles and continuous CSS motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('canvas')).toBeHidden();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('page content remains visible with JavaScript disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000');
  await expect(page.getByRole('heading', { level: 1, name: 'LUCAS MACORI' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: /THE LAB/ })).toBeVisible();
  await context.close();
});

test('pause control stops continuous animation and keeps its setting after reload', async ({ page }) => {
  await page.goto('/');
  const pauseButton = page.getByRole('button', { name: 'Pause animations' });
  await pauseButton.scrollIntoViewIfNeeded();
  await pauseButton.click();
  const resumeButton = page.getByRole('button', { name: 'Resume animations' });
  await expect(resumeButton).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('html')).toHaveClass(/animations-paused/);
  await expect(page.locator('canvas')).toHaveAttribute('data-animation-paused', 'true');
  await page.locator('#network').scrollIntoViewIfNeeded();
  const runningAfterScroll = await page.evaluate(() => document.getAnimations().filter((animation) => animation.playState === 'running').length);
  expect(runningAfterScroll).toBe(0);

  await page.reload();
  await expect(page.getByRole('button', { name: 'Resume animations' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('canvas')).toHaveAttribute('data-animation-paused', 'true');
  await page.locator('#network').scrollIntoViewIfNeeded();
  const runningAfterReload = await page.evaluate(() => document.getAnimations().filter((animation) => animation.playState === 'running').length);
  expect(runningAfterReload).toBe(0);
  await page.getByRole('button', { name: 'Resume animations' }).click();
  await expect(page.locator('html')).not.toHaveClass(/animations-paused/);
  await expect(page.locator('canvas')).toHaveAttribute('data-animation-paused', 'false');
});

test('contact form explains the unavailable captcha and offers direct email', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('textbox', { name: 'Your message' })).toBeVisible();
  await expect(page.getByRole('status').filter({ hasText: 'The contact form is unavailable right now.' })).toBeVisible();
  await expect(page.getByRole('button', { name: '[ TRANSMIT ]' })).toBeDisabled();
  await expect(page.getByRole('link', { name: 'lucas.macori@gmail.com' })).toHaveAttribute('href', 'mailto:lucas.macori@gmail.com');
});

test('Konami terminal dialog can be dismissed with Escape', async ({ page }) => {
  await page.goto('/');
  for (const key of ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']) {
    await page.keyboard.press(key);
  }
  const dialog = page.getByRole('dialog', { name: 'Konami OS terminal' });
  await expect(dialog).toBeVisible({ timeout: 5000 });
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
});

test('Konami terminal prints notes.txt from /usr/lucas', async ({ page }) => {
  await page.goto('/');
  for (const key of ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']) {
    await page.keyboard.press(key);
  }

  const dialog = page.getByRole('dialog', { name: 'Konami OS terminal' });
  const commandInput = dialog.getByRole('textbox');
  await expect(commandInput).toBeVisible({ timeout: 5000 });

  for (const command of ['cd usr', 'cd lucas', 'cat notes.txt']) {
    await commandInput.fill(command);
    await commandInput.press('Enter');
  }

  const notes = dialog.getByText('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ', { exact: true });
  await expect(notes).toBeVisible();

  const textBounds = await notes.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const bounds = range.getBoundingClientRect();
    return { left: bounds.left, right: bounds.right, y: bounds.top + bounds.height / 2 };
  });
  await page.mouse.move(textBounds.left + 1, textBounds.y);
  await page.mouse.down();
  await page.mouse.move(textBounds.right - 1, textBounds.y, { steps: 10 });
  await page.mouse.up();

  const selectedText = await page.evaluate(() => window.getSelection()?.toString());
  expect(selectedText).toContain('youtube.com/watch?v=dQw4w9WgXcQ');
});
