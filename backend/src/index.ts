import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportlocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
require('dotenv').config();
import User from './User';
import { UserInterface } from './Interface/UserInterface';
const LocalStrategy = passportlocal.Strategy;

console.log('starting server...');

// database
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const cluster = process.env.MONGODB_CLUSTER;
const db = `mongodb+srv://${username}:${password}@cluster0.6rmai.mongodb.net/${cluster}?retryWrites=true&w=majority`;
mongoose.connect(db, {}, (err: Error) => {
  if (err) throw err;
  console.log('connected to mongo!');
});

// middleware
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
// passport
// https://www.passportjs.org/concepts/authentication/strategies/
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err: Error, user: any) => {
      if (err) throw err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

// Understanding passport serialize deserialize
// https://stackoverflow.com/a/27637668
passport.serializeUser((user: any, callback) => {
  callback(null, user.id);
});

passport.deserializeUser((id: string, callback) => {
  User.findOne({ _id: id }, (err: Error, user: any) => {
    const userInformation = {
      username: user.username,
      isAdmin: user.isAdmin,
      id: user._id,
    };
    callback(err, userInformation);
  });
});

const isAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: any = req.user;
  if (user) {
    User.findOne(
      { username: user.username },
      (err: Error, doc: UserInterface) => {
        if (err) throw err;
        if (doc?.isAdmin) {
          next();
        } else {
          res.send('Sorry, only admins allowed');
        }
      }
    );
  } else {
    res.send('Sorry, not logged in');
  }
};

// routes
app.post('/register', async (req, res) => {
  const { username, password } = req?.body;
  if (
    !username ||
    !password ||
    typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    res.send('Invalid request');
    return;
  }

  User.findOne(
    { username },
    async (err: Error, doc: UserInterface) => {
      if (err) throw err;
      if (doc) res.send('User already exists');
      if (!doc) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          username: username,
          password: hashedPassword,
        });
        await newUser
          .save()
          .then((user: UserInterface) => {
            res.send('Success');
          })
          .catch((err: Error) => {
            console.log(err);
            res.status(400).send('Bad request');
          });
      }
    }
  );
});

app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true,
  }),
  (req, res) => {
    res.send('Successfully Authenticated');
  }
);

app.get('/logout', function (req, res) {
  req.logout();
  res.send('Successfully logged out');
});

app.get('/user', (req, res) => {
  res.send(req.user);
});

// clone() fixes MongooseError: Query was already executed bug
// https://stackoverflow.com/a/69430142
app.get('/getAllUsers', isAdminMiddleware, async (req, res) => {
  await User.find({}, (err: Error, data: UserInterface[]) => {
    if (err) throw err;
    const filteredUsers: any = [];
    data.forEach((datum: any) => {
      const userInformation = {
        id: datum._id,
        username: datum.username,
        isAdmin: datum.isAdmin,
      };
      filteredUsers.push(userInformation);
    });
    res.send(filteredUsers);
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

app.post('/deleteUser', isAdminMiddleware, async (req, res) => {
  const { id } = req.body;
  await User.findByIdAndDelete(id, (err: Error) => {
    if (err) throw err;
    res.send('success');
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

app.listen(4000, () => {
  console.log('server started.');
});
