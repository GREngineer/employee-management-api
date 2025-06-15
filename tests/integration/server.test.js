const request = require('supertest');
const app = require('../../server');

describe('Server startup logic test', () => {
    describe('GET /', () => {
        it('Server landing page should return welcome message', async () => {
            const response = await request(app)
            .get('/')
            .expect(200);

            expect(response.text).toBe('Employee Management System - Your one stop solution for your employees')
        });
    });
});