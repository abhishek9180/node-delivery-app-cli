const inquirer = require("inquirer");

module.exports = {
  askGithubCredentials: () => {
    const questions = [
      {
        name: "id",
        type: "input",
        message: "Package ID:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Invalid package id.";
          }
        },
      },
      {
        name: "weight",
        type: "number",
        message: "Package weight:",
        validate: function (value) {
          if (value > 0) {
            return true;
          } else {
            return "Invalid package weight.";
          }
        },
      },
      {
        name: "distance",
        type: "number",
        message: "Distance in KM:",
        validate: function (value) {
          if (value > 0) {
            return true;
          } else {
            return "Invalid distance.";
          }
        },
      },
      {
        name: "offerCode",
        type: "input",
        message: "Enter offer code:",
      },
    ];
    return inquirer.prompt(questions);
  },
};
