const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    database: 'certificate',
    username: 'root',
    password: '123456',
    dialect: 'mysql'
});

class Transaction extends Sequelize.Model {}
Transaction.init({
    id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    studentID: { type: Sequelize.INTEGER, allowNull: false },
    txhash: { type: Sequelize.STRING(150) }
}, {
    sequelize,
    modelName: 'transactions'
})

module.exports = {
    sequelize,
    Sequelize,
    Transaction
}