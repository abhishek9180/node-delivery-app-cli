const couponUtils = require("../coupon.utils");

test("getCouponDiscount: Should return discount more than 0", () => {
  expect(couponUtils.getCouponDiscount("OFR002", 100, 100)).toBe(7);
});

test("getCouponDiscount: Should return 0 discount, if code is valid but doesn't meet distance or weight condition", () => {
  expect(couponUtils.getCouponDiscount("OFR002", 200, 10)).toBe(0);
});

test("getCouponDiscount: Should return 0 discount, if code is not valid", () => {
  expect(couponUtils.getCouponDiscount("OFR00255", 200, 10)).toBe(0);
});
