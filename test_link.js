const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.url().includes('meme-api.com')) {
      request.respond({
        content: 'application/json',
        headers: {"Access-Control-Allow-Origin": "*"},
        body: JSON.stringify({
          memes: [
            { id: 1, name: 'Normal Meme', title: 'Normal Meme', url: 'http://example.com/a"b.jpg' }
          ]
        })
      });
    } else {
      request.continue();
    }
  });

  await page.goto('http://localhost:8000/index.html');
  await new Promise(r => setTimeout(r, 1500));

  const href = await page.evaluate(() => document.querySelector('a[href^="crea.html"]').getAttribute('href'));
  console.log('Link HREF:', href);

  if (href.includes('quot')) {
      console.error('Failed: Found HTML entity in href');
  } else {
      console.log('Pass');
  }

  await browser.close();
})();
