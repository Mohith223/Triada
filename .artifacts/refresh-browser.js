async page => {
  await page.route('**/*', route => route.continue());
  await page.goto('http://127.0.0.1:4173/');
  await page.waitForSelector('html.is-ready');
  await page.evaluate(() => document.fonts.ready);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: '.artifacts/home-desktop.png' });
  return { heading: await page.locator('h1').innerText(), background: await page.evaluate(() => getComputedStyle(document.body).backgroundColor) };
}
