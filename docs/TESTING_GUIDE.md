# Testing Guide - Employee Performance Analytics

Comprehensive testing guide for all features of the MERN application.

## Test Environment Setup

1. **Start MongoDB**
   - Local: Ensure MongoDB is running
   - Atlas: Use MongoDB Atlas connection string

2. **Configure Backend**
   - Copy `.env.example` to `.env`
   - Set MONGODB_URI
   - Set OPENROUTER_API_KEY
   - Start backend: `npm run dev` (port 5000)

3. **Start Frontend**
   - Start frontend dev server: `npm run dev` (port 3000)
   - Open browser: `http://localhost:3000`

## Test Cases

### Q1 & Q2 - Frontend & Backend

#### TC-1: User Registration
**Test Case**: Create a new user account
```
Steps:
1. Navigate to /register
2. Fill form:
   - Name: Test User
   - Email: testuser@example.com
   - Password: password123
   - Confirm Password: password123
   - Role: HR
3. Click Register

Expected Result:
✓ User registered successfully
✓ Redirected to dashboard
✓ Token stored in localStorage
✓ User info displayed in navbar
```

**API Call (Postman/ThunderClient)**:
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "password123",
  "role": "hr"
}

Expected Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "testuser@example.com",
    "role": "hr"
  }
}
```

#### TC-2: User Login
**Test Case**: Login with valid credentials
```
Steps:
1. Navigate to /login
2. Enter:
   - Email: testuser@example.com
   - Password: password123
3. Click Login

Expected Result:
✓ Login successful
✓ Redirected to dashboard
✓ Token stored
✓ User info in navbar
```

**API Call**:
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "testuser@example.com",
  "password": "password123"
}
```

#### TC-3: Invalid Login
**Test Case**: Login with wrong password
```
Steps:
1. Navigate to /login
2. Enter:
   - Email: testuser@example.com
   - Password: wrongpassword
3. Click Login

Expected Result:
✗ Error message: "Invalid credentials"
✗ Not redirected
```

#### TC-4: Protected Routes
**Test Case**: Access dashboard without login
```
Steps:
1. Try to access /dashboard without token
2. Clear localStorage

Expected Result:
✓ Redirected to /login
✓ Cannot access protected routes
```

### Q1 - Frontend Components

#### TC-5: Employee Registration Form
**Test Case**: Add valid employee
```
Steps:
1. Login as HR user
2. Go to Dashboard > Add Employee
3. Fill form:
   - Name: Aman Verma
   - Email: aman@gmail.com
   - Department: Development
   - Skills: React, Node.js, MongoDB (add each)
   - Performance Score: 85
   - Experience: 3
4. Click Add Employee

Expected Result:
✓ Success message: "Employee added successfully!"
✓ Form clears
✓ Employee appears in list
```

#### TC-6: Form Validation
**Test Case**: Submit form with missing fields
```
Steps:
1. Leave Name field empty
2. Try to submit form

Expected Result:
✗ Form requires all fields
✗ Error message or invalid indicator
```

#### TC-7: Duplicate Email
**Test Case**: Add employee with existing email
```
Steps:
1. Add employee with email: emp1@test.com
2. Try to add another with same email

Expected Result:
✗ Error: "Employee with this email already exists"
```

#### TC-8: Employee List
**Test Case**: View all employees
```
Steps:
1. Login and go to Dashboard
2. Click "Employee List" tab

Expected Result:
✓ Table displays all employees
✓ Shows: Name, Email, Department, Performance, Skills
✓ Performance score shows visual bar
✓ Edit/Delete buttons visible
```

#### TC-9: Search by Department
**Test Case**: Search employees by department
```
Steps:
1. Go to Search & Filter
2. Select Department: Development
3. Click Search

Expected Result:
✓ Only Development employees shown
✓ Count displays: "Results (X found)"
✓ Employee cards show department badge
```

#### TC-10: Search by Skill
**Test Case**: Filter by skill
```
Steps:
1. Go to Search & Filter
2. Enter Skill: React
3. Click Search

Expected Result:
✓ Only employees with React skill shown
✓ Results display skill tags
```

#### TC-11: Search by Name
**Test Case**: Filter by employee name
```
Steps:
1. Go to Search & Filter
2. Enter Name: Aman
3. Click Search

Expected Result:
✓ Only Aman's record shown
✓ Case-insensitive search works
```

### Q2 - Backend & Q3 - Database

#### TC-12: MongoDB Employee Storage
**Test Case**: Verify employee data in database
```
Steps:
1. Use MongoDB Compass or Atlas
2. Connect to employee_analytics database
3. Check employees collection

Expected Result:
✓ New employees appear in collection
✓ All fields stored correctly
✓ Performance score is 0-100
✓ Skills array contains multiple items
```

