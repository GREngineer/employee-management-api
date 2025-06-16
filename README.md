# Employee Management API

A robust REST API built with Express.js for managing employees and their skills in a large organization. This API provides comprehensive CRUD operations, search functionality, and validation for employee and skill management.

## Features

- **Employee Management**: Full CRUD operations for employees
- **Skill Management**: Full CRUD operations for skills
- **Search Functionality**: Search employees by name, surname, or skills
- **Input Validation**: Comprehensive validation middleware
- **Comprehensive Testing**: 79 tests (39 integration + 40 unit tests)
- **High Test Coverage**: 98.5% code coverage
- **RESTful Design**: Follows REST API best practices

## Framework Decisions
- **Jest:** Chosen for comprehensive testing framework with built-in mocking and coverage
- **Supertest:** Chosen for HTTP API testing with seamless Jest integration
- **In-memory data:** Chosen for simplicity and fast test execution
- **No external database:** Keeps tests isolated and fast

### Test Coverage
- **Overall Coverage**: 98.5%
- **Statements**: 98.52%
- **Branches**: 96%
- **Functions**: 95.65%
- **Lines**: 98.48%

## Testing Strategy

### Unit Tests
- Test individual functions in isolation
- Mock dependencies for fast execution
- Cover edge cases and error conditions
- Test validation middleware separately

### Integration Tests
- Test complete API flow (HTTP requests → routes → middleware → controllers → models)
- Cover all endpoints with various scenarios
- Test validation and error handling

### Manual tests
- Complete API flow also tested using Postman

## Assumptions
- API runs on localhost:8080 during testing
- Test data is reset before each test
- No authentication required for this implementation
- Focus on functional testing over performance testing

## Project Structure

```
employee-management-api/
├── controllers/
│   ├── employeeController.js
│   └── skillController.js
├── coverage/
├── middlewares/
│   ├── errorHandler.js
│   └── validation.js
├── models/
│   ├── employeeModel.js
│   └── skillModel.js
├── node_modules/
├── routes/
│   ├── employeeRoutes.js
│   └── skillRoutes.js
├── tests/
│   ├── integration/
│   │   ├── employeeRoutes.test.js
│   │   ├── skillRoutes.test.js
│   │   └── server.test.js
│   └── unit/
│       ├── employeeController.test.js
│       ├── skillController.test.js
│       └── validation.test.js
├── .env
├── .gitignore
├── API_DOCUMENTATION.md
├── package-lock.json
├── package.json
├── README.md
├── server.js
└── SETUP.md
```

## Available Scripts

- `npm start` - Start the server
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
