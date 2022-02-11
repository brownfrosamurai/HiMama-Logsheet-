# HiMama Log

> Activity Log MVP implentation

## Install Application Dependencies
```
npm install
```

## Create application environment variables
```
Create a .env file in the config folder and copy the content of config/config.env.env into it and fill appropriately
```

## Run Application
The following command starts the application on port 3000
```
npm start
```

## Development Process
- Link to application diagram: https://lucid.app/documents/view/25158cad-1848-457b-b208-4aaf0f774697

- I took some time to understand the requirements from the  challenge and then, and I sketched out a plan to achieve my desired result. I used "express" has a tool to initialize a server on a Node.js runtime environment.

- I employed the MVC architectural design pattern in implementing this requirements placing emphasis on the models, views, and the controllers(routes).

- In my views folder I used "handlebars" as a templating engine to develop the views.

- I considered integrating with google API's through "passport" to simplify the onboarding process for new and returnning users of the application.

- I also used POSTMAN to test the initial enpoints which where created to serve views.

## Schema Design
 This application make use of two models: 
 - User
 - Timelog
The User model has a one to many relationship with the Timelog where one User can have multiple records of time log.
I found this to be the simplest schema implementation I could do.

## If given another day to work on this application
- I would consider writing and running more extensive tests

## If given a month to work on this application 
- I would consider creating custom authentication for user onboarding
- I would consider separating concerns of the backend and the frontend.
- I wouls also consider implementing an error middleware to better handle errors and exceptions
- I would consider improving the application's performance, by leveraging the pm2 tool.


- Version: 1.0.0
- Licence: ISC
- Author: Oluwafemi Meduna
