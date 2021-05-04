const rewire = require("rewire");
const packageUtils = require("../package.utils");

const rewirePackageUtil = rewire("../package.utils");

const options = {
  baseDeliveryCost: 100,
  noOfPackages: 3,
  noOfVehicles: 2,
  maxSpeed: 70,
  limit: 200,
};

const packages = [
  {
    id: "PKG1",
    weight: 50,
    distance: 30,
    offerCode: "OFR001",
  },
  {
    id: "PKG2",
    weight: 75,
    distance: 125,
    offerCode: "OFFR0008",
  },
  {
    id: "PKG3",
    weight: 175,
    distance: 100,
    offerCode: "OFFR003",
  },
  {
    id: "PKG4",
    weight: 110,
    distance: 60,
    offerCode: "OFFR002",
  },
  {
    id: "PKG5",
    weight: 155,
    distance: 95,
    offerCode: "NA",
  },
];

const packageCostResult = [
  {
    id: "PKG1",
    weight: 50,
    distance: 30,
    offerCode: "OFR001",
    discount: 0,
    totalCost: 750,
  },
  {
    id: "PKG2",
    weight: 75,
    distance: 125,
    offerCode: "OFFR0008",
    discount: 0,
    totalCost: 1475,
  },
  {
    id: "PKG3",
    weight: 175,
    distance: 100,
    offerCode: "OFFR003",
    discount: 0,
    totalCost: 2350,
  },
  {
    id: "PKG4",
    weight: 110,
    distance: 60,
    offerCode: "OFFR002",
    discount: 0,
    totalCost: 1500,
  },
  {
    id: "PKG5",
    weight: 155,
    distance: 95,
    offerCode: "NA",
    discount: 0,
    totalCost: 2125,
  },
];

const packageDeliveryResult = [
  {
    id: "PKG1",
    weight: 50,
    distance: 30,
    offerCode: "OFR001",
    discount: 0,
    totalCost: 750,
    estimatedDeliveryTime: 0.42857142857142855,
  },
  {
    id: "PKG2",
    weight: 75,
    distance: 125,
    offerCode: "OFFR0008",
    discount: 0,
    totalCost: 1475,
    estimatedDeliveryTime: 1.7857142857142858,
  },
  {
    id: "PKG3",
    weight: 175,
    distance: 100,
    offerCode: "OFFR003",
    discount: 0,
    totalCost: 2350,
    estimatedDeliveryTime: 1.4285714285714286,
  },
  {
    id: "PKG4",
    weight: 110,
    distance: 60,
    offerCode: "OFFR002",
    discount: 0,
    totalCost: 1500,
    estimatedDeliveryTime: 4.428571428571429,
  },
  {
    id: "PKG5",
    weight: 155,
    distance: 95,
    offerCode: "NA",
    discount: 0,
    totalCost: 2125,
    estimatedDeliveryTime: 4.214285714285714,
  },
];

const firstFitResult = [
  [
    {
      id: 'PKG1',
      weight: 50,
      distance: 30,
      offerCode: 'OFR001'
    },
    {
      id: 'PKG2',
      weight: 75,
      distance: 125,
      offerCode: 'OFFR0008'
    }
  ],
  [
    {
      id: 'PKG3',
      weight: 175,
      distance: 100,
      offerCode: 'OFFR003'
    }
  ],
  [
    {
      id: 'PKG4',
      weight: 110,
      distance: 60,
      offerCode: 'OFFR002'
    }
  ],
  [
    {
      id: 'PKG5',
      weight: 155,
      distance: 95,
      offerCode: 'NA'
    }
  ]
]

const packageSortResult = [
  [
    {
      id: 'PKG1',
      weight: 50,
      distance: 30,
      offerCode: 'OFR001'
    },
    {
      id: 'PKG2',
      weight: 75,
      distance: 125,
      offerCode: 'OFFR0008'
    }
  ],
  [
    {
      id: 'PKG3',
      weight: 175,
      distance: 100,
      offerCode: 'OFFR003'
    }
  ],
  [
    {
      id: 'PKG5',
      weight: 155,
      distance: 95,
      offerCode: 'NA'
    }
  ],
  [
    {
      id: 'PKG4',
      weight: 110,
      distance: 60,
      offerCode: 'OFFR002'
    }
  ]
]

test("findPackageCost: Should return an array of packages with discount and total cost", () => {
  expect(packageUtils.findPackageCost(options, packages)).toStrictEqual(
    packageCostResult
  );
});

test("findPackageEstimateDelivery: Should return an array of packages with discount and total cost and delivery time", () => {
  expect(packageUtils.findPackageEstimateDelivery(options, packages)).toStrictEqual(
    packageDeliveryResult
  );
});

test("firstFit: Should rearrange packages to optimize delivery time", () => {
  const firstFit = rewirePackageUtil.__get__("firstFit");
  expect(firstFit(packages, 200)).toEqual(firstFitResult);
});

test("firstFit: Should return empty array as limit is less than each package", () => {
  const firstFit = rewirePackageUtil.__get__("firstFit")
  expect(firstFit(packages, 1)).toEqual([]);
});

test("getSortPackages: Should sort packages by length and weight", () => {
  const getSortPackages = rewirePackageUtil.__get__("getSortPackages");
  expect(getSortPackages(firstFitResult)).toEqual(packageSortResult);
});

test("reArrangePackagesByInputOrder: Re-arrange packages to show output based on input order", () => {
  const reArrangePackagesByInputOrder = rewirePackageUtil.__get__("reArrangePackagesByInputOrder")
  expect(reArrangePackagesByInputOrder(packages, packageSortResult)).toEqual(packages);
});
