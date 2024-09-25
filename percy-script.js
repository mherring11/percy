const { chromium } = require('playwright');
const percySnapshot = require('@percy/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (url.includes('px.adentifi.com')) {
      return route.abort();
    }
    return route.continue();
  });

  await page.goto('https://www.choctawcasinos.com/events/?locations=durant');
  await percySnapshot(page, 'Durant Events - Default');
  await browser.close();
})();
