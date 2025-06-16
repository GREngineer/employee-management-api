const { 
    getAllSkills, 
    createSkill, 
    updateSkill, 
    deleteSkill 
} = require('../../controllers/skillController');

// Mock the skill model
const mockSkills = require('../../models/skillModel');

// Mock UUID to return predictable IDs
jest.mock('uuid', () => ({
    v4: jest.fn(() => 'test-uuid-456')
}));

describe('Skill Controller Unit Tests', () => {
    let mockRequest;
    let mockResponse;
    let mockJson;
    let mockStatus;

    beforeEach(() => {
        // Reset mock skills array
        mockSkills.length = 0;
        mockSkills.push(
            { id: '1', name: 'Strategic Planning', description: 'Long-term business strategy development', category: 'Executive' },
            { id: '2', name: 'Supply Chain Management', description: 'End-to-end logistics and procurement', category: 'Operations' }
        );

        // Setup mock response
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        mockResponse = {
            json: mockJson,
            status: mockStatus
        };
    });

    describe('getAllSkills', () => {
        it('Return all skills', () => {
            mockRequest = {};

            getAllSkills(mockRequest, mockResponse);

            expect(mockJson).toHaveBeenCalledWith(mockSkills);
        });
    });

    describe('createSkill', () => {
        it('Create a new skill with generated ID', () => {
            const newSkillData = {
                name: 'Digital Marketing',
                description: 'Online advertising and social media campaigns',
                category: 'Marketing'
            };
            mockRequest = { body: newSkillData };

            createSkill(mockRequest, mockResponse);

            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith({
                ...newSkillData,
                id: 'test-uuid-456'
            });
            expect(mockSkills).toHaveLength(3);
        });
    });

    describe('updateSkill', () => {
        it('Update an existing skill', () => {
            const updateData = { name: 'Updated Strategic Planning' };
            mockRequest = {
                params: { id: '1' },
                body: updateData
            };

            updateSkill(mockRequest, mockResponse);

            expect(mockJson).toHaveBeenCalledWith({
                id: '1',
                name: 'Updated Strategic Planning',
                description: 'Long-term business strategy development',
                category: 'Executive'
            });
        });

        it('Return 404 for non-existent skill', () => {
            mockRequest = {
                params: { id: 'non-existent' },
                body: { name: 'Test' }
            };

            updateSkill(mockRequest, mockResponse);

            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Skill not found'
            });
        });
    });

    describe('deleteSkill', () => {
        it('Delete an existing skill', () => {
            const initialLength = mockSkills.length;
            mockRequest = { params: { id: '1' } };

            deleteSkill(mockRequest, mockResponse);

            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Skill deleted successfully'
            });
            expect(mockSkills).toHaveLength(initialLength - 1);
        });

        it('Return 404 for non-existent skill', () => {
            mockRequest = { params: { id: 'non-existent' } };

            deleteSkill(mockRequest, mockResponse);

            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Skill not found'
            });
        });
    });
}); 