const CouponInfo = require("../constants/coupon-details.json");

function getCouponDiscount(couponCode, distance, weight) {
  let discount = 0;
  const couponInfo = (couponCode && CouponInfo[couponCode]) || null;
  if (couponInfo) {
    if (
      couponInfo.minDistance <= distance &&
      couponInfo.maxDistance >= distance &&
      couponInfo.minWeight <= weight &&
      couponInfo.maxWeight >= weight
    ) {
      // coupon is valid
      discount = couponInfo.discount;
    }
  }
  return discount;
}

module.exports = {
  getCouponDiscount,
};
