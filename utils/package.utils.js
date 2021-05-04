const couponUtils = require("./coupon.utils");
const helpers = require("./helper.utils");
/*
 * @desc First Fit Bin Packing algorithm (Online Algorithm). When processing the next item, scan the, previous bins in order and place the item in the first bin that fits. Start a new bin only if it does not fit in any of the existing bins.
 * @param packages: Array package info with weight
 * @param limit: number Bin limit
 * @return packages: Array<Array> after re-orderrng them to minimize delivery time
 * @link https://www.geeksforgeeks.org/bin-packing-problem-minimize-number-of-used-bins/
 */
function firstFit(packages, limit) {
  // This algoritm is not the optimal as If M is the optimal number of bins, then First Fit never uses more than 1.7M bins. We can use Best Fit algorithm for optimal bin packing but as per the problem statement it might return incorrect result.

  // Initialize result (Count of bins)
  let res = 0;

  // Create an array to store remaining space in bins
  let binRem = [];
  // New array to store re-arranged packages. It will be an array of array
  let modifiedPackages = [];

  // Place items one by one
  for (let i = 0; i < packages.length; i++) {
    // Find the first bin that can accommodate weight[i]
    let j;
    for (j = 0; j < res; j++) {
      if (binRem[j] >= packages[i].weight) {
        binRem[j] = binRem[j] - packages[i].weight;
        modifiedPackages[j].push({...packages[i]});
        break;
      }
    }

    // If no bin could accommodate weight[i]. Create new bin
    if (j == res) {
      // If limit is les than package weight ignore package
      if (limit - packages[i].weight < 0) continue;
      binRem[res] = limit - packages[i].weight;
      if (!modifiedPackages[res]) modifiedPackages[res] = [];
      modifiedPackages[res].push({...packages[i]});
      res++;
    }
  }

  return modifiedPackages;
}

/*
 * @desc Sorts packages by sub array length and if length is equal sort by total weight
 * @param packages: Array<Array> array of packages
 * @return packagesCopy: Array<Array> Sorted packages
 */
function getSortPackages(packages) {
  const packagesCopy = [...packages];

  packagesCopy.sort((a, b) => {
    if (a.length === b.length) {
      const firstBinSum = a.reduce((pv, cv) => pv + cv.weight, 0);
      const secondBinSum = b.reduce((pv, cv) => pv + cv.weight, 0);
      return secondBinSum - firstBinSum;
    }
    return b.length - a.length;
  });
  return packagesCopy;
}

/*
 * @desc Re-arrange packages to show output based on input order
 * @param inputPackages: Array original package info
 * @param modifiedPackages: Array<Array> package info
 * @return packages: Array after Re-arrange packages to show output based on input order
 */
function reArrangePackagesByInputOrder(inputPackages, modifiedPackages) {
  const reArrangedObj = modifiedPackages.reduce((pv, cv) => {
    return cv.reduce((psv, csv) => {
      psv[csv.id] = { ...csv };
      return psv;
    }, pv);
  }, {});

  return inputPackages.filter(p => reArrangedObj.hasOwnProperty(p.id)).map((p) => reArrangedObj[p.id]);
}

/*
 * @desc Returns modified package object after including delivery time for each of the package
 * @param options: Object option parameter
 * @param packages: Array<Array> package info
 * @return packages: Array<Array> after finding delivery time for each of the package
 */
function updatePackageDeliveryTime(options, packages) {
  let currentTime = 0,
    runningVehicleIndex = 0;
  const packagesCopy = [...packages];
  // availableVehicles[i] > 0 means vehicle is running and availableVehicles[i] == 0 vehicle is available
  const availableVehicles = [0, 0];

  for (let i = 0; i < packagesCopy.length; i++) {
    let maxDeliveryTime = 0;

    for (let j = 0; j < packagesCopy[i].length; j++) {
      const deliveryTime = packagesCopy[i][j].distance / options.maxSpeed;
      // Total shipment time including wait
      packagesCopy[i][j].estimatedDeliveryTime = currentTime + deliveryTime;
      if (maxDeliveryTime < deliveryTime) {
        maxDeliveryTime = deliveryTime;
      }
    }

    availableVehicles[runningVehicleIndex++] =
      currentTime + 2 * maxDeliveryTime;

    runningVehicleIndex = helpers.getMinimumElementIndex(availableVehicles);
    currentTime = availableVehicles[runningVehicleIndex];
    availableVehicles[runningVehicleIndex] = 0;
  }

  return packagesCopy;
}

/*
 * @desc Returns modified package object after including total delivery cost for each of the package
 * @param options: Object
 * @param packages: Array package info
 * @return packages: Array after finding total delivery cost for each of the package
 */
function findPackageCost(options, packages) {
  const packageCosts = packages.map((p) => {
    let totalCost = options.baseDeliveryCost + p.weight * 10 + p.distance * 5;
    const discount =
      (totalCost *
        couponUtils.getCouponDiscount(p.offerCode, p.distance, p.weight)) /
      100;
    totalCost = totalCost - discount;
    return { ...p, discount, totalCost };
  });
  return packageCosts;
}

/*
 * @desc Returns modified package object after including total delivery cost for each of the package
 * @param option: Object
 * @param packages: Array package info
 * @return packages: Array after finding total delivery cost for each of the package
 */
function findPackageEstimateDelivery(options, packages) {
  // Find package delivery cost for each package
  let updatedInfo = findPackageCost(options, packages);
  // Get optimal item group delivered
  updatedInfo = firstFit(updatedInfo, options.limit);
  updatedInfo = getSortPackages(updatedInfo);

  // Update delivery time for each vehicle
  updatedInfo = updatePackageDeliveryTime(options, updatedInfo);

  return reArrangePackagesByInputOrder(packages, updatedInfo);
}

function printPackageCostInfo(packages) {
  packages.forEach((p) => {
    console.log(
      `${p.id} ${p.discount} ${helpers.roundDecimal(p.totalCost, 2)}`
    );
  });
}

function printPackageDeliveryInfo(packages) {
  packages.forEach((p) => {
    console.log(
      `${p.id} ${p.discount} ${helpers.roundDecimal(
        p.totalCost,
        2
      )} ${helpers.roundDecimal(p.estimatedDeliveryTime, 2)}`
    );
  });
}

module.exports = {
  findPackageCost,
  findPackageEstimateDelivery,
  printPackageCostInfo,
  printPackageDeliveryInfo,
};
