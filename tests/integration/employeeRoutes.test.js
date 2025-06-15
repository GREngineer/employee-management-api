const request = require('supertest');
const express = require('express');

// Import app (will need to modify main server file to export the app)
const app = require('../../server');

describe('GET /employees', () => {
    describe('Test status, content and structure of employees endpoint', () => {
        it('Request all employees, return success status and correct format', async () => {
            const response = await request(app)
                .get('/employees')
                .expect(200);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('Check employees have correct data structure', async () => {
            const response = await request(app)
                .get('/employees')
                .expect(200);

            if (response.body.length > 0) {
                const employee = response.body[0];
                expect(employee).toHaveProperty('id');
                expect(employee).toHaveProperty('name');
                expect(employee).toHaveProperty('surname');
                expect(employee).toHaveProperty('skills');
                expect(Array.isArray(employee.skills)).toBe(true);
            }
        });

        it('Edge case to validate empty employee result is handled', async () => {
            const response = await request(app)
                .get('/employees')
                .expect(200);

            expect(response.body.length).toBeGreaterThanOrEqual(0);
        });
    });
});

describe('POST /employees | New employees test cases', () => {
    it('Create new employee with valid data', async () => {
        const newEmployee = {
            name: "Marios",
            surname: "Spanos",
            skills: ["Workshop", "Public speaking"]
        };

        const response = await request(app)
            .post('/employees')
            .send(newEmployee)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newEmployee.name);
        expect(response.body.surname).toBe(newEmployee.surname);
        expect(Array.isArray(response.body.skills)).toBe(true);
    });

    it('Should return error if required fields are missing', async () => {
        const invalidEmployee = {
            surname: "Papakostas"
        };

        const response = await request(app)
            .post('/employees')
            .send(invalidEmployee)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
    });

    it('Return error if skills is not an array', async () => {
        const invalidEmployee = {
            name: "Giorgos",
            surname: "Markatos",
            skills: "Not an array"
        };

        const response = await request(app)
            .post('/employees')
            .send(invalidEmployee)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
    });

    it('Should return error if name is not a string', async () => {
        const invalidEmployee = {
            name: 123,
            surname: "Papakostas"
        };

        const response = await request(app)
            .post('/employees')
            .send(invalidEmployee)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('must be strings');
    });

    it('Should return error if surname is not a string', async () => {
        const invalidEmployee = {
            name: "Vasileios",
            surname: 456
        };

        const response = await request(app)
            .post('/employees')
            .send(invalidEmployee)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('must be strings');
    });

    it('Should return error if name is empty string', async () => {
        const invalidEmployee = {
            name: "",
            surname: "Papakostas"
        };

        const response = await request(app)
            .post('/employees')
            .send(invalidEmployee)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('cannot be empty');
    });

    it('Should return error if surname is empty string', async () => {
        const invalidEmployee = {
            name: "Vasileios",
            surname: ""
        };

        const response = await request(app)
            .post('/employees')
            .send(invalidEmployee)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('cannot be empty');
    });

    it('Should accept employee with valid skills array', async () => {
        const validEmployee = {
            name: "Test",
            surname: "User",
            skills: ["JavaScript", "Node.js"]
        };

        const response = await request(app)
            .post('/employees')
            .send(validEmployee)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.skills).toEqual(validEmployee.skills);
    });
});

