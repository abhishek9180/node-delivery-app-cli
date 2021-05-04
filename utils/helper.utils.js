/*
 * @desc Rounds the number upto two decimal
 * @param itemArray: Array array of items
 * @return number with max rounding passed as parameter
 */
function roundDecimal(inputNumber, roundingValue = -1) {
  if (!inputNumber || isNaN(+inputNumber)) return 0;
  const regex = new RegExp("^-?\\d+(?:.\\d{0," + roundingValue + "})?");
  return +inputNumber.toString().match(regex)[0];
}

/*
 * @desc Finds the index of minimum number
 * @param itemArray: Array array of items
 * @return minIndex: number for minimum element if found otherwise -1;
 */
function getMinimumElementIndex(itemArray) {
  let min = Number.MAX_SAFE_INTEGER,
    minIndex = -1;
  itemArray.forEach((item, index) => {
    if (item < min) {
      min = item;
      minIndex = index;
    }
  });
  return minIndex;
}

module.exports = {
    roundDecimal,
    getMinimumElementIndex
}
