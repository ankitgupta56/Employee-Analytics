# Employee Performance Analytics & Recommendation System - MERN Stack

A full-stack MERN application with AI integration for analyzing employee performance data and providing AI-powered recommendations using OpenRouter/OpenAI APIs.

## Project Structure

```
ESE/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Employee.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── employeeController.js
│   │   │   └── aiController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── employeeRoutes.js
│   │   │   └── aiRoutes.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   ├── utils/
│   │   │   ├── passwordUtils.js
│   │   │   └── jwtUtils.js
│   │   └── index.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── EmployeeList.jsx
│   │   │   ├── SearchFilter.jsx
│   │   │   ├── AIRecommendations.jsx
│   │   │   └── *.css
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AIPage.jsx
│   │   │   └── *.css
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── apiService.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
└── docs/
```

## Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Axios** - HTTP client
- **Helmet** - Security headers
- **CORS** - Cross-origin requests

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - API requests
- **CSS3** - Styling

### AI Integration
- **OpenRouter API** - AI recommendations (compatible with OpenAI)

## Features

### 1. Authentication & Security (Q6)
- User Registration and Login with JWT authentication
- Password hashing using bcryptjs
- Protected routes (admin, HR, user roles)
- Access control middleware

### 2. Employee Management (Q1, Q2, Q3, Q4)
- Add new employees with validation
- View all employees
- Search employees by department, skill, or name
- Update employee performance scores
- Delete employees
- Employee statistics and analytics

### 3. Employee Data (Q1)
- Employee Name
- Email
- Department
- Skills (Array)
- Performance Score
- Years of Experience

### 4. AI-Powered Recommendations (Q5)
- **Promotion Recommendations** - Analyze if an employee is ready for promotion
- **Employee Ranking** - Rank employees based on performance
- **Training Suggestions** - Identify skills gaps and training needs
- **AI Feedback Generation** - Personalized feedback and career guidance

### 5. Database (Q3)
- MongoDB schemas for User and Employee
- Validation at database and application level
- Query filtering and aggregation

### 6. Code Quality (Q9)
- Modular folder structure
- Consistent naming conventions
- Comprehensive comments
- Reusable components

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee_analytics
JWT_SECRET=your_jwt_secret_key_change_this_in_production
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
NODE_ENV=development
```

5. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Employees
- `POST /api/employees` - Add new employee (HR/Admin)
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get single employee
- `GET /api/employees/search?department=Dev&skill=React&name=John` - Search employees
- `PUT /api/employees/:id` - Update employee (HR/Admin)
- `DELETE /api/employees/:id` - Delete employee (Admin)
- `GET /api/employees/stats/summary` - Get employee statistics

### AI Recommendations
- `POST /api/ai/recommend` - Get recommendation for single employee (HR/Admin)
- `POST /api/ai/recommend-batch` - Get recommendations for multiple employees (HR/Admin)

## Sample Request/Response

### Register User
**Request:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "hr"
}
```

**Response:**
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

### Add Employee
**Request:**
```json
POST /api/employees
Authorization: Bearer {token}
{
  "name": "Aman Verma",
  "email": "aman@gmail.com",
  "department": "Development",
  "skills": ["React", "Node.js", "MongoDB"],
  "performanceScore": 85,
  "experience": 3
}
```

**Response:**
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
    "createdAt": "2023-10-15T10:30:00.000Z",
    "updatedAt": "2023-10-15T10:30:00.000Z"
  }
}
```

### Get AI Recommendation
**Request:**
```json
POST /api/ai/recommend
Authorization: Bearer {token}
{
  "employeeId": "507f1f77bcf86cd799439012"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "employeeId": "507f1f77bcf86cd799439012",
    "employeeName": "Aman Verma",
    "aiRecommendation": "Based on Aman's high performance score (85/100) and strong skill set in modern web technologies, he is an excellent candidate for promotion to Senior Developer. Recommend: Leadership training program, Architecture design courses. Career Path: Senior Developer → Tech Lead → Engineering Manager."
  }
}
```

## Environment Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee_analytics
JWT_SECRET=your_jwt_secret_key_change_this_in_production
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
NODE_ENV=development
```

### Frontend (Vite proxy is configured in vite.config.js)
The frontend automatically proxies API requests to the backend server.

## Usage

1. **Register/Login**
   - Go to `/register` or `/login`
   - Create account or login with existing credentials

2. **Manage Employees**
   - Go to Dashboard
   - Add employees with their details
   - View all employees in the list
   - Search and filter by department, skill, or name

3. **Get AI Recommendations**
   - Go to AI Analytics page
   - Single Analysis: Select an employee and get personalized recommendations
   - Batch Analysis: Select multiple employees and get ranked recommendations

## Project Evaluation Criteria

✅ **Q1 - Frontend Requirements**
- React components with proper structure
- useState & useEffect hooks
- Form handling with validation
- Responsive UI design
- API integration with Axios

✅ **Q2 - Backend Requirements**
- REST API design
- Controller & Route structure
- Validation logic
- Error handling middleware

✅ **Q3 - Database**
- MongoDB schemas
- CRUD operations
- Query filtering
- Data validation

✅ **Q4 - MERN Integration**
- Frontend-Backend communication
- MongoDB data fetching
- Dynamic rendering
- Full CRUD operations

✅ **Q5 - AI Integration**
- OpenRouter API integration
- Promotion recommendations
- Employee ranking
- Training suggestions
- AI feedback generation

✅ **Q6 - Authentication & Security**
- JWT authentication
- bcrypt password hashing
- Protected routes
- Role-based access control

✅ **Q7 - Git & GitHub**
- Clean commit history
- Project documentation
- Repository structure

✅ **Q8 - Deployment**
- Ready for Render deployment
- MongoDB Atlas compatible
- Environment configuration

✅ **Q9 - Code Quality**
- Well-organized folder structure
- Consistent naming conventions
- Comments and documentation
- Reusable components

## Deployment on Render

### Backend Deployment
1. Connect GitHub repository to Render
2. Create Web Service
3. Set environment variables in Render dashboard
4. Deploy

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to Render or Vercel
3. Configure environment to point to backend API

## Notes

- Ensure MongoDB is running before starting the backend
- Get OpenRouter API key from https://openrouter.ai (Free account available)
- **Using free model**: openrouter/free (automatically uses best available free model, no credits required)
- Change JWT_SECRET in production
- Use environment variables for sensitive data
- Install all dependencies before running

## License

ISC

## Author

B.Tech AI Driven Full Stack Development - Semester 4
