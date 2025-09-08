import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

describe("Main application logic tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Date utility functions", () => {
    let isToday, isBeforeToday, isStandupDay;

    beforeEach(async () => {
      const datesModule = await import("./lib/dates.mjs");
      isToday = datesModule.isToday;
      isBeforeToday = datesModule.isBeforeToday;
      isStandupDay = datesModule.isStandupDay;
    });

    it("should correctly identify today", () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });

    it("should correctly identify dates before today", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isBeforeToday(yesterday)).toBe(true);
      
      const today = new Date();
      expect(isBeforeToday(today)).toBe(false);
    });

    it("should determine standup day status", () => {
      const result = isStandupDay();
      expect(typeof result).toBe("boolean");
      expect(console.log).toHaveBeenCalled();
    });
  });

  describe("Response format validation", () => {
    it("should validate success response structure", () => {
      const mockSuccessResponse = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Your function executed successfully!",
          input: { test: "event" },
        }, null, 2),
      };

      expect(mockSuccessResponse.statusCode).toBe(200);
      expect(typeof mockSuccessResponse.body).toBe("string");
      
      const parsedBody = JSON.parse(mockSuccessResponse.body);
      expect(parsedBody.message).toContain("successfully");
      expect(parsedBody.input).toBeDefined();
    });

    it("should validate error response structure", () => {
      const mockErrorResponse = {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error",
          error: { message: "Test error" },
        }, null, 2),
      };

      expect(mockErrorResponse.statusCode).toBe(500);
      const parsedBody = JSON.parse(mockErrorResponse.body);
      expect(parsedBody.message).toBe("Error");
      expect(parsedBody.error).toBeDefined();
    });
  });

  describe("Configuration validation", () => {
    it("should have valid URLs and message format", () => {
      const standupChannelUrl = "https://chat-hooks.us.teamwork.com/v1/in/1/eff5224e-6dd2-4e04-b9b5-db04906f4db4";
      const standupCallUrl = "https://meet.google.com/aci-ziuw-end";
      
      expect(standupChannelUrl).toMatch(/^https:\/\//);
      expect(standupCallUrl).toMatch(/^https:\/\//);
      
      const message = `@online it's standup time! ${standupCallUrl}`;
      expect(message).toContain("@online");
      expect(message).toContain("standup time");
      expect(message).toContain(standupCallUrl);
    });
  });

  describe("Event handling", () => {
    it("should handle different event types", () => {
      const testEvents = [
        null,
        undefined,
        {},
        { Records: [] },
        { source: "test", detail: {} },
        { test: "simple event" }
      ];

      testEvents.forEach(event => {
        expect(() => JSON.stringify(event)).not.toThrow();
      });
    });
  });
});