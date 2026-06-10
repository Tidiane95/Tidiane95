const puppeteer = require('puppeteer');
const path = require('path');

const pages = [
  { url: '/', name: '01-landing' },
  { url: '/login', name: '02-login' },
  { url: '/dashboard', name: '03-dashboard' },
  { url: '/request', name: '04-request' },
  { url: '/history', name: '05-history' },
  { url: '/gift-cards', name: '06-gift-cards' },
  { url: '/wellness', name: '07-wellness' },
  { url: '/admin', name: '08-admin' },
  { url: '/admin/requests', name: '09-admin-requests' },
];

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  for (const p of pages) {
    try {
      await page.goto(`http://localhost:3000${p.url}`, { waitUntil: 'networkidle2', timeout: 15000 });
      await page.screenshot({ path: path.join('/tmp', `${p.name}.png`), fullPage: true });
      console.log(`✓ ${p.name}`);
    } catch (e) {
      console.log(`✗ ${p.name}: ${e.message}`);
    }
  }

  await browser.close();
})();
