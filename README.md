# Passport Authentication w/ React & Node.js + Typescript
[Tutorial](https://www.youtube.com/watch?v=Gwru3BueuiE)

"In this video, we build a full stack, multiple page application with Passport, React and NodeJS all using Typescript. We have protected endpoints, protected routes and conditional rendering all in this application."

## Run

### Server
```
cd backend
npm start
```

### Front end
```
cd client
yarn start
```

### Database
Using MongoDB cloud with Atlas. To set up your own account this may be a helpful [tutorial]('https://www.blog.duomly.com/mongodb-in-the-cloud-with-atlas/') among many others out there.

Using environment variables from a user with database access to a shared cluster. Check out `./backend/.env.example` for how to set up your own `./backend/.env` file.
```
MONGODB_USERNAME=
MONGODB_PASSWORD=
MONGODB_CLUSTER=
```

## Packages
* [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - password hashing
* [cookie-parser](https://github.com/expressjs/cookie-parser) - read and parse cookies between BE/FE
* [cors](https://github.com/expressjs/cors) - access server from multiple different origins
* [dotenv](https://github.com/motdotla/dotenv) - read environment variables
* [express](https://github.com/expressjs/express) - server routing library
* [express-session](https://github.com/expressjs/session) - keep session in express
* [mongoose](https://github.com/Automattic/mongoose) - database
* [passport](https://github.com/jaredhanson/passport) - authentication library
* [passport-local](https://github.com/jaredhanson/passport-local) - authenticate with username and password
