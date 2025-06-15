const request = require('supertest');
const express = require('express');

// Import app
const app = require('../../server');

describe('GET /skills', () => {
    describe('Test status, content and structure of skills endpoint', () => {
        it('Request all skills, return success status and correct format', async () => {
            const response = await request(app)
                .get('/skills')
                .expect(200);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('Check skills have correct data structure', async () => {
            const response = await request(app)
                .get('/skills')
                .expect(200);

            if (response.body.length > 0) {
                const skill = response.body[0];
                expect(skill).toHaveProperty('id');
                expect(skill).toHaveProperty('name');
                expect(skill).toHaveProperty('description');
                expect(skill).toHaveProperty('category');
            }
        });

        it('Edge case to validate empty skills result is handled', async () => {
            const response = await request(app)
                .get('/skills')
                .expect(200);

            expect(response.body.length).toBeGreaterThanOrEqual(0);
        });
    });
});

describe('POST /skills | New skill test cases', () => {
    it('Create new skill with valid data', async () => {
        const newSkill = {
            name: "AI",
            description: "Creation and maintenance for Large Language Models",
            category: "Data Science"
        };

        const response = await request(app)
            .post('/skills')
            .send(newSkill)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newSkill.name);
        expect(response.body.description).toBe(newSkill.description);
        expect(response.body.category).toBe(newSkill.category);
    });

    it('Should return error if required fields are missing', async () => {
        const invalidSkill = {
            description: "Missing name and category"
        };

        const response = await request(app)
            .post('/skills')
            .send(invalidSkill)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
    });

    it('Return error if name is empty string', async () => {
        const invalidSkill = {
            name: "",
            description: "Valid description",
            category: "Programming"
        };

        const response = await request(app)
            .post('/skills')
            .send(invalidSkill)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
    });

    it('Should return error if name is not a string', async () => {
        const invalidSkill = {
            name: 123,
            description: "Valid description",
            category: "Programming"
        };

        const response = await request(app)
            .post('/skills')
            .send(invalidSkill)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('must be strings');
    });

    it('Should return error if description is not a string', async () => {
        const invalidSkill = {
            name: "Valid Name",
            description: 456,
            category: "Programming"
        };

        const response = await request(app)
            .post('/skills')
            .send(invalidSkill)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('must be strings');
    });

    it('Should return error if category is not a string', async () => {
        const invalidSkill = {
            name: "Valid Name",
            description: "Valid description",
            category: 789
        };

        const response = await request(app)
            .post('/skills')
            .send(invalidSkill)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('must be strings');
    });

    it('Should return error if description is empty string', async () => {
        const invalidSkill = {
            name: "Valid Name",
            description: "",
            category: "Programming"
        };

        const response = await request(app)
            .post('/skills')
            .send(invalidSkill)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('cannot be empty');
    });

    it('Return error if category is empty string', async () => {
        const invalidSkill = {
            name: "Valid Name",
            description: "Valid description",
            category: ""
        };

        const response = await request(app)
            .post('/skills')
            .send(invalidSkill)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('cannot be empty');
    });
});

describe('PUT /skills/:id | Update skills test scenarios', () => {
    let testSkillId;

    beforeEach(async () => {
        // Create a test skill for update tests
        const newSkill = {
            name: "Test Skill",
            description: "Test Description",
            category: "Test Category"
        };

        const response = await request(app)
            .post('/skills')
            .send(newSkill);

        testSkillId = response.body.id;
    });

    it('Update skill with valid data', async () => {
        const updatedData = {
            name: "Updated Skill",
            description: "Updated Description",
            category: "Updated Category"
        };

        const response = await request(app)
            .put(`/skills/${testSkillId}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.name).toBe(updatedData.name);
        expect(response.body.description).toBe(updatedData.description);
        expect(response.body.category).toBe(updatedData.category);
        expect(response.body.id).toBe(testSkillId);
    });

    it('Return 404 for non-existent skill', async () => {
        const nonExistentId = "550e8400-e29b-41d4-a716-446655440000";
        const updatedData = {
            name: "Updated Skill",
            description: "Updated Description",
            category: "New category"
        };

        const response = await request(app)
            .put(`/skills/${nonExistentId}`)
            .send(updatedData)
            .expect(404);

        expect(response.body).toHaveProperty('message');
    });
});

describe('DELETE /skills/:id', () => {
    let testSkillId;

    beforeEach(async () => {
        // Create a test skill for delete tests
        const newSkill = {
            name: "Test Skill",
            description: "Test Description",
            category: "Test Category"
        };

        const response = await request(app)
            .post('/skills')
            .send(newSkill);

        testSkillId = response.body.id;
    });

    it('Delete existing skill', async () => {
        const response = await request(app)
            .delete(`/skills/${testSkillId}`)
            .expect(200);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('deleted successfully');
    });

    it('Return 404 for non-existent skill', async () => {
        const nonExistentId = "non-existent-id";

        const response = await request(app)
            .delete(`/skills/${nonExistentId}`)
            .expect(404);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('not found');
    });
}); 