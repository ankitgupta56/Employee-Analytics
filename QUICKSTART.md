# Quick Start Guide

Get the Employee Performance Analytics application up and running in minutes.

## Prerequisites

- Node.js v14+ installed
- MongoDB running locally or MongoDB Atlas connection string
- OpenRouter API key (from https://openrouter.ai)
- Git (for version control)

## Setup (5 minutes)

### 1. Clone or Extract Project

```bash
cd d:\Full_Stack\ESE
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with your configuration:
# - MONGODB_URI=mongodb://localhost:27017/employee_analytics
# - JWT_SECRET=your_secret_key
# - OPENROUTER_API_KEY=your_api_key

# Start backend server
npm run dev
# Backend runs on http://localhost:5000
```

### 3. Frontend Setup (New Terminal)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend dev server
npm run dev
# Frontend runs on http://localhost:3000
```

### 4. Access Application

Open browser: `http://localhost:3000`

You're ready to use the application!

## First Time Setup

1. **Register Account**
   - Click Register
   - Create account with email and password
   - Select role (user, hr, or admin)
   - Click Register

2. **Add Employee** (if HR/Admin)
   - Go to Dashboard
   - Click "Add Employee"
   - Fill employee details
   - Click "Add Employee"

3. **View Employees**
   - Go to Employee List tab
   - See all added employees

4. **Get AI Recommendations** (if HR/Admin)
   - Go to AI Analytics
   - Select employee
   - Click "Get AI Recommendation"
   - View AI-powered insights

## Common Tasks

### Add Employee
Dashboard → Add Employee Tab → Fill Form → Submit

### Search Employees
Dashboard → Search & Filter Tab → Enter Criteria → Search

### Get AI Recommendation
AI Analytics → Single Employee Tab → Select Employee → Get Recommendation

### Update Performance Score
Dashboard → Employee List → Edit → Update Score

### Delete Employee
Dashboard → Employee List → Delete Button

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
# Kill process or change PORT in .env
# Ensure MongoDB is running
```

### Frontend shows blank page
```bash
# Check browser console for errors
# Ensure backend is running
# Clear browser cache: Ctrl+Shift+Delete
```

### MongoDB Connection Failed
```bash
# Ensure MongoDB is running
# Check connection string in .env
# Verify database user credentials
```

### API 401 Error
```bash
# Login again
# Clear localStorage: console -> localStorage.clear()
# Refresh browser
```

## Project Structure Overview

```
ESE/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── models/      # Database schemas
│   │   ├── controllers/ # Business logic
│   │   ├── routes/      # API endpoints
│   │   └── middleware/  # Auth, errors
│   └── .env.example     # Configuration template
│
├── frontend/            # React + Vite UI
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── services/    # API calls
│   └── index.html       # Entry point
│
└── docs/               # Documentation
    ├── README.md
    ├── API_DOCUMENTATION.md
    ├── TESTING_GUIDE.md
    ├── DEPLOYMENT.md
    └── GITHUB_SETUP.md
```

## Key Features

✅ User Authentication with JWT
✅ Employee CRUD Operations
✅ Advanced Search & Filter
✅ AI-Powered Recommendations
✅ Employee Performance Analytics
✅ Role-Based Access Control
✅ Responsive Design
✅ Production-Ready Code

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feat/your-feature
```

### 2. Make Changes
Edit files in backend or frontend

### 3. Test Locally
Run application locally to verify

### 4. Commit Changes
```bash
git add .
git commit -m "feat: description of changes"
```

### 5. Push to GitHub
```bash
git push origin feat/your-feature
```

### 6. Create Pull Request
Open PR on GitHub for review

## Testing Checklist

- [ ] Register account works
- [ ] Login works
- [ ] Can add employee
- [ ] Employee list displays
- [ ] Search functionality works
- [ ] AI recommendation works
- [ ] Can update employee
- [ ] Can delete employee
- [ ] Logout works

## Environment Configuration

### Development
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee_analytics
JWT_SECRET=dev_secret_key
```

### Production (Render)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=production_secret_key
OPENROUTER_API_KEY=your_api_key
```

## Useful Commands

### Backend
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

# Install dependencies
npm install

# Check for errors
npm run lint
```

### Frontend
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Git
```bash
# Check status
git status

# View commit history
git log --oneline

# See changes
git diff

# Switch branch
git checkout branch-name

# Create and switch branch
git checkout -b new-branch
```

## API Testing Tools

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass123"}'

# Get employees
curl http://localhost:5000/api/employees \
  -H "Authorization: Bearer <token>"
```

### Using Postman
1. Download Postman from https://www.postman.com
2. Create new request
3. Set method, URL, and headers
4. Send request
5. View response

### Using Thunder Client (VS Code)
1. Install Thunder Client extension
2. Create request in sidebar
3. Set method and URL
4. Add Authorization header
5. Send request

## Performance Tips

1. **Backend Optimization**
   - Add database indexes
   - Implement caching
   - Use pagination for large datasets

2. **Frontend Optimization**
   - Use React.memo for components
   - Lazy load routes
   - Minimize bundle size

3. **Database Optimization**
   - Create indexes on frequently searched fields
   - Archive old records
   - Clean up unused data

## Security Best Practices

1. **Never commit secrets**
   - Use .env files
   - Add .env to .gitignore

2. **Strong passwords**
   - Minimum 8 characters
   - Mix of letters, numbers, symbols

3. **JWT tokens**
   - Set strong JWT_SECRET
   - Tokens expire in 7 days
   - Store securely in frontend

4. **Input validation**
   - Validate all user inputs
   - Sanitize database queries
   - Use parameterized queries

## Next Steps

1. **Customize Application**
   - Add new features
   - Modify styling
   - Extend database schema

2. **Deploy to Production**
   - Set up MongoDB Atlas
   - Deploy to Render
   - Configure custom domain
   - Set up monitoring

3. **Add Advanced Features**
   - Employee reviews
   - Project tracking
   - Performance goals
   - Team management

4. **Scaling**
   - Add caching layer
   - Implement pagination
   - Database optimization
   - Load balancing

## Getting Help

- **Backend Issues**: Check backend README.md
- **Frontend Issues**: Check frontend README.md
- **API Issues**: See API_DOCUMENTATION.md
- **Deployment Issues**: See DEPLOYMENT.md
- **Testing Issues**: See TESTING_GUIDE.md

## Support Resources

- Node.js: https://nodejs.org
- Express: https://expressjs.com
- MongoDB: https://www.mongodb.com
- React: https://react.dev
- Vite: https://vitejs.dev
- Render: https://render.com

## License

ISC - Use freely for education and commercial projects

## Summary

You now have a fully functional MERN stack application with:

✅ Complete authentication system
✅ Employee management system
✅ AI-powered recommendations
✅ Production-ready code
✅ Comprehensive documentation
✅ Deployment guides
✅ Testing guides

Start building amazing features! 🚀