describe('PUT /employees/:id | Update employees test cases', () => {
    let testEmployeeId;

    beforeEach(async () => {
        // Create a test employee for update tests
        const newEmployee = {
            name: "Eugenia",
            surname: "Kostopoulou",
            skills: ["Procurement"]
        };

        const response = await request(app)
            .post('/employees')
            .send(newEmployee);

        testEmployeeId = response.body.id;
    });

    it('Update employee with valid data', async () => {
        const updatedData = {
            name: "updatedEugenia",
            surname: "updatedKostopoulou",
            skills: ["Technology", "Finance"]
        };

        const response = await request(app)
            .put(`/employees/${testEmployeeId}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.name).toBe(updatedData.name);
        expect(response.body.skills).toEqual(updatedData.skills);
        expect(response.body.id).toBe(testEmployeeId);
    });

    it('Return 404 for non-existent employee', async () => {
        const nonExistentId = "non-existent-id";
        const updatedData = {
            name: "Non",
            surname: "Existing"
        };

        const response = await request(app)
            .put(`/employees/${nonExistentId}`)
            .send(updatedData)
            .expect(404);

        expect(response.body).toHaveProperty('message');
    });

    it('Return 400 for invalid update data', async () => {
        const invalidData = {
            name: "",
            surname: "Ilias"
        };

        const response = await request(app)
            .put(`/employees/${testEmployeeId}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
    });
});

describe('DELETE /employees/:id', () => {
    let testEmployeeId;

    beforeEach(async () => {
        // Create a test employee for delete tests
        const newEmployee = {
            name: "Charis",
            surname: "Chamilakis",
            skills: ["Marine engineering"]
        };

        const response = await request(app)
            .post('/employees')
            .send(newEmployee);

        testEmployeeId = response.body.id;
    });

    it('Delete existing employee', async () => {
        const response = await request(app)
            .delete(`/employees/${testEmployeeId}`)
            .expect(200);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('deleted successfully');
    });

    it('Return 404 for non-existent employee', async () => {
        const nonExistentId = "non-existent-id";

        const response = await request(app)
            .delete(`/employees/${nonExistentId}`)
            .expect(404);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('not found');
    });
});

describe('Search functionality test cases', () => {
    beforeEach(async () => {
        // Create test employees for search tests
        const testEmployees = [
            {
                name: "Stelios",
                surname: "Vlachakos",
                skills: ["Marketing", "HR", "Business Administration"]
            },
            {
                name: "Ioanna",
                surname: "Kokali",
                skills: ["Compensation", "Compliance", "Marketing"]
            },
            {
                name: "Petros",
                surname: "Petrochilos",
                skills: ["Recruitment", "R&D", "Production"]
            }
        ];

        for (const employee of testEmployees) {
            await request(app)
                .post('/employees')
                .send(employee);
        }
    });

    describe('GET /employees/search/name/:name', () => {
        it('Find employees by name (partial match)', async () => {
            const response = await request(app)
                .get('/employees/search/name/ste')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body.every(emp => 
                emp.name.toLowerCase().includes('ste')
            )).toBe(true);
        });

        it('When no name match return empty array', async () => {
            const response = await request(app)
                .get('/employees/search/name/xyz')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });
    });

    describe('GET /employees/search/surname/:surname', () => {
        it('Find employees by surname (partial match)', async () => {
            const response = await request(app)
                .get('/employees/search/surname/li')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body.every(emp => 
                emp.surname.toLowerCase().includes('li')
            )).toBe(true);
        });

        it('When no surname match return empty array', async () => {
            const response = await request(app)
                .get('/employees/search/surname/xyz')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });
    });

    describe('GET /employees/search/skill/:skill | Search employees by skill', () => {
        it('should find employees by skill (partial match)', async () => {
            const response = await request(app)
                .get('/employees/search/skill/marketing')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body.every(emp => 
                emp.skills && emp.skills.some(skill =>
                    skill.toLowerCase().includes('marketing')
                )
            )).toBe(true);
        });

        it('When no matching skill return empty array', async () => {
            const response = await request(app)
                .get('/employees/search/skill/xyz')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });

        it('Handle employees without skills array', async () => {
            // Create employee without skills
            const employeeWithoutSkills = {
                name: "Alice",
                surname: "Brown"
            };

            await request(app)
                .post('/employees')
                .send(employeeWithoutSkills);

            const response = await request(app)
                .get('/employees/search/skill/javascript')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });
    });
});