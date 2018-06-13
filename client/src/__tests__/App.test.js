function sum(a, b) {
  return a + b;
}

test("can sum", () => {
  expect(sum(1, 2)).toBe(3);
});
