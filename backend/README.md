# Backend - Employee Performance Analytics API

Node.js & Express.js backend with MongoDB for employee management and AI integration.

## Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- OpenRouter API key (Free account available - https://openrouter.ai)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee_analytics
JWT_SECRET=your_jwt_secret_key_change_this_in_production
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
NODE_ENV=development
```

**Note**: This application uses **openrouter/free** - automatically selects the best available free model on OpenRouter with no credits required.

### Running

Development mode (with hot reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server runs on `http://localhost:5000`

## Project Structure

```
src/
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   ├── User.js            # User schema
│   └── Employee.js        # Employee schema
├── controllers/
│   ├── authController.js  # Auth logic
│   ├── employeeController.js  # Employee CRUD
│   └── aiController.js    # AI recommendations
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   ├── employeeRoutes.js  # Employee endpoints
│   └── aiRoutes.js        # AI endpoints
├── middleware/
│   ├── authMiddleware.js  # JWT verification
│   └── errorMiddleware.js # Error handling
├── utils/
│   ├── passwordUtils.js   # Password hashing
│   └── jwtUtils.js        # JWT utilities
└── index.js               # Express app
```

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/me` - Get current user (Protected)

### Employees
- **POST** `/api/employees` - Add new employee
  - Requires: HR or Admin role
  - Body: name, email, department, skills[], performanceScore, experience

- **GET** `/api/employees` - Get all employees
  - Returns: Array of employees

- **GET** `/api/employees/search?department=Dev&skill=React&name=John` - Search employees
  - Query parameters: department, skill, name

- **GET** `/api/employees/:id` - Get single employee
  - Param: employeeId

- **GET** `/api/employees/stats/summary` - Get statistics
  - Returns: Total count, average performance, department stats

- **PUT** `/api/employees/:id` - Update employee
  - Requires: HR or Admin role

- **DELETE** `/api/employees/:id` - Delete employee
  - Requires: Admin role

### AI Recommendations
- **POST** `/api/ai/recommend` - Get recommendation for single employee
  - Requires: HR or Admin role
  - Body: employeeId

- **POST** `/api/ai/recommend-batch` - Get recommendations for multiple employees
  - Requires: HR or Admin role
  - Body: employeeIds[]

## Database Schemas

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: admin, hr, user),
  isActive: Boolean,
  timestamps: true
}
```

### Employee Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  department: String (enum: Development, HR, Sales, Marketing, Finance, Operations),
  skills: [String] (required, min 1),
  performanceScore: Number (0-100),
  experience: Number (years),
  createdBy: ObjectId (reference to User),
  timestamps: true
}
```

## Error Handling

Standard error response format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details (dev mode only)"
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Authentication

Uses JWT tokens with Bearer scheme:
```
Authorization: Bearer <token>
```

Token expires in 7 days.

## Middleware

- **authMiddleware.js**: Verifies JWT and attaches user to request
- **errorMiddleware.js**: Centralized error handling
- **helmet**: Security headers
- **cors**: Cross-origin requests
- **express.json()**: JSON parsing

## Dependencies

- express: Web framework
- mongoose: MongoDB ODM
- bcryptjs: Password hashing
- jsonwebtoken: JWT tokens
- dotenv: Environment variables
- cors: CORS handling
- axios: HTTP requests
- helmet: Security
- express-validator: Input validation

## Notes

- Passwords are hashed with bcryptjs (10 salt rounds)
- Tokens expire after 7 days
- Inactive users cannot login
- Email must be unique for both users and employees
- Performance scores must be 0-100
- At least one skill is required for employees

## Troubleshooting

**MongoDB Connection Failed**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For MongoDB Atlas, whitelist your IP

**API Not Working**
- Check console for error messages
- Verify all required fields in request body
- Check JWT token in Authorization header

**AI Recommendations Failing**
- Verify OpenRouter API key is valid
- Check API quota/rate limits
- Ensure proper request format
