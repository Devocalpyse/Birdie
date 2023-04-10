import { RequestHandler } from 'express';
import { User } from '../models/User';
import { hash, compare, signToken, verifyUser } from '../services/auth';

export const createUser: RequestHandler = async (req, res, next) => {
  let newUser: User = req.body;

  try {
    if (newUser.username && newUser.password && newUser.firstName && newUser.lastName) {
      let hashedPassword = await hash(newUser.password);
      newUser.password = hashedPassword;

      let createdUser = await User.create(newUser);

      res.status(201).json(createdUser);
    } else {
      res.status(400).send('Bad Request');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  let user: User | null = await User.findOne({ where: { username: req.body.username } });

  if (user) {
    let match = await compare(req.body.password, user.password);

    if (match) {
      let token = await signToken(user);
      let { userId } = user;
      res.status(200).json({ token, userId });
    } else {
      res.status(401).send('Wrong password');
    }
  } else {
    res.status(401).send('Wrong username');
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req);

  if (user) {
    let { userId, username, firstName, lastName, favoriteColor } = user;
    res.status(200).json({
      userId,
      username,
      firstName,
      lastName,
      favoriteColor,
    });
  } else {
    res.status(401).send();
  }
};
