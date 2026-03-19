const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const baseUrl = 'https://smart-release-planner1.vercel.app/';
  const outDir = path.join(__dirname, 'public/screenshots');

  const newPage = async () => {
    const p = await browser.newPage();
    await p.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });
    return p;
  };

  const loadDemo = async (page) => {
    await page.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));
    await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('button, a'))
        .find(e => e.textContent.includes('Browse pre-built demo data'));
      if (el) el.click();
    });
    await new Promise(r => setTimeout(r, 3000));
  };

  const clickByText = async (page, text) => {
    return page.evaluate((txt) => {
      const el = Array.from(document.querySelectorAll('button, a, li, tr, td, [role="button"]'))
        .find(e => e.textContent.trim().includes(txt));
      if (el) { el.click(); return el.textContent.trim().slice(0, 60); }
      return null;
    }, text);
  };

  const shot = async (page, n, desc) => {
    await new Promise(r => setTimeout(r, 2200));
    const file = `${outDir}/srp-${n}.png`;
    await page.screenshot({ path: file });
    console.log(`Shot ${n}: "${desc}" → srp-${n}.png`);
    await page.close();
  };

  // ── Shot 1: Landing / entry modal ──
  let p = await newPage();
  await p.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  await shot(p, 1, 'Landing — choose your path');

  // ── Shot 2: Main dashboard overview ──
  p = await newPage();
  await loadDemo(p);
  await shot(p, 2, 'Dashboard — all products at a glance');

  // ── Shot 3: Drill into first product (click on product card) ──
  p = await newPage();
  await loadDemo(p);
  // Try clicking a product name / release row
  const drillTarget = await p.evaluate(() => {
    const items = Array.from(document.querySelectorAll('li, tr, [class*="product"], [class*="card"], [class*="row"]'));
    const item = items.find(el => el.textContent.trim().length > 3 && el.offsetHeight > 20);
    if (item) { item.click(); return item.textContent.trim().slice(0, 60); }
    return null;
  });
  console.log('Drilled into:', drillTarget);
  await new Promise(r => setTimeout(r, 2000));
  await shot(p, 3, 'Release list — releases inside a product');

  // ── Shot 4: Smart Release AI view ──
  p = await newPage();
  await loadDemo(p);
  await clickByText(p, 'Smart Release');
  await new Promise(r => setTimeout(r, 2500));
  await shot(p, 4, 'Smart Release — AI-powered planning');

  // ── Shot 5: Plan from PRD ──
  p = await newPage();
  await loadDemo(p);
  await clickByText(p, 'Plan from PRD');
  await new Promise(r => setTimeout(r, 2500));
  await shot(p, 5, 'Plan from PRD — import a spec, get a sprint plan');

  // ── Shot 6: Team / capacity view ──
  p = await newPage();
  await loadDemo(p);
  await clickByText(p, 'Team');
  await new Promise(r => setTimeout(r, 2500));
  await shot(p, 6, 'Team — capacity and PTO management');

  // ── Shot 7: What's Next panel (notification/pipeline) ──
  p = await newPage();
  await loadDemo(p);
  await clickByText(p, "What's Next");
  await new Promise(r => setTimeout(r, 2500));
  await shot(p, 7, "What's Next — upcoming releases radar");

  // ── Shot 8: Click "Try It Yourself" guided flow ──
  p = await newPage();
  await p.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  await clickByText(p, 'Try It Yourself');
  await new Promise(r => setTimeout(r, 2500));
  await shot(p, 8, 'Guided onboarding — create your first product');

  await browser.close();
  console.log('\nAll 8 screenshots done!');
})().catch(e => { console.error(e.message); process.exit(1); });
