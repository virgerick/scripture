import  {Sequelize}  from "sequelize";
const {
    _DATABASE,
_USERNAME,
_HOST,
_PASSWORD
 } = process.env;

export const sequelize = new Sequelize({
  database: _DATABASE,
  username:_USERNAME,
  password:_PASSWORD,
  host:_HOST,
  dialect: "mysql",
  ssl: true,
  dialectOptions: {

    ssl: { rejectUnauthorized: true },
  },

});
