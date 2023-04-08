import { Sequelize } from 'sequelize';
import { UserFactory } from './User';
import { AssociateUserMessage, MessageFactory } from './Message';

// Create a new Sequelize instance using the environment variables and MySQL database
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    dialect: 'mysql',
  }
);

UserFactory(sequelize);
MessageFactory(sequelize);
AssociateUserMessage();

export const db = sequelize;