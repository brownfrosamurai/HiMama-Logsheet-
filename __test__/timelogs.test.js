const request = require('supertest')
const app = require('../app');

describe('Test GET /timelogs', () => {
    test('It should respond with 302 found', async () => {
        const response = await request(app)
            .get('/timelogs')
            .expect(302);
    })
})

describe('Test POST /timelogs', () => {
    const timelogData = {
        user: "6205a1f713a4d4ffed243f52",
        clockout: Date.now(),
        description: "Lunch break"
    }
    const wrongTimeLogData = {
        user: "6205a1f713a4d4ffed243f52",
        clockout: Date.now(),
    }

    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .post('/timelogs')
            .send(timelogData)
            .expect(200)
            .redirects('/dashboard')
    })

    test('It should return an error page', async () => {
        const response = await request(app)
            .post('/timelogs')
            .send(wrongTimeLogData)
            .redirects('errors/500')
    })
})

describe('Test POST /timelogs/:id', () => {
    test('It should respond with 304', async () => {
        const response = await request(app)
        .post('/timelogs/:id')
        .expect(200)
        .redirects('/dashboard')
    })
})