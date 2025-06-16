const { validateEmployee, validateSkill } = require('../../middlewares/validation');

describe('Validation Middleware Unit Tests', () => {
    let mockRequest;
    let mockResponse;
    let mockNext;
    let mockJson;
    let mockStatus;

    beforeEach(() => {
        // Setup mock response
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        mockResponse = {
            json: mockJson,
            status: mockStatus
        };
        mockNext = jest.fn();
    });

    describe('validateEmployee', () => {
        describe('Required fields validation', () => {
            it('Success when valid employee data', () => {
                mockRequest = {
                    body: {
                        name: 'Kleopatra',
                        surname: 'Kiriakidi',
                        skills: ['Administration']
                    }
                };

                validateEmployee(mockRequest, mockResponse, mockNext);

                expect(mockNext).toHaveBeenCalled();
                expect(mockStatus).not.toHaveBeenCalled();
            });

            it('Return error when name is missing', () => {
                mockRequest = {
                    body: {
                        surname: 'Apostolopoulos'
                    }
                };

                validateEmployee(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name and surname are required fields'
                });
                expect(mockNext).not.toHaveBeenCalled();
            });

            it('Return error when surname is missing', () => {
                mockRequest = {
                    body: {
                        name: 'Sissy'
                    }
                };

                validateEmployee(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name and surname are required fields'
                });
                expect(mockNext).not.toHaveBeenCalled();
            });
        });

        describe('Data type validation', () => {
            it('Return error when name is not a string', () => {
                mockRequest = {
                    body: {
                        name: 123,
                        surname: 'Papadopoulos'
                    }
                };

                validateEmployee(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name and surname must be strings'
                });
            });

            it('Return error when surname is not a string', () => {
                mockRequest = {
                    body: {
                        name: 'Spyridon',
                        surname: 456
                    }
                };

                validateEmployee(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name and surname must be strings'
                });
            });
        });

        describe('Empty string validation', () => {
            it('Return error when name is empty string', () => {
                mockRequest = {
                    body: {
                        name: '',
                        surname: 'Nikolopoulos'
                    }
                };

                validateEmployee(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name and surname cannot be empty'
                });
            });

            it('Return error when surname is empty string', () => {
                mockRequest = {
                    body: {
                        name: 'Margarita',
                        surname: ''
                    }
                };

                validateEmployee(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name and surname cannot be empty'
                });
            });

            it('Return error when name is whitespace only', () => {
                mockRequest = {
                    body: {
                        name: '   ',
                        surname: 'Aslanidis'
                    }
                };

                validateEmployee(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name and surname cannot be empty'
                });
            });
        });

        describe('Skills array validation', () => {
            it('Success when skills is a valid array', () => {
                mockRequest = {
                    body: {
                        name: 'John',
                        surname: 'Doe',
                        skills: ['JavaScript', 'Node.js']
                    }
                };

                validateEmployee(mockRequest, mockResponse, mockNext);

                expect(mockNext).toHaveBeenCalled();
            });

            it('Success when skills is not provided', () => {
                mockRequest = {
                    body: {
                        name: 'John',
                        surname: 'Doe'
                    }
                };

                validateEmployee(mockRequest, mockResponse, mockNext);

                expect(mockNext).toHaveBeenCalled();
            });

            it('Return error when skills is not an array', () => {
                mockRequest = {
                    body: {
                        name: 'John',
                        surname: 'Doe',
                        skills: 'not an array'
                    }
                };

                validateEmployee(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Skills must be an array'
                });
            });
        });
    });

    describe('validateSkill', () => {
        describe('Required fields validation', () => {
            it('Success when valid skill data', () => {
                mockRequest = {
                    body: {
                        name: 'Automation',
                        description: 'Hardware control and maintenance',
                        category: 'Production'
                    }
                };

                validateSkill(mockRequest, mockResponse, mockNext);

                expect(mockNext).toHaveBeenCalled();
                expect(mockStatus).not.toHaveBeenCalled();
            });

            it('Return error when name is missing', () => {
                mockRequest = {
                    body: {
                        description: 'Organisational affairs management',
                        category: 'Management'
                    }
                };

                validateSkill(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name, description and category are required fields'
                });
            });

            it('Return error when description is missing', () => {
                mockRequest = {
                    body: {
                        name: 'Marketing',
                        category: 'Advertising'
                    }
                };

                validateSkill(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name, description and category are required fields'
                });
            });

            it('Return error when category is missing', () => {
                mockRequest = {
                    body: {
                        name: 'Sales',
                        description: 'Acquire customer base'
                    }
                };

                validateSkill(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name, description and category are required fields'
                });
            });
        });

        describe('Data type validation', () => {
            it('Return error when name is not a string', () => {
                mockRequest = {
                    body: {
                        name: 123,
                        description: 'Employee mediation',
                        category: 'HR'
                    }
                };

                validateSkill(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name, description and category must be strings'
                });
            });

            it('Return error when description is not a string', () => {
                mockRequest = {
                    body: {
                        name: 'Recruitment',
                        description: 456,
                        category: 'HR'
                    }
                };

                validateSkill(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name, description and category must be strings'
                });
            });

            it('Return error when category is not a string', () => {
                mockRequest = {
                    body: {
                        name: 'Budget Planning',
                        description: 'Financial forecasting and analysis',
                        category: 789
                    }
                };

                validateSkill(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name, description and category must be strings'
                });
            });
        });

        describe('Empty string validation', () => {
            it('Return error when name is empty string', () => {
                mockRequest = {
                    body: {
                        name: '',
                        description: 'Customer relationship management',
                        category: 'Sales'
                    }
                };

                validateSkill(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name, description and category cannot be empty'
                });
            });

            it('Return error when description is empty string', () => {
                mockRequest = {
                    body: {
                        name: 'Quality Control',
                        description: '',
                        category: 'Production'
                    }
                };

                validateSkill(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name, description and category cannot be empty'
                });
            });

            it('Return error when category is empty string', () => {
                mockRequest = {
                    body: {
                        name: 'Inventory Management',
                        description: 'Stock control and logistics',
                        category: ''
                    }
                };

                validateSkill(mockRequest, mockResponse, mockNext);

                expect(mockStatus).toHaveBeenCalledWith(400);
                expect(mockJson).toHaveBeenCalledWith({
                    error: 'Validation Error',
                    message: 'Name, description and category cannot be empty'
                });
            });
        });
    });
}); 