import { describe, expect, it } from "vitest";
import { readBody } from "../src/http.js";

describe("readBody", () => {
  it("parses +json content types", async () => {
    const payload = { ok: true };
    const response = new Response(JSON.stringify(payload), {
      headers: { "content-type": "application/sparql-results+json; charset=utf-8" }
    });
    const body = await readBody(response);
    expect(body).toEqual(payload);
  });
});
