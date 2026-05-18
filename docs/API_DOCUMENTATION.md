# API Documentation

Complete REST API documentation for Employee Performance Analytics System.

## Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://employee-analytics-api.render.com/api`

## Authentication

All protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens are obtained from login/register endpoints and expire in 7 days.

## Response Format

All responses follow a standard format:

### Success Response
```json
{
  "success": true,
  "message": "Operation description",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## Status Codes

- **200**: OK - Request successful
- **201**: Created - Resource created successfully
- **400**: Bad Request - Invalid input
- **401**: Unauthorized - Missing/invalid token
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource not found
- **500**: Server Error - Internal server error

## Endpoints

### Authentication Endpoints

#### 1. Register User

**Endpoint**: `POST /auth/register`

**Access**: Public

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "hr"
}
```

**Fields**:
- `name` (String, required): User's full name
- `email` (String, required): Unique email address
- `password` (String, required): Minimum 6 characters
- `role` (String, optional): "admin", "hr", or "user" (default: "user")

**Success Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "hr"
  }
}
```

**Error Response** (400):
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

#### 2. Login User

**Endpoint**: `POST /auth/login`

**Access**: Public

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "hr"
  }
}
```

**Error Response** (401):
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

#### 3. Get Current User

**Endpoint**: `GET /auth/me`

**Access**: Private (requires token)

**Request Headers**:
```
Authorization: Bearer <token>
```

**Success Response** (200):
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "hr",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Employee Endpoints

#### 4. Add Employee

**Endpoint**: `POST /employees`

**Access**: Private (HR, Admin only)

**Request Body**:
```json
{
  "name": "Aman Verma",
  "email": "aman@gmail.com",
  "department": "Development",
  "skills": ["React", "Node.js", "MongoDB"],
  "performanceScore": 85,
  "experience": 3
}
```

**Fields**:
- `name` (String, required): Employee name
- `email` (String, required): Unique email
- `department` (String, required): One of [Development, HR, Sales, Marketing, Finance, Operations]
- `skills` (Array, required): Minimum 1 skill required
- `performanceScore` (Number, required): 0-100
- `experience` (Number, required): Years of experience (≥0)

**Success Response** (201):
```json
{
  "success": true,
  "message": "Employee added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Aman Verma",
    "email": "aman@gmail.com",
    "department": "Development",
    "skills": ["React", "Node.js", "MongoDB"],
    "performanceScore": 85,
    "experience": 3,
    "createdBy": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response** (400):
```json
{
  "success": false,
  "message": "Employee with this email already exists"
}
```

---

#### 5. Get All Employees

**Endpoint**: `GET /employees`

**Access**: Private

**Query Parameters**: None

**Success Response** (200):
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Aman Verma",
      "email": "aman@gmail.com",
      "department": "Development",
      "skills": ["React", "Node.js", "MongoDB"],
      "performanceScore": 85,
      "experience": 3,
      "createdBy": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ]
}
```

---

#### 6. Search Employees

**Endpoint**: `GET /employees/search`

**Access**: Private

**Query Parameters**:
- `department` (String, optional): Department name
- `skill` (String, optional): Skill to search
- `name` (String, optional): Employee name (case-insensitive)

**Examples**:
```
GET /employees/search?department=Development
GET /employees/search?skill=React
GET /employees/search?name=Aman
GET /employees/search?department=Development&skill=React
```

