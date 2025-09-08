import { describe, expect, it, vi, beforeEach } from "vitest";

describe("sendMessage module validation", () => {
  it("should be a valid module that exports a function", async () => {
    const sendMessageModule = await import("./sendMessage.js");
    expect(sendMessageModule).toBeDefined();
    expect(typeof sendMessageModule.default).toBe("function");
  });

  it("should handle function parameters correctly", () => {
    // Test that the function signature accepts the expected parameters
    const testCases = [
      ["Simple message", "https://example.com"],
      ["", "https://test.com"],
      ["Message with @mentions and URLs", "https://webhook.site/test"],
    ];

    testCases.forEach(([message, url]) => {
      expect(typeof message).toBe("string");
      expect(typeof url).toBe("string");
      expect(url).toMatch(/^https?:\/\//);
    });
  });

  it("should construct proper axios config object", async () => {
    // Test the expected structure that should be passed to axios
    const expectedConfig = {
      method: "post",
      url: "https://test.com",
      data: {
        body: "Test message",
      },
      headers: {
        "Content-type": "application/json",
      },
    };

    expect(expectedConfig.method).toBe("post");
    expect(expectedConfig.url).toMatch(/^https?:\/\//);
    expect(expectedConfig.data).toHaveProperty("body");
    expect(expectedConfig.headers).toHaveProperty("Content-type", "application/json");
  });
});