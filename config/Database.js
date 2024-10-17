import { Sequelize } from "sequelize";

const db = new Sequelize('bank_buku', 'root', 'imroot', {
    host: "localhost",
    dialect: "mysql"
});

export default db;