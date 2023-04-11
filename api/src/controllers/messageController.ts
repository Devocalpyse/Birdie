import { RequestHandler } from 'express';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { verifyUser } from '../services/auth';

export const getAllMessages: RequestHandler = async (req, res, next) => {
  const messages = await Message.findAll({ include: [User], order: [['updatedAt', 'DESC']] });
  res.status(200).json(messages);
};

export const getMessage: RequestHandler = async (req, res) => {
  const message = await Message.findByPk(req.params.messageId);

  if (message) {
    res.status(200).json(message);
  } else {
    res.status(404).json({});
  }
};

export const createMessage: RequestHandler = async (req, res) => {
  let user: User | null = await verifyUser(req);

  if (!user) {
    return res.status(401).send();
  }

  let newMessage: Message = req.body;
  newMessage.userId = user.userId;

  if (newMessage.message) {
    const response = await Message.create(newMessage);
    res.status(201).json(response);
  } else {
    res.status(400).send();
  }
};

export const updateMessage: RequestHandler = async (req, res) => {
  const user: User | null = await verifyUser(req);
  if (!user) {
    return res.status(401).send();
  }

  const messageId = req.params.messageId;
  const search = await Message.findByPk(messageId);
  const payload: Message = req.body;

  if (
    search &&
    search.messageId == payload.messageId &&
    payload.message &&
    payload.userId &&
    search.userId == payload.userId
  ) {
    await Message.update(payload, { where: { messageId: req.params.messageId } });
    res.status(200).send();
  } else {
    res.status(404).send();
  }
};

export const deleteMessage: RequestHandler = async (req, res) => {
  const user: User | null = await verifyUser(req);

  if (!user) {
    return res.status(401).send();
  }

  const messageId = req.params.messageId;
  const search = await Message.findByPk(messageId);

  if (search && search.userId == user.userId) {
    await Message.destroy({ where: { messageId: req.params.messageId } });
    res.status(200).send();
  } else {
    res.status(404).send();
  }
};
