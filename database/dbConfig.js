const knex = require('knex');

const knexConfig = require('../knexfile.js');

const enviroment = process.env.DB_ENV || 'testing';

module.exports = knex(knexConfig[enviroment]);
