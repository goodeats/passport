import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import passportlocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
require('dotenv').config();
import User from './User';
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

  User.findOne({ username }, async (err: Error, doc: any) => {
    if (err) throw err;
    if (doc) res.send('User already exists');
    if (!doc) {
      const hashedPassword = bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send('Success');
    }
  });
});

app.listen(4000, () => {
  console.log('server started.');
});
