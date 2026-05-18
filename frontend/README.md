# Frontend - Employee Performance Analytics UI

React + Vite frontend for employee management and AI-powered recommendations.

## Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running

Development server (with hot module reload):
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

Building for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Login.jsx              # Login form
│   ├── Register.jsx           # Registration form
│   ├── EmployeeForm.jsx       # Add employee form
│   ├── EmployeeList.jsx       # Display all employees
│   ├── SearchFilter.jsx       # Search and filter
│   ├── AIRecommendations.jsx  # AI recommendations
│   └── *.css                  # Component styles
├── pages/
│   ├── Dashboard.jsx          # Main dashboard
│   ├── AIPage.jsx            # AI analytics page
│   └── *.css                  # Page styles
├── services/
│   ├── api.js                 # Axios instance
│   └── apiService.js          # API calls
├── context/
│   └── AuthContext.jsx        # Auth state management
├── App.jsx                    # Main app component
├── App.css                    # App styles
└── main.jsx                   # Entry point
```

## Components

### 1. Login & Register
- Email and password authentication
- User role selection
- Form validation
- Success/error messages

### 2. Dashboard
- Employee List - View all employees
- Add Employee - Form to add new employees
- Search & Filter - Search employees by criteria

### 3. Employee Form
- Input fields: Name, Email, Department, Performance Score, Experience
- Skill management with add/remove functionality
- Form validation
- Success/error notifications

### 4. Employee List
- Table view of all employees
- Performance score visualization
- Skills display
- Edit and delete actions
- Responsive design

### 5. Search & Filter
- Filter by department
- Search by skill
- Search by name
- Display filtered results as cards

### 6. AI Recommendations
- **Single Analysis**
  - Select employee
  - Get personalized AI recommendations
  - Display formatted recommendations

- **Batch Analysis**
  - Select multiple employees
  - Get ranked recommendations
  - Compare employee performance

## State Management

### AuthContext
- user: Current logged-in user
- isAuthenticated: Authentication status
- loading: Loading state
- login(): Login function
- register(): Register function
- logout(): Logout function

## API Integration

API base URL is configured in `.env` or through Vite proxy.

All requests include JWT token in Authorization header:
```
Authorization: Bearer <token>
```

Token is stored in localStorage and automatically added to requests.

## Component Features

### Login
- Form validation
- Error messages
- Loading state
- Redirect to dashboard on success

### Employee Form
- Multi-field form
- Dynamic skill input
- Form validation
- Success notifications
- Clears on successful submission

### Employee List
- Table with sorting data
- Performance score visualization
- Responsive design
- Edit/Delete actions
- Automatic refresh on data change

### Search Filter
- Real-time filtering
- Multiple search criteria
- Result cards
- Error handling

### AI Recommendations
- Single employee analysis
- Batch analysis with ranking
- Loading states
- Error handling
- Formatted AI responses

## Styling

Modern, responsive CSS with:
- Gradient backgrounds
- Card layouts
- Flexible tables
- Mobile-first design
- Smooth transitions
- Color-coded indicators

### Color Scheme
- Primary: #667eea (Purple)
- Secondary: #764ba2 (Dark Purple)
- Success: #28a745 (Green)
- Warning: #ffc107 (Yellow)
- Danger: #dc3545 (Red)

## Responsive Design

Breakpoints:
- Desktop: Full layout
- Tablet (768px): Adjusted grid and flex
- Mobile (480px): Single column, simplified layout

## API Endpoints Called

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

### Employees
- POST `/api/employees`
- GET `/api/employees`
- GET `/api/employees/search`
- PUT `/api/employees/:id`
- DELETE `/api/employees/:id`
- GET `/api/employees/stats/summary`

### AI
- POST `/api/ai/recommend`
- POST `/api/ai/recommend-batch`

## Environment Configuration

Create `.env.local` (optional, defaults use Vite proxy):
```env
VITE_API_URL=http://localhost:5000/api
```

Vite proxy is configured in `vite.config.js` for development.

## Features

✅ User authentication with JWT
✅ Role-based access control
✅ Employee CRUD operations
✅ Advanced search and filtering
✅ AI-powered recommendations
✅ Employee rankings
✅ Performance visualization
✅ Responsive design
✅ Error handling
✅ Loading states

## Dependencies

- react: UI library
- react-dom: React DOM
- react-router-dom: Routing
- axios: HTTP client

## Development Tips

1. **Hot Module Reload**: Changes automatically refresh in browser
2. **Error Messages**: Check browser console for detailed errors
3. **Network Requests**: Open DevTools > Network tab to see API calls
4. **State Debugging**: Install React DevTools extension
5. **Style Debugging**: Use browser DevTools to inspect elements

## Common Issues

**Blank Page on Load**
- Check browser console for errors
- Ensure backend is running on correct port
- Verify API URL in configuration

**Login Not Working**
- Check backend is running
- Verify credentials
- Check browser console for error details

**API Requests Failing**
- Ensure backend server is running
- Check CORS configuration
- Verify token in localStorage

**Components Not Updating**
- Check state management with React DevTools
- Ensure useEffect dependencies are correct
- Check console for JavaScript errors

## Testing

To test the application:

1. **Register**: Create a new user account
2. **Login**: Log in with credentials
3. **Add Employee**: Add test employees
4. **Search**: Search by various criteria
5. **AI Recommendations**: Get AI analysis

## Build & Deployment

Build for production:
```bash
npm run build
```

This creates an optimized `dist/` folder.

Deploy to Render:
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm run preview`
4. Configure environment variables
5. Deploy

## Notes

- LocalStorage stores authentication token
- All dates use ISO format
- Component styling is modular (CSS files)
- Error handling with try/catch and error boundaries
- Loading states prevent multiple submissions