**Success Response** (200):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Aman Verma",
      "email": "aman@gmail.com",
      "department": "Development",
      "skills": ["React", "Node.js", "MongoDB"],
      "performanceScore": 85,
      "experience": 3
    }
  ]
}
```

---

#### 7. Get Single Employee

**Endpoint**: `GET /employees/:id`

**Access**: Private

**URL Parameters**:
- `id` (String, required): Employee ID

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Aman Verma",
    "email": "aman@gmail.com",
    "department": "Development",
    "skills": ["React", "Node.js", "MongoDB"],
    "performanceScore": 85,
    "experience": 3,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response** (404):
```json
{
  "success": false,
  "message": "Employee not found"
}
```

---

#### 8. Update Employee

**Endpoint**: `PUT /employees/:id`

**Access**: Private (HR, Admin only)

**Request Body** (any field to update):
```json
{
  "performanceScore": 90,
  "skills": ["React", "Node.js", "MongoDB", "Docker"]
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Aman Verma",
    "email": "aman@gmail.com",
    "department": "Development",
    "skills": ["React", "Node.js", "MongoDB", "Docker"],
    "performanceScore": 90,
    "experience": 3,
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

---

#### 9. Delete Employee

**Endpoint**: `DELETE /employees/:id`

**Access**: Private (Admin only)

**Success Response** (200):
```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

---

#### 10. Get Employee Statistics

**Endpoint**: `GET /employees/stats/summary`

**Access**: Private

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "totalEmployees": 5,
    "averagePerformance": 82.5,
    "departmentStats": [
      {
        "_id": "Development",
        "count": 3,
        "avgScore": 85
      },
      {
        "_id": "HR",
        "count": 2,
        "avgScore": 80
      }
    ]
  }
}
```

---

### AI Endpoints

**Note**: These endpoints use **openrouter/free**, which automatically selects the best available free model on OpenRouter with no credits required.

#### 11. Get Single Recommendation

**Endpoint**: `POST /ai/recommend`

**Access**: Private (HR, Admin only)

**Request Body**:
```json
{
  "employeeId": "507f1f77bcf86cd799439012"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "employeeId": "507f1f77bcf86cd799439012",
    "employeeName": "Aman Verma",
    "aiRecommendation": "Based on Aman's excellent performance score of 85/100 and strong technical skills in React, Node.js, and MongoDB, he is an excellent candidate for promotion to Senior Developer. Recommendations: 1) Leadership and Management Training, 2) Advanced System Design course, 3) Mentoring junior developers. Expected career progression timeline: 6-12 months to Senior Developer, 2-3 years to Tech Lead."
  }
}
```

**Error Response** (404):
```json
{
  "success": false,
  "message": "Employee not found"
}
```

**Error Response** (500):
```json
{
  "success": false,
  "message": "Failed to get AI recommendation",
  "error": "OpenRouter API key is invalid"
}
```

---

#### 12. Get Batch Recommendations

**Endpoint**: `POST /ai/recommend-batch`

**Access**: Private (HR, Admin only)

**Request Body**:
```json
{
  "employeeIds": [
    "507f1f77bcf86cd799439012",
    "507f1f77bcf86cd799439013",
    "507f1f77bcf86cd799439014"
  ]
}
```

**Success Response** (200):
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "employeeId": "507f1f77bcf86cd799439012",
      "employeeName": "Aman Verma",
      "ranking": 1,
      "performanceScore": 95,
      "recommendation": "Top performer. Ready for promotion to Senior Developer."
    },
    {
      "employeeId": "507f1f77bcf86cd799439013",
      "employeeName": "Priya Singh",
      "ranking": 2,
      "performanceScore": 85,
      "recommendation": "Strong performer. Recommend advanced training in leadership."
    },
    {
      "employeeId": "507f1f77bcf86cd799439014",
      "employeeName": "Raj Kumar",
      "ranking": 3,
      "performanceScore": 75,
      "recommendation": "Solid performer. Focus on skill development in new technologies."
    }
  ]
}
```

---

### Health Check

#### 13. Health Check

**Endpoint**: `GET /health`

**Access**: Public

**Purpose**: Check if API is running

**Success Response** (200):
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Postman/ThunderClient Collection

### 1. Authentication

```
POST /auth/register
POST /auth/login
GET /auth/me
```

### 2. Employees

```
POST /employees
GET /employees
GET /employees/search?department=Development
GET /employees/:id
PUT /employees/:id
DELETE /employees/:id
GET /employees/stats/summary
```

### 3. AI

```
POST /ai/recommend
POST /ai/recommend-batch
```

## Rate Limiting

Currently no rate limiting implemented. Consider adding for production:
- 100 requests per minute per IP
- 10 requests per minute for AI endpoints

## CORS

Enabled for:
- `http://localhost:3000` (development)
- Your deployed frontend URL (production)

## Pagination (Future)

Recommended for large datasets:
```
GET /employees?page=1&limit=10
```

## Sorting (Future)

Recommended:
```
GET /employees?sort=-performanceScore
GET /employees?sort=name
```

## Error Handling

Common error patterns:

**Validation Error**:
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": ["Performance score must be 0-100"]
}
```

**Authorization Error**:
```json
{
  "success": false,
  "message": "Not authorized to access this resource"
}
```

**Server Error**:
```json
{
  "success": false,
  "message": "Something went wrong",
  "error": "Detailed error message"
}
```

## Notes

- All timestamps are in ISO 8601 format
- Emails are case-insensitive and unique
- Passwords are hashed with bcryptjs
- Tokens expire in 7 days
- Employee performance scores are 0-100
- At least one skill required for employees
