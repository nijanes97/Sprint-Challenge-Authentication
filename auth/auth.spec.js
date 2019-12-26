const request = require('supertest');
const db = require('../database/dbConfig');

const auth = require('./auth-router');
const server = require('../api/server.js');

describe('auth model', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });
    it('db set to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    describe('GET /', () => {
        it('has something', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(404);
                });
        });
    })
    describe('POST /register', () => {
        it('should insert the user into db', async (done) => {
            return request(server)
                .post('api/auth/register')
                .send({ username: 'TestingTester', password: 'pass' })
                .then(res => {
                    expect(res.status).toBe(201);
                });
        });
    });
    describe('POST /register', () => {
        it('should not allow inserting a user', () => {
            return request(auth)
                .post('/register')
                .send({ username: 'FailTester' })
                .then(res => {
                    expect(res.status).toBe(500);
                });
        });
    });
    describe('POST /login', () => {
        it('should a json web token', () => {
            return request(auth)
                .post('/login')
                .send({ username: 'TestingTester', password: 'pass' })
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
    });
    describe('POST /login', () => {
        it('should return 500 server error', () => {
            return request(auth)
                .post('/login')
                .send({ username: 'FailTester' })
                .then(res => {
                    expect(res.status).toBe(500);
                })
        })
    })
});