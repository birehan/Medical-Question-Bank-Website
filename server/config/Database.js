import config from "config";
import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
const { host, port, user, password, database } = config.get("database");

const db = new Sequelize(database, user, password, {
  host: host,
  port: port,
  dialect: "mysql",
});
function init() {
  db.sync()
    .then((res) => {
      console.log("database connectedn successful");
    })
    .catch((error) => console.log(error));
}
db.beforeConnect(async () => {
  const connection = await mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: password,
    connectionLimit: 10,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
});

export default db;
