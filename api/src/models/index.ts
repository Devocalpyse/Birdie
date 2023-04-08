import { Sequelize } from 'sequelize';
import { UserFactory } from './User';
import { AssociateUserMessage, MessageFactory } from './Message';

const sequelize = new Sequelize(
  process.env.NAME!,
  process.env.USER!,
  process.env.PASS!,
  {
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT!),
    dialect: 'mysql',
  }
);

UserFactory(sequelize);
MessageFactory(sequelize);
AssociateUserMessage();

export const db = sequelize;