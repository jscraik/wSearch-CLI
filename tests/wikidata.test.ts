import { describe, expect, it } from "vitest";
import { entityTypeForId, entityPath } from "../src/wikidata.js";

describe("entityTypeForId", () => {
  it("maps Q ids to items", () => {
    expect(entityTypeForId("Q42")).toBe("items");
  });

  it("maps P ids to properties", () => {
    expect(entityTypeForId("P31")).toBe("properties");
  });

  it("maps L ids to lexemes", () => {
    expect(entityTypeForId("L1")).toBe("lexemes");
  });

  it("rejects unknown ids", () => {
    expect(() => entityTypeForId("Z9")).toThrowError(/Unsupported entity id/);
  });
});

describe("entityPath", () => {
  it("builds entity path", () => {
    expect(entityPath("q42")).toBe("/entities/items/Q42");
  });
});
