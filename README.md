# HiMama Log

> Activity Log MVP implentation

## Install Application Dependencies
```
npm install
```

## Create application environment variables
```
Edit config/config.env.env to config/config.env and fill in the required parameters 
```

## Run Application
The following command starts the application on port 3000
```
npm start
```

## Live@
```
https://himama-logsheet.herokuapp.com/
```

## Development Process
- Link to application diagram: https://lucid.app/documents/view/25158cad-1848-457b-b208-4aaf0f774697

- Initialized an express server on Node.js runtime environment.

- MVC architectural design pattern in implementing this requirements placing emphasis on the models, views, and the controllers(routes).

- Handlebars templating engine to render views.

- Integrate google API's through "passport.js" to simplify the onboarding process for new and returnning users of the application.

- POSTMAN to test the initial enpoints which where created to serve web views.

## Schema Design
 This application makes use of two models: 
 - User
 - Timelog
```
The User model has a one to many relationship with the Timelog where one User can have multiple records of time log.
I found this to be the simplest schema implementation I could do.
```
## If given another day to work on this application
- I would consider writing and running some more tests to ensure the application is stable.

## If given a month to work on this application 
- I would consider creating custom authentication for user onboarding.
- I would consider separating concerns of the backend and the frontend, maybe use React.js for development on the frontend since it pairs well with Node.js.
- I would also consider implementing an error middleware to better handle errors and exceptions
- I would consider improving the application's performance, by leveraging the pm2 tool.


- Version: 1.0.0
- Licence: ISC
- Author: Oluwafemi Meduna
