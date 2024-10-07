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

  await page.goto('https://www.choctawcasinos.com/events/?when=202410&locations=durant&the_league=');
  await percySnapshot(page, 'Durant Events');

  // await page.goto('https://www.choctawcasinos.com/events/?when=202411&locations=durant&the_league=');
  // await percySnapshot(page, 'Durant Events - November);

  await browser.close();
})();