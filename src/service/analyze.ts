"use server";
import { baseActionClient } from "@/lib/action-client";
import { urlValidationSchema } from "@/validation/url-validation";
import { chromium } from "playwright";

export const analyzeUrl = baseActionClient
  .inputSchema(urlValidationSchema)
  .action(async ({ parsedInput }) => {
    const { url } = parsedInput;

    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    let totalBytes = 0;
    let requestCount = 0;

    // Monitor network requests
    page.on("response", async (response) => {
      try {
        const body = await response.body();
        totalBytes += body.length;
        requestCount++;
      } catch (err) {
        if (err instanceof Error) {
          console.warn(`Skipped response: ${response.url()} — ${err.message}`);
        } else {
          console.warn(`Skipped response: ${response.url()} — Unknown error`);
        }
      }
    });

    const start = Date.now();
    await page.goto(url, { waitUntil: "load", timeout: 60000 });
    const end = Date.now();

    const loadTime = ((end - start) / 1000).toFixed(2);
    const pageSize = (totalBytes / 1024).toFixed(2);

    await browser.close();

    return {
      loadTime,
      pageSize,
      requestCount,
      url,
    };
  });
