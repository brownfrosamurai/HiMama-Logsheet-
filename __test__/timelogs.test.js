const request = require('supertest')
const app = require('../app')

describe('Test GET /timelogs', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('/timelogs')
            .expect(200);
    })
})