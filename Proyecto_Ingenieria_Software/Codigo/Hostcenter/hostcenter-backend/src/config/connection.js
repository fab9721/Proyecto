const knex = require('knex');

const conn = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'hostcenter',
        multipleStatements: true,
        connectTimeout: 999999 // Cambiar el atributo dependiendo de la base de datos
    }
});

module.exports = conn