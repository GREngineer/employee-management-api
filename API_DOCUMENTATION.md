# Employee Management API Documentation

## Overview

The Employee Management API is a RESTful service that provides comprehensive functionality for managing employees and their skills within an organization. The API follows REST principles and returns JSON responses.

## Base URL
```
http://localhost:8080
```

## Authentication
Currently, the API does not require authentication.

## Rate Limiting

Currently, the API does not implement rate limiting due to time restriction for assignment delivery, however I would like to add this in the future.


## Future implementations

For production deployment, I would also add the following:
- Authentication and authorization
- Rate limiting
- Input sanitization
- HTTPS
- API key management
- Request logging and monitoring 
- Relational SQL database
- A many-to-many relations table `employee_skills` to record all separate instances of employees and skills. When reviewing the project, I have realised that employees and skills exist as two separate entities in the api (they must, for data integrity and scalability). As such, an `employee_skills` table would create the relationship needed

## Response Format
All responses are returned in JSON format with appropriate HTTP status codes.

## Error Handling

The API uses standard HTTP status codes:

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Validation error or invalid input |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

### Error Response Format
```json
{
  "error": "Validation Error",
  "message": "Name and surname are required fields"
}
```

---

## Employee Endpoints

### 1. Get All Employees

Retrieves a list of all employees in the system.

**Endpoint:** `GET /employees`

**Response:** `200 OK`
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Dimitris",
    "surname": "Papadopoulos",
    "skills": ["Financial Analysis", "Budget Planning"]
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Maria",
    "surname": "Konstantinou",
    "skills": ["Talent Acquisition", "Performance Management"]
  }
]
```

### 2. Create Employee

Creates a new employee with the provided information.

**Endpoint:** `POST /employees`

**Request Body:**
```json
{
  "name": "Eleni",
  "surname": "Georgiou",
  "skills": ["Market Research", "Brand Strategy"]
}
```

**Response:** `201 Created`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "name": "Eleni",
  "surname": "Georgiou",
  "skills": ["Market Research", "Brand Strategy"]
}
```

**Validation Rules:**
- `name`: Required, must be a non-empty string
- `surname`: Required, must be a non-empty string
- `skills`: Optional, must be an array if provided

### 3. Get Employee by ID

Retrieves a specific employee by their ID.

**Endpoint:** `GET /employees/:id`

**Parameters:**
- `id` (string, required): The unique identifier of the employee

**Response:** `200 OK`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Dimitris",
  "surname": "Papadopoulos",
  "skills": ["Financial Analysis", "Budget Planning"]
}
```

**Error Response:** `404 Not Found`
```json
{
  "message": "Employee not found"
}
```

### 4. Update Employee

Updates an existing employee's information.

**Endpoint:** `PUT /employees/:id`

**Parameters:**
- `id` (string, required): The unique identifier of the employee

**Request Body:**
```json
{
  "name": "Updated Dimitris",
  "skills": ["Financial Analysis", "Budget Planning", "Risk Management"]
}
```

**Response:** `200 OK`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Updated Dimitris",
  "surname": "Papadopoulos",
  "skills": ["Financial Analysis", "Budget Planning", "Risk Management"]
}
```

**Error Response:** `404 Not Found`
```json
{
  "message": "Employee not found"
}
```

### 5. Delete Employee

Deletes an employee from the system.

**Endpoint:** `DELETE /employees/:id`

**Parameters:**
- `id` (string, required): The unique identifier of the employee

**Response:** `200 OK`
```json
{
  "message": "Employee deleted successfully"
}
```

**Error Response:** `404 Not Found`
```json
{
  "message": "Employee not found"
}
```

### 6. Search Employees

#### 6.1 Search by Name (Partial Match)

Searches for employees whose name contains the specified string (case-insensitive).

**Endpoint:** `GET /employees/search/name/:name`

**Parameters:**
- `name` (string, required): The name to search for

**Example:** `GET /employees/search/name/dim`

**Response:** `200 OK`
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Dimitris",
    "surname": "Papadopoulos",
    "skills": ["Financial Analysis", "Budget Planning"]
  }
]
```

#### 6.2 Search by Surname (Partial Match)

Searches for employees whose surname contains the specified string (case-insensitive).

**Endpoint:** `GET /employees/search/surname/:surname`

**Parameters:**
- `surname` (string, required): The surname to search for

**Example:** `GET /employees/search/surname/pap`

**Response:** `200 OK`
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Dimitris",
    "surname": "Papadopoulos",
    "skills": ["Financial Analysis", "Budget Planning"]
  }
]
```

#### 6.3 Search by Skill (Partial Match)

Searches for employees who have skills containing the specified string (case-insensitive).

**Endpoint:** `GET /employees/search/skill/:skill`

**Parameters:**
- `skill` (string, required): The skill to search for

**Example:** `GET /employees/search/skill/financial`

**Response:** `200 OK`
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Dimitris",
    "surname": "Papadopoulos",
    "skills": ["Financial Analysis", "Budget Planning"]
  }
]
```

---

## Skill Endpoints

### 1. Get All Skills

Retrieves a list of all skills in the system.

**Endpoint:** `GET /skills`

**Response:** `200 OK`
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "name": "Strategic Planning",
    "description": "Long-term business strategy development",
    "category": "Executive"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440004",
    "name": "Supply Chain Management",
    "description": "End-to-end logistics and procurement",
    "category": "Operations"
  }
]
```

### 2. Create Skill

Creates a new skill with the provided information.

**Endpoint:** `POST /skills`

**Request Body:**
```json
{
  "name": "Digital Marketing",
  "description": "Online advertising and social media campaigns",
  "category": "Marketing"
}
```

**Response:** `201 Created`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440005",
  "name": "Digital Marketing",
  "description": "Online advertising and social media campaigns",
  "category": "Marketing"
}
```

**Validation Rules:**
- `name`: Required, must be a non-empty string
- `description`: Required, must be a non-empty string
- `category`: Required, must be a non-empty string

### 3. Get Skill by ID

Retrieves a specific skill by its ID.

**Endpoint:** `GET /skills/:id`

**Parameters:**
- `id` (string, required): The unique identifier of the skill

**Response:** `200 OK`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "name": "Strategic Planning",
  "description": "Long-term business strategy development",
  "category": "Executive"
}
```

**Error Response:** `404 Not Found`
```json
{
  "message": "Skill not found"
}
```

### 4. Update Skill

Updates an existing skill's information.

**Endpoint:** `PUT /skills/:id`

**Parameters:**
- `id` (string, required): The unique identifier of the skill

**Request Body:**
```json
{
  "name": "Updated Strategic Planning",
  "description": "Enhanced long-term business strategy development",
  "category": "Executive"
}
```

**Response:** `200 OK`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "name": "Updated Strategic Planning",
  "description": "Enhanced long-term business strategy development",
  "category": "Executive"
}
```

**Error Response:** `404 Not Found`
```json
{
  "message": "Skill not found"
}
```

### 5. Delete Skill

Deletes a skill from the system.

**Endpoint:** `DELETE /skills/:id`

**Parameters:**
- `id` (string, required): The unique identifier of the skill

**Response:** `200 OK`
```json
{
  "message": "Skill deleted successfully"
}
```

**Error Response:** `404 Not Found`
```json
{
  "message": "Skill not found"
}
```

---

