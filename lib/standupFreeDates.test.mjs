import { describe, expect, it } from "vitest";
import standupFreeDates from "./standupFreeDates.js";

describe("Standup Free Dates Configuration", () => {
  it("should export dates array", () => {
    expect(standupFreeDates).toBeDefined();
    expect(standupFreeDates.dates).toBeDefined();
    expect(Array.isArray(standupFreeDates.dates)).toBe(true);
  });

  it("should have valid date format", () => {
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    
    for (const dateStr of standupFreeDates.dates) {
      expect(typeof dateStr).toBe("string");
      expect(dateStr).toMatch(dateRegex);
      
      // Verify the date can be parsed
      const parsedDate = new Date(dateStr);
      expect(parsedDate instanceof Date).toBe(true);
      expect(isNaN(parsedDate.getTime())).toBe(false);
    }
  });

  it("should export both odd and even cycle dates", () => {
    expect(standupFreeDates.oddCycleDates).toBeDefined();
    expect(standupFreeDates.evenCycleDates).toBeDefined();
    expect(Array.isArray(standupFreeDates.oddCycleDates)).toBe(true);
    expect(Array.isArray(standupFreeDates.evenCycleDates)).toBe(true);
  });

  it("should have dates in chronological order", () => {
    const dates = standupFreeDates.dates;
    
    for (let i = 1; i < dates.length; i++) {
      const prevDate = new Date(dates[i - 1]);
      const currentDate = new Date(dates[i]);
      
      expect(currentDate.getTime()).toBeGreaterThanOrEqual(prevDate.getTime());
    }
  });

  it("should not have duplicate dates", () => {
    const dates = standupFreeDates.dates;
    const uniqueDates = [...new Set(dates)];
    
    expect(dates.length).toBe(uniqueDates.length);
  });

  it("should have dates within reasonable range (2025-2026)", () => {
    for (const dateStr of standupFreeDates.dates) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      
      expect(year).toBeGreaterThanOrEqual(2025);
      expect(year).toBeLessThanOrEqual(2026);
    }
  });

  it("should use even cycle dates as the default", () => {
    expect(standupFreeDates.dates).toEqual(standupFreeDates.evenCycleDates);
  });

  it("should have reasonable number of free dates", () => {
    // Should have some free dates but not too many
    expect(standupFreeDates.dates.length).toBeGreaterThan(10);
    expect(standupFreeDates.dates.length).toBeLessThan(200);
  });

  it("should include common holidays/vacation periods", () => {
    const dates = standupFreeDates.dates;
    
    // Check for dates around common holiday periods
    const hasJanuaryDates = dates.some(date => date.includes("2025/01/"));
    const hasDecemberDates = dates.some(date => date.includes("2025/12/"));
    
    expect(hasJanuaryDates).toBe(true); // New Year period
    expect(hasDecemberDates).toBe(true); // Christmas period
  });
});