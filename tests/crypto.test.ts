import { describe, expect, it } from "vitest";
import { decryptToken, encryptToken } from "../src/crypto.js";


describe("crypto", () => {
  it("round-trips encryption", () => {
    const token = "secret-token";
    const passphrase = "passphrase-123";
    const encrypted = encryptToken(token, passphrase);
    const decrypted = decryptToken(encrypted, passphrase);
    expect(decrypted).toBe(token);
  });
});
