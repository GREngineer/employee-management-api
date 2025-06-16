const { 
    getAllEmployees, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee,
    searchEmployeesByName,
    searchEmployeesBySurname,
    searchEmployeesBySkill
} = require('../../controllers/employeeController');

// Mock the employee model
const mockEmployees = require('../../models/employeeModel');

// Mock UUID to return predictable IDs
jest.mock('uuid', () => ({
    v4: jest.fn(() => 'test-uuid-123')
}));

describe('Employee Controller Unit Tests', () => {
    let mockRequest;
    let mockResponse;
    let mockJson;
    let mockStatus;

    beforeEach(() => {
        // Reset mock employees array
        mockEmployees.length = 0;
        mockEmployees.push(
            { id: '1', name: 'Dimitris', surname: 'Papadopoulos', skills: ['Financial Analysis', 'Budget Planning'] },
            { id: '2', name: 'Maria', surname: 'Konstantinou', skills: ['Talent Acquisition', 'Performance Management'] }
        );

        // Setup mock response
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        mockResponse = {
            json: mockJson,
            status: mockStatus
        };
    });

    describe('getAllEmployees', () => {
        it('Return all employees', () => {
            mockRequest = {};

            getAllEmployees(mockRequest, mockResponse);

            expect(mockJson).toHaveBeenCalledWith(mockEmployees);
        });
    });

    describe('createEmployee', () => {
        it('Create a new employee with generated ID', () => {
            const newEmployeeData = {
                name: 'Eleni',
                surname: 'Georgiou',
                skills: ['Market Research', 'Brand Strategy']
            };
            mockRequest = { body: newEmployeeData };

            createEmployee(mockRequest, mockResponse);

            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith({
                ...newEmployeeData,
                id: 'test-uuid-123'
            });
            expect(mockEmployees).toHaveLength(3);
        });
    });

    describe('updateEmployee', () => {
        it('Update an existing employee', () => {
            const updateData = { name: 'Updated Dimitris' };
            mockRequest = {
                params: { id: '1' },
                body: updateData
            };

            updateEmployee(mockRequest, mockResponse);

            expect(mockJson).toHaveBeenCalledWith({
                id: '1',
                name: 'Updated Dimitris',
                surname: 'Papadopoulos',
                skills: ['Financial Analysis', 'Budget Planning']
            });
        });

        it('Return 404 for non-existent employee', () => {
            mockRequest = {
                params: { id: 'non-existent' },
                body: { name: 'Test' }
            };

            updateEmployee(mockRequest, mockResponse);

            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Employee not found'
            });
        });
    });

    describe('deleteEmployee', () => {
        it('Delete an existing employee', () => {
            const initialLength = mockEmployees.length;
            mockRequest = { params: { id: '1' } };

            deleteEmployee(mockRequest, mockResponse);

            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Employee deleted successfully'
            });
            expect(mockEmployees).toHaveLength(initialLength - 1);
        });

        it('Return 404 for non-existent employee', () => {
            mockRequest = { params: { id: 'non-existent' } };

            deleteEmployee(mockRequest, mockResponse);

            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Employee not found'
            });
        });
    });

    describe('searchEmployeesByName', () => {
        it('Find employees by name (partial match)', () => {
            mockRequest = { params: { name: 'dim' } };

            searchEmployeesByName(mockRequest, mockResponse);

            expect(mockJson).toHaveBeenCalledWith([
                { id: '1', name: 'Dimitris', surname: 'Papadopoulos', skills: ['Financial Analysis', 'Budget Planning'] }
            ]);
        });

        it('Return empty array for no matches', () => {
            mockRequest = { params: { name: 'xyz' } };

            searchEmployeesByName(mockRequest, mockResponse);

            expect(mockJson).toHaveBeenCalledWith([]);
        });
    });

    describe('searchEmployeesBySurname', () => {
        it('Find employees by surname (partial match)', () => {
            mockRequest = { params: { surname: 'pap' } };

            searchEmployeesBySurname(mockRequest, mockResponse);

            expect(mockJson).toHaveBeenCalledWith([
                { id: '1', name: 'Dimitris', surname: 'Papadopoulos', skills: ['Financial Analysis', 'Budget Planning'] }
            ]);
        });

        it('Return empty array for no matches', () => {
            mockRequest = { params: { surname: 'xyz' } };

            searchEmployeesBySurname(mockRequest, mockResponse);

            expect(mockJson).toHaveBeenCalledWith([]);
        });
    });

    describe('searchEmployeesBySkill', () => {
        it('Find employees by skill (partial match)', () => {
            mockRequest = { params: { skill: 'financial' } };

            searchEmployeesBySkill(mockRequest, mockResponse);

            expect(mockJson).toHaveBeenCalledWith([
                { id: '1', name: 'Dimitris', surname: 'Papadopoulos', skills: ['Financial Analysis', 'Budget Planning'] }
            ]);
        });

        it('Return empty array for no matches', () => {
            mockRequest = { params: { skill: 'xyz' } };

            searchEmployeesBySkill(mockRequest, mockResponse);

            expect(mockJson).toHaveBeenCalledWith([]);
        });

        it('Handle employees without skills array', () => {
            // Add employee without skills
            mockEmployees.push({ id: '3', name: 'Nikos', surname: 'Andreou' });
            mockRequest = { params: { skill: 'financial' } };

            searchEmployeesBySkill(mockRequest, mockResponse);

            expect(mockJson).toHaveBeenCalledWith([
                { id: '1', name: 'Dimitris', surname: 'Papadopoulos', skills: ['Financial Analysis', 'Budget Planning'] }
            ]);
        });
    });
}); 