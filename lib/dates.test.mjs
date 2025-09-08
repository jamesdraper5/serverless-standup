import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { isToday, isBeforeToday, isStandupDay } from "./dates";

// Mock the standupFreeDates module
vi.mock("./standupFreeDates.js", () => ({
  default: {
    dates: [
      "2025/01/01", // New Year's Day
      "2025/12/25", // Christmas  
      "2025/07/04", // July 4th
    ],
  },
}));

const now = new Date();
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

describe("Date utility functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("isToday", () => {
    it("should mark today as today", () => {
      expect(isToday(now)).toBe(true);
    });

    it("should mark yesterday as not today", () => {
      expect(isToday(yesterday)).toBe(false);
    });

    it("should mark tomorrow as not today", () => {
      expect(isToday(tomorrow)).toBe(false);
    });

    it("should handle different time zones correctly", () => {
      const todayDifferentTime = new Date();
      todayDifferentTime.setHours(23, 59, 59, 999); // Very end of day
      expect(isToday(todayDifferentTime)).toBe(true);
      
      const todayEarlyTime = new Date();
      todayEarlyTime.setHours(0, 0, 0, 0); // Very start of day
      expect(isToday(todayEarlyTime)).toBe(true);
    });

    it("should handle date strings correctly", () => {
      const todayString = new Date(now.toDateString());
      expect(isToday(todayString)).toBe(true);
    });
  });

  describe("isBeforeToday", () => {
    it("should mark yesterday as before today", () => {
      expect(isBeforeToday(yesterday)).toBe(true);
    });

    it("should mark today as not before today", () => {
      expect(isBeforeToday(now)).toBe(false);
    });

    it("should mark tomorrow as not before today", () => {
      expect(isBeforeToday(tomorrow)).toBe(false);
    });

    it("should handle time normalization correctly", () => {
      const todayWithDifferentTime = new Date();
      todayWithDifferentTime.setHours(15, 30, 45, 123);
      expect(isBeforeToday(todayWithDifferentTime)).toBe(false);
    });

    it("should handle dates from previous years", () => {
      const lastYear = new Date(now.getFullYear() - 1, 5, 15);
      expect(isBeforeToday(lastYear)).toBe(true);
    });
  });

  describe("isStandupDay", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.spyOn(console, "log").mockImplementation(() => {});
    });

    it("should return true for regular days", () => {
      // Mock today to not be a free day
      const mockToday = new Date("2025-06-15"); // Not in our mock free dates
      vi.stubGlobal("Date", class extends Date {
        constructor(...args) {
          if (args.length === 0) {
            super(mockToday);
          } else {
            super(...args);
          }
        }
        static now() {
          return mockToday.getTime();
        }
      });

      const result = isStandupDay();
      expect(result).toBe(true);
      expect(console.log).toHaveBeenCalledWith("isStandupDay", true);

      vi.unstubAllGlobals();
    });

    it("should return false when today is a free day", () => {
      // Mock today to be one of the free days
      const mockToday = new Date("2025-01-01"); // This is in our mock free dates
      vi.stubGlobal("Date", class extends Date {
        constructor(...args) {
          if (args.length === 0) {
            super(mockToday);
          } else {
            super(...args);
          }
        }
        static now() {
          return mockToday.getTime();
        }
      });

      const result = isStandupDay();
      expect(result).toBe(false);
      expect(console.log).toHaveBeenCalledWith("no standup today", "2025/01/01");
      expect(console.log).toHaveBeenCalledWith("isStandupDay", false);

      vi.unstubAllGlobals();
    });

    it("should handle Christmas day correctly", () => {
      const mockToday = new Date("2025-12-25");
      vi.stubGlobal("Date", class extends Date {
        constructor(...args) {
          if (args.length === 0) {
            super(mockToday);
          } else {
            super(...args);
          }
        }
        static now() {
          return mockToday.getTime();
        }
      });

      const result = isStandupDay();
      expect(result).toBe(false);

      vi.unstubAllGlobals();
    });

    it("should handle July 4th correctly", () => {
      const mockToday = new Date("2025-07-04");
      vi.stubGlobal("Date", class extends Date {
        constructor(...args) {
          if (args.length === 0) {
            super(mockToday);
          } else {
            super(...args);
          }
        }
        static now() {
          return mockToday.getTime();
        }
      });

      const result = isStandupDay();
      expect(result).toBe(false);

      vi.unstubAllGlobals();
    });
  });
});

describe("Legacy object comparison tests", () => {
  it("should match two objects using toBe", () => {
    expect({ name: "John", age: 25 }).toStrictEqual({ name: "John", age: 25 });
  });

  it("should match two objects using toEqual", () => {
    expect({ name: "John", age: 22 }).toEqual({ name: "John", age: 22 });
  });

  it("should match two objects using toStrictEqual", () => {
    expect({ name: "John", age: 25 }).toStrictEqual({ name: "John", age: 25 });
  });
});
