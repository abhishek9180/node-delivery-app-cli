#!/usr/bin/env node
const yargs = require("yargs");
const inquirer = require("../libs/package-inquirer");
const packageCost = require("../utils/package.utils");

const options = yargs
  .usage(
    "Usage: -b <base_delivery_cost> -n <no_of_packages> -v<no_of_vehicle> -s<max_speed> -l<limit>"
  )
  .option("b", {
    alias: "baseDeliveryCost",
    describe: "Base delivery cost",
    type: "number",
    demandOption: true,
  })
  .option("n", {
    alias: "noOfPackages",
    describe: "Number of packages",
    type: "number",
    demandOption: true,
  })
  .option("v", {
    alias: "noOfVehicles",
    describe: "Number of vehicles",
    type: "number",
    demandOption: true,
  })
  .option("s", {
    alias: "maxSpeed",
    describe: "Maximum speed",
    type: "number",
    demandOption: true,
  })
  .option("l", {
    alias: "limit",
    describe: "Maximum carriable weight",
    type: "number",
    demandOption: true,
  }).argv;

const inquirePackageInfo = async (options) => {
  const packageInfo = [];
  for (let i = 0; i < options.noOfPackages; i++) {
    packageInfo.push(await inquirer.askGithubCredentials());
  }
  packageCost.printPackageDeliveryInfo(
    packageCost.findPackageEstimateDelivery(options, packageInfo)
  );
};

// Get package info for n packages
inquirePackageInfo(options);
