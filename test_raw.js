import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  try {
    await page.goto('http://localhost:8080');
    await page.waitForTimeout(3000);
  } catch (e) {
    console.error('Navigation error:', e);
  }
  await browser.close();
})();
