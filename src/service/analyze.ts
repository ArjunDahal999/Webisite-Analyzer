"use server";
import { baseActionClient } from "@/lib/action-client";
import puppeteer from "puppeteer";
import { urlValidationSchema } from "@/validation/url-validation";

export const analyzeUrl = baseActionClient
  .inputSchema(urlValidationSchema)
  .action(async ({ parsedInput }) => {
    const { url } = parsedInput;
    const browser = await puppeteer.launch({
      executablePath: puppeteer.executablePath(),
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    let totalBytes = 0;
    let requestCount = 0;

    page.on("response", async (response) => {
      try {
        const buffer = await response.buffer();
        totalBytes += buffer.length;
        requestCount++;
      } catch (err) {
        if (err instanceof Error) {
          console.warn(
            `⚠️ Skipped response: ${response.url()} — ${err.message}`
          );
        } else {
          console.warn(
            `⚠️ Skipped response: ${response.url()} — Unknown error`
          );
        }
      }
    });

    const start = Date.now();
    await page.goto(url, { waitUntil: "load", timeout: 60000 });
    const end = Date.now();

    const loadTime = ((end - start) / 1000).toFixed(2); // in seconds
    const pageSize = (totalBytes / 1024).toFixed(2); // in KB

    await browser.close();

    return {
      loadTime,
      pageSize,
      requestCount,
      url,
    };
  });
