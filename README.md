# Musala Soft Gateways manager task

This sample project is managing gateways - master devices that control multiple peripheral devices.

This web app contain **_API's_** and **_UI_**

# Technology List:

### Front-End

- Angular (v13)

### Back-end (API)

- Node (14.18.1)
- Express.js

### Database

- Mongoose

### Work environment

- Linux as development environment

# Back-End (API)

### Project Structure

- Controllers:
  - Gateway controller that manage all gateway operations like (Add, Edit, Delete, View, Devices's operations)
  - Device controller that manage all device operations like (Get, Edit, Delete)
- Models: include database schema
  - Device model
  - Gateway model
  - index (include database connections)
- Routes:
  - devices routes
  - gateways routes
- Seeder: include mongoose demo data
  - index
  - mongoSeed
- test: include unit testing for all api's in different cases
  - test-cases
    - device.spec
    - gateways.spec
  - testHelper : include helper function for testing
- app.js : include main app functions
- server.js : using for init project server
- package.json : include project dependencies

### Scripts

- Clone repo from ['https://github.com/nazeehsalah/musal_task']
- move to app dir then go to back-end folder and run `npm install`
- To run dev env : `npm run dev`
- To run test : `npm run test`
- To run seeder : `npm run seeder`

### Postman collection :

https://documenter.getpostman.com/view/4580375/Uz5DocAG#64ddb4b1-1d56-4cb5-b1d9-1f1c89a56e88

# Front-End (UI)

### Project Structure

- src/app
  - @app : include project modules and sub modules (the required project components inside it)
  - @core : include main services and shared data that used by all the app like (interceptors - interfaces - services -mocks data)
  - @shared : include all shared data like (components, pips , modules)
  - @theme include all theme components and layouts
- assets : to include project assets like (images, fonts)
- environments : to include env files

### Scripts

- Clone repo from ['https://github.com/nazeehsalah/musal_task']
- move to app dir then go to front-end folder and run `npm install`
- To run dev env : `ng serve --open`
- To run test : `ng test`

# Auto build front-end and run back-end server

run `./back_deploy.sh`

# To deploy front-end

run `./front_deploy.sh`

# to deploy Back-end

run `./back_deploy.sh`
