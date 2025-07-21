import { describe, expect, it } from "vitest";
import { isToday, isBeforeToday } from "./dates";

const now = new Date();
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

describe("testing dates", () => {
  it("should mark today as today", () => {
    expect(isToday(now)).toBe(true);
  });

  it("should mark yesterday as not today", () => {
    expect(isToday(yesterday)).toBe(false);
  });

  it("should mark yesterday as before today", () => {
    expect(isBeforeToday(yesterday)).toBe(true);
  });

  it("should mark today as not before today", () => {
    expect(isBeforeToday(now)).toBe(false);
  });

  it("should mark tomorrow as not before today", () => {
    expect(isBeforeToday(tomorrow)).toBe(false);
  });
});

describe("test some objects", () => {
  it("should match two objects using toBe", () => {
    expect({ name: "John", age: 25 }).toBe({ name: "John", age: 25 });
  });

  it("should match two objects using toEqual", () => {
    expect({ name: "John", age: 22 }).toEqual({ name: "John", age: 22 });
  });

  it("should match two objects using toBe", () => {
    expect({ name: "John", age: 25 }).toStrictEqual({ name: "John", age: 25 });
  });
});
