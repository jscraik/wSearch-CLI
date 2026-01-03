import { setTimeout as delay } from "timers/promises";
import { Logger } from "./output.js";

export type HttpOptions = {
  timeout: number;
  retries: number;
  retryBackoff: number;
  logger: Logger;
};

export async function fetchWithRetry(
  input: RequestInfo,
  init: RequestInit,
  options: HttpOptions
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= options.retries; attempt += 1) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), options.timeout);
      const response = await fetch(input, { ...init, signal: controller.signal });
      clearTimeout(timer);

      if (response.status === 429 || response.status >= 500) {
        const retryAfter = response.headers.get("retry-after");
        const waitMs = retryAfter ? Number(retryAfter) * 1000 : options.retryBackoff * (attempt + 1);
        if (attempt < options.retries) {
          options.logger.verbose(`Retrying after ${waitMs}ms (status ${response.status})`);
          await delay(waitMs);
          continue;
        }
      }

      return response;
    } catch (error) {
      lastError = error;
      if (attempt < options.retries) {
        const waitMs = options.retryBackoff * (attempt + 1);
        options.logger.verbose(`Retrying after ${waitMs}ms (network error)`);
        await delay(waitMs);
        continue;
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Network request failed");
}

export async function readBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}
