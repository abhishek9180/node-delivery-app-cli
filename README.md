# Trello Board with React and Redux 

------

## Dependencies

- [inquirer](https://www.npmjs.com/package/inquirer): Interactive user input
- [yargs](https://www.npmjs.com/package/yargs): Interactive command line tool

------

## Running Application

Follow the steps below to run the application:

1. Download the source code and navigate inside delivery-app
  ```bash
  cd delivery-app
  ```  
2. Install Dependencies
  ```bash
  npm install
  ``` 
3. To check delivery cost estimation with offer, run below command (-b, -n are required options)
  ```bash
  node estimate-cost -b 100 -n 3
  ``` 
4. To check delivery time estimation, run below command (-b, -n, -v, -s, -l are required options)
  ```bash
  node estimate-delivery -b 100 -n 5 -v 2 -s 70 -l 200
  ``` 
5. Provide the package information when prompted

------