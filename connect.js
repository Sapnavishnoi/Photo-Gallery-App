const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'navgurukul',
  database: 'Gallery_App'
});
module.exports = connection;


  var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'navgurukul',
      database : 'Gallery_App'
    }
  });
  module.exports = knex;

 knex.raw('CREATE DATABASE IF NOT EXISTS Gallery_App')
  .then((data) => {
    console.log('Databse created congo.....');
  })

  .catch((err) => {
    console.log("there is some error while creating the database",err);
  })

  knex.schema.hasTable('user').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('user', (table) => {
          table.increments('id').primary();
          table.string('first_name', 100).notNullable();
          table.string('last_name', 100).notNullable();
          table.string('email',55).unique().notNullable();
          table.string('password',100).notNullable();
          table.string('gender',50).notNullable();
        })
        .catch((err) => {
          console.log("There is some error while creating ")
        })
    }
    return console.log('table is created!')
  })
  
