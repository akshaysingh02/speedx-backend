const puppeteer = require('puppeteer');
const { URL } = require('url');

const getData = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const { lhr } = await (await import('lighthouse')).default(url, { port: (new URL(browser.wsEndpoint())).port });


    await browser.close();

    const metrics = {
      performanceScore: lhr.categories.performance.score,
      firstContentfulPaint: lhr.audits["first-contentful-paint"].numericValue,
      speedIndex: lhr.audits["speed-index"].numericValue,
      timeToInteractive: lhr.audits["interactive"].numericValue,
      totalRequestSize: lhr.audits["total-byte-weight"].numericValue,
      numberOfRequests: lhr.audits["network-requests"].details.items.length,
    };

    return res.json(metrics);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while analyzing the URL" });
  }
};

module.exports = {
  getData,
  
};
