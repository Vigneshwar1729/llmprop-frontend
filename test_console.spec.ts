import { test } from '@playwright/test';

test('print console errors', async ({ page }) => {
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`console error: ${msg.text()}`);
    } else {
      console.log(`console ${msg.type()}: ${msg.text()}`);
    }
  });
  page.on('pageerror', exception => {
    console.log(`pageerror: ${exception}`);
  });
  
  await page.goto('http://localhost:8080');
  await page.waitForTimeout(3000);
});