#### TC-13: Data Validation
**Test Case**: Performance score validation
```
API Call:
POST http://localhost:5000/api/employees
Authorization: Bearer {token}

{
  "name": "Test",
  "email": "test@test.com",
  "department": "Development",
  "skills": ["React"],
  "performanceScore": 150,
  "experience": 2
}

Expected Result:
✗ Error: "Performance score cannot be more than 100"
```

#### TC-14: Required Skills
**Test Case**: Employee without skills
```
API Call with empty skills array

Expected Result:
✗ Error: "At least one skill is required"
```

#### TC-15: Get All Employees
**Test Case**: Fetch all employees
```
API Call:
GET http://localhost:5000/api/employees
Authorization: Bearer {token}

Expected Response:
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "name": "...",
      "email": "...",
      "department": "...",
      "performanceScore": 85,
      "experience": 3,
      "skills": ["React", "Node.js"],
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

#### TC-16: Search Endpoint
**Test Case**: Server-side search
```
API Call:
GET http://localhost:5000/api/employees/search?department=Development&skill=React
Authorization: Bearer {token}

Expected Response:
✓ Returns only matching employees
✓ Correctly filters by both criteria
```

#### TC-17: Employee Statistics
**Test Case**: Get employee stats
```
API Call:
GET http://localhost:5000/api/employees/stats/summary
Authorization: Bearer {token}

Expected Response:
{
  "success": true,
  "data": {
    "totalEmployees": 5,
    "averagePerformance": 82,
    "departmentStats": [
      {
        "_id": "Development",
        "count": 3,
        "avgScore": 85
      }
    ]
  }
}
```

### Q4 - MERN Integration

#### TC-18: Full CRUD - Create
**Test Case**: Add employee from frontend, verify in DB
```
Frontend:
1. Add employee via form
2. See success message

Backend:
1. Check MongoDB - employee exists
2. All fields saved correctly

API:
GET /api/employees shows new employee
```

#### TC-19: Full CRUD - Read
**Test Case**: Display employees from database
```
Frontend:
1. Go to Employee List
2. All employees from DB displayed
3. Data updates in real-time
```

#### TC-20: Full CRUD - Update
**Test Case**: Update employee performance
```
API Call:
PUT http://localhost:5000/api/employees/{id}
Authorization: Bearer {token}

{
  "performanceScore": 90
}

Expected Result:
✓ Performance updated
✓ Timestamp updated
✓ Frontend reflects change
```

#### TC-21: Full CRUD - Delete
**Test Case**: Delete employee
```
Frontend:
1. Click Delete on employee
2. Confirm deletion
3. Employee disappears from list

API:
DELETE /api/employees/{id}
Status: 200

Database:
Employee removed from collection
```

### Q5 - AI Integration

#### TC-22: Single Employee Recommendation
**Test Case**: Get AI recommendation
```
Frontend:
1. Go to AI Analytics
2. Single Employee tab
3. Select employee
4. Click "Get AI Recommendation"

Expected Result:
✓ Loading indicator shows
✓ AI recommendation displays
✓ Contains promotion/training suggestions
✓ Formatted response shown
```

**API Call**:
```
POST http://localhost:5000/api/ai/recommend
Authorization: Bearer {token}
Content-Type: application/json

{
  "employeeId": "507f1f77bcf86cd799439012"
}

Expected Response:
{
  "success": true,
  "data": {
    "employeeId": "...",
    "employeeName": "Aman Verma",
    "aiRecommendation": "Based on Aman's high performance score (85/100)..."
  }
}
```

#### TC-23: High Performance Employee
**Test Case**: AI recommendation for top performer
```
Steps:
1. Select employee with performance > 80
2. Get recommendation

Expected AI Output:
✓ Mentions promotion readiness
✓ Suggests leadership training
✓ Career advancement path
```

#### TC-24: Low Performance Employee
**Test Case**: AI recommendation for improvement
```
Steps:
1. Select employee with performance < 50
2. Get recommendation

Expected AI Output:
✓ Identifies improvement areas
✓ Suggests training programs
✓ Performance improvement plan
```

#### TC-25: Batch Recommendations
**Test Case**: Get recommendations for multiple employees
```
Frontend:
1. Go to AI Analytics
2. Batch Analysis tab
3. Select multiple employees
4. Click "Get Batch Recommendations"

Expected Result:
✓ Employees ranked by performance
✓ Each has recommendation
✓ Rankings display correctly
✓ Sorted by performance score
```

**API Call**:
```
POST http://localhost:5000/api/ai/recommend-batch
Authorization: Bearer {token}

