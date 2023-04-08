import { InferAttributes, InferCreationAttributes, Model, Sequelize, DataTypes } from 'sequelize';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare userId: number;
  declare username: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare favoriteColor?: string;
}

export function UserFactory(sequelize: Sequelize) {
  return User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      favoriteColor: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: 'users',
    }
  );
}
