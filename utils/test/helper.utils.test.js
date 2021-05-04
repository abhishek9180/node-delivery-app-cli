const helpers = require("../helper.utils");

test("roundDecimal: Returns number without decimal, if decimal is not present", () => {
  expect(helpers.roundDecimal(10, 2)).toBe(10);
});

test("roundDecimal: Returns number with 3 decimal", () => {
  expect(helpers.roundDecimal(10.5467, 3)).toBe(10.546);
});

test("roundDecimal: Returns 0 if not a valid number", () => {
  expect(helpers.roundDecimal("not")).toBe(0);
});

test("getMinimumElementIndex: Returns minimum item index", () => {
  expect(helpers.getMinimumElementIndex([11, 2, 1, 3])).toBe(2);
});

test("getMinimumElementIndex: Should return -1, when array is empty ", () => {
  expect(helpers.getMinimumElementIndex([])).toBe(-1);
});