{
  "employeeIds": ["id1", "id2", "id3"]
}

Expected Response:
{
  "success": true,
  "count": 3,
  "data": [
    {
      "employeeId": "...",
      "employeeName": "...",
      "ranking": 1,
      "performanceScore": 95,
      "recommendation": "..."
    }
  ]
}
```

#### TC-26: Missing Skills Employee
**Test Case**: Training recommendation
```
Steps:
1. Select employee missing key skills
2. Get AI recommendation

Expected AI Output:
✓ Identifies skill gaps
✓ Recommends skill training
✓ Suggests courses/resources
```

### Q6 - Authentication & Security

#### TC-27: Password Hashing
**Test Case**: Verify password is hashed in DB
```
Steps:
1. Register user with password: MyPassword123
2. Open MongoDB and check users collection

Expected Result:
✓ Password is hashed (starts with $2a$ or $2b$)
✓ NOT plain text
✓ Different hash each time (salt)
```

#### TC-28: JWT Token
**Test Case**: Verify JWT token in login response
```
Steps:
1. Login successfully
2. Open DevTools > localStorage
3. Check 'token' value

Expected Result:
✓ Token present
✓ Token is JWT format (three parts separated by dots)
✓ Can decode with jwt.io (for inspection only)
```

#### TC-29: Protected Endpoints
**Test Case**: Call protected endpoint without token
```
API Call:
GET http://localhost:5000/api/employees

Expected Result:
Status: 401
Response:
{
  "success": false,
  "message": "No token, authorization denied"
}
```

#### TC-30: Invalid Token
**Test Case**: Call with malformed token
```
API Call:
GET http://localhost:5000/api/employees
Authorization: Bearer invalid.token.here

Expected Result:
Status: 401
Message: "Token is not valid"
```

#### TC-31: Role-Based Access
**Test Case**: Regular user cannot add employee
```
Steps:
1. Register as 'user' role
2. Try to add employee

Expected Result:
✗ Error: "Not authorized to access this resource"
Status: 403
```

#### TC-32: Admin Requirement
**Test Case**: Only admin can delete
```
Steps:
1. Login as HR user
2. Try to delete employee

Expected Result:
✗ Error: "Not authorized"
Status: 403

With admin user:
✓ Can delete successfully
```

### Q9 - Code Quality

#### TC-33: Code Structure
**Verification Checklist**:
```
✓ Backend folder structure:
  - src/config/
  - src/models/
  - src/controllers/
  - src/routes/
  - src/middleware/
  - src/utils/

✓ Frontend folder structure:
  - src/components/
  - src/pages/
  - src/services/
  - src/context/

✓ Reusable components
✓ Clear naming conventions
✓ Comments in code
✓ Error handling
```

#### TC-34: API Documentation
```
Verify:
✓ README files exist
✓ API endpoints documented
✓ Request/response examples
✓ Setup instructions clear
✓ Environment variables explained
```

## Performance Testing

#### TC-35: Large Dataset
**Test Case**: Load 100+ employees
```
Steps:
1. Add 100 employees to database
2. Go to Employee List
3. Check load time

Expected Result:
✓ Page loads in <3 seconds
✓ Table displays correctly
✓ No crashes
```

#### TC-36: Bulk Search
**Test Case**: Search with 100 employees
```
Steps:
1. Search by department
2. Measure response time

Expected Result:
✓ Results returned in <1 second
✓ Accurate filtering
```

## Error Handling Tests

#### TC-37: Network Error
**Test Case**: Backend offline
```
Steps:
1. Stop backend server
2. Try to load employee list

Expected Result:
✓ Error message displayed
✓ Graceful error handling
✓ No server errors in console
```

#### TC-38: Invalid Data
**Test Case**: Malformed request
```
API Call with invalid JSON

Expected Result:
Status: 400
Clear error message
```

## Browser Compatibility

Test on:
- Chrome/Chromium (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

Expected: All features work correctly

## Mobile Testing

Test on:
- Mobile screen sizes (375px - 768px)
- Tablet sizes (768px - 1024px)

Expected: Responsive design works

## Smoke Test (Quick Verification)

```
1. Register new user ✓
2. Login ✓
3. Add employee ✓
4. View employee list ✓
5. Search employees ✓
6. Get AI recommendation ✓
7. Logout ✓
```

## Test Results Template

```
Test Date: ___________
Tester: ___________
Environment: Development/Production
Browser: ___________

Test Case | Status | Notes
-----------|--------|-------
TC-1 | PASS/FAIL | 
TC-2 | PASS/FAIL |
...

Overall: PASS/FAIL
Issues Found: 
Recommendations:
```
