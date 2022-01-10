var sequelize = new Sequelize('example', 'root', '', {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
    // SQLite database path
    storage: './data/database.sqlite'
});