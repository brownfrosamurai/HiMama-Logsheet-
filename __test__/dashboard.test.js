const { redirect } = require('express/lib/response');
const request = require('supertest')
const app = require('../app');

describe('Test GET /dashboard', () => {
    test('It should respond with 302 found', async () => {
        const response = await request(app)
            .get('/dashboard')
            .expect(302);
    })
})

