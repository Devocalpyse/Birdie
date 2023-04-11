import { RequestHandler } from 'express';
import { User } from '../models/User';
import { hash, compare, signToken, verifyUser } from '../services/auth';

export const createUser: RequestHandler = async (req, res, next) => {
  let newUser: User = req.body;
  console.log(newUser);

  try {
    if (
      newUser.username &&
      newUser.password &&
      newUser.firstName &&
      newUser.lastName
    ) {
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
  console.log('userController.loginUser: ', user);

  if (user) {
    let match = await compare(req.body.password, user.password);

    if (match) {
      let token = await signToken(user);
      console.log('userController.loginUser.userId: ', user.userId);
      res.status(200).json({ token, userId: user.userId });
    } else {
      res.status(401).send('Wrong password');
    }
  } else {
    res.status(401).send('Wrong username');
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  let user: User | null = await User.findByPk(req.params.userId);
  console.log('userController.getUser: ', req.params.userId);

  if (user) {
    let { userId, username, firstName, lastName, favoriteColor } = user;
    let returnUser = {
      userId,
      username,
      firstName,
      lastName,
      favoriteColor,
    };
    console.log('What the user variable looks like at the controller level: ', returnUser);
    res.status(200).json(returnUser);
  } else {
    res.status(401).send();
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  // verify the user
  let user: User | null = await verifyUser(req);

  if (!user) {
    return res.status(401).send();
  }

  let { userId, username, firstName, lastName, favoriteColor } = req.body;

  if (userId && username && firstName && lastName && favoriteColor) {
    let updatedUser = {
      userId,
      username,
      firstName,
      lastName,
      favoriteColor,
    };
    await User.update(updatedUser, { where: { userId: user.userId } });
    res.status(200).send();
  } else {
    res.status(400).send();
  }
};
