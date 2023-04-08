import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { User } from '../models/User';

const secret = process.env.SECRET!;

// export an async function to sign a JWT using jwt.sign
export async function signToken(user: User) {
  let token = jwt.sign({ userId: user.userId }, secret, { expiresIn: '24h' });
  return token;
}

// export an async function to create a hashed password using bcrypt.hash
export async function hash(plainText: string) {
  return await bcrypt.hash(plainText, 12);
}

// export an async function to compare a hashed password with a plain text password
export async function compare(plainText: string, hashedText: string) {
  return await bcrypt.compare(plainText, hashedText);
}

export async function verifyUser(req: Request) {
  const header = req.headers.authorization;
  if (header) {
    const token = header.split(' ')[1];
    try {
      let decoded: any = await jwt.verify(token, secret);
      return User.findByPk(decoded.userId);
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
}