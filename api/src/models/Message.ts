import { InferAttributes, InferCreationAttributes, Model, Sequelize, DataTypes } from 'sequelize';
import { User } from './User';

export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
  declare messageId: number;
  declare userId: number;
  declare message: string;
}

export function MessageFactory(sequelize: Sequelize) {
  Message.init(
    {
      messageId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'messages',
    }
  );
}

export function AssociateUserMessage() {
  User.hasMany(Message, { foreignKey: 'userId' });
  Message.belongsTo(User, { foreignKey: 'userId' });
}