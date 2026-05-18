# Deployment Guide - Render

Complete guide for deploying the MERN application to Render.

## Prerequisites

1. **GitHub Account** - Push code to GitHub
2. **Render Account** - Free account at https://render.com
3. **MongoDB Atlas** - Free tier at https://www.mongodb.com/cloud/atlas
4. **OpenRouter API Key** - From https://openrouter.ai

## Setup MongoDB Atlas

### 1. Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or login
3. Create organization and project
4. Create a cluster (Free tier available)
5. Choose provider and region
6. Wait for cluster to deploy (5-10 minutes)

### 2. Create Database User

1. Go to Database Access
2. Add database user
3. Username: `dbuser`
4. Password: Generate secure password (copy it!)
5. Add role: readWriteAnyDatabase
6. Create user

### 3. Whitelist IP

1. Go to Network Access
2. Add IP Address
3. Add `0.0.0.0/0` (allows all IPs - for development)
4. For production: add Render IP ranges

### 4. Get Connection String

1. Click "Connect"
2. Choose "Connect Your Application"
3. Copy connection string
4. Replace:
   - `<username>`: your database user
   - `<password>`: your database password
   - Example: `mongodb+srv://dbuser:password@cluster0.abc123.mongodb.net/employee_analytics?retryWrites=true&w=majority`

## Backend Deployment on Render

### 1. Push Backend to GitHub

```bash
cd backend
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Create Render Web Service

1. Go to https://render.com/dashboard
2. Click "New +" button
3. Select "Web Service"
4. Connect GitHub repository
5. Select your repository
6. Configure settings:
   - **Name**: `employee-analytics-api`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (Starter)

### 3. Add Environment Variables

In Render dashboard, add these environment variables:

```
PORT=5000
MONGODB_URI=mongodb+srv://dbuser:password@cluster0.abc123.mongodb.net/employee_analytics?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_jwt_secret_key_change_this
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
NODE_ENV=production
```

### 4. Deploy

1. Click "Create Web Service"
2. Wait for deployment (2-5 minutes)
3. Get your backend URL: `https://employee-analytics-api.render.com`
4. Test health endpoint: `https://employee-analytics-api.render.com/api/health`

### Troubleshooting Backend

**Build Failed**
- Check build logs
- Ensure all dependencies are in package.json
- Check for syntax errors

**MongoDB Connection Failed**
- Verify MongoDB URI in environment variables
- Check MongoDB Atlas whitelist IP
- Ensure database user credentials are correct

**API Returns 500 Error**
- Check render logs
- Verify environment variables
- Check OpenRouter API key validity

## Frontend Deployment on Render

### 1. Build Frontend

```bash
cd frontend
npm run build
```

This creates a `dist/` folder with optimized build.

### 2. Push Frontend to GitHub

```bash
git add .
git commit -m "Build ready for deployment"
git push origin main
```

### 3. Create Render Static Site

1. Go to https://render.com/dashboard
2. Click "New +" button
3. Select "Static Site"
4. Connect GitHub repository
5. Select your repository (frontend folder)
6. Configure settings:
   - **Name**: `employee-analytics`
   - **Publish directory**: `dist`
   - **Build Command**: `npm install && npm run build`

### 4. Deploy

1. Click "Create Static Site"
2. Wait for deployment
3. Get your frontend URL: `https://employee-analytics.render.com`

### 5. Configure API URL (Optional)

If frontend and backend are separate services, you may need to update the API URL in the frontend:

For Vite, create `.env.production` in frontend:
```
VITE_API_URL=https://employee-analytics-api.render.com/api
```

## Environment Variables Checklist

### Backend (.env)
```
✓ PORT=5000
✓ MONGODB_URI=mongodb+srv://...
✓ JWT_SECRET=secure_random_string
✓ OPENROUTER_API_KEY=your_key
✓ OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
✓ NODE_ENV=production
```

### Frontend (Built into Vite)
```
✓ API proxy configured in vite.config.js
```

## Post-Deployment Testing

### 1. Test Backend Health

```bash
curl https://employee-analytics-api.render.com/api/health

Expected Response:
{
  "success": true,
  "message": "Server is running"
}
```

### 2. Test Frontend

1. Visit `https://employee-analytics.render.com`
2. Should load login page
3. No console errors

### 3. Test Authentication

1. Register new account
2. Login
3. Should redirect to dashboard

### 4. Test Employee Management

1. Add employee
2. View list
3. Search employees
4. Delete employee
5. All CRUD operations work

### 5. Test AI Recommendations

1. Get single recommendation
2. Get batch recommendations
3. Verify AI responses

## Monitoring

### View Logs

In Render dashboard:
1. Select your service
2. Click "Logs" tab
3. Monitor for errors

### Alerts

Set up alerts in Render for:
- Build failures
- Deployment failures
- High response time
- Service down

## Common Issues & Solutions

### Issue: Build fails with "npm not found"
**Solution**: Ensure Node version is specified in render.yaml

### Issue: Frontend shows blank page
**Solution**: 
- Check browser console for errors
- Verify API URL is correct
- Check CORS configuration in backend

### Issue: MongoDB connection timeout
**Solution**:
- Check IP whitelist in MongoDB Atlas
- Verify connection string
- Ensure database is created

### Issue: AI recommendations return 401
**Solution**:
- Verify JWT token is sent
- Check token expiration
- Verify user has HR/Admin role

### Issue: Slow performance
**Solution**:
- Upgrade Render instance (free plan has limitations)
- Add indexing to MongoDB
- Implement pagination for large datasets

## Scaling for Production

### 1. Upgrade Instance Types

From Render dashboard:
- Backend: Standard → Professional
- Frontend: Render Pro for custom domain

### 2. Database Optimization

- Create indexes on frequently queried fields
- Enable caching
- Archive old employee records

### 3. Performance

- Enable compression
- Minimize bundle size
- Add CDN for static assets
- Implement lazy loading

### 4. Security

- Use HTTPS (automatic with Render)
- Keep dependencies updated
- Use strong JWT secret
- Implement rate limiting
- Add input validation

## Custom Domain

### Add Custom Domain (Render Pro)

1. In Render dashboard
2. Settings → Custom Domain
3. Add your domain
4. Update DNS records (instructions provided)
5. SSL certificate auto-generated

## GitHub Actions CI/CD

Optional: Automate deployment on push

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build
```

## Backup & Recovery

### MongoDB Backup

1. Go to MongoDB Atlas
2. Backup tab → On-Demand Backup
3. Schedule daily backups
4. Restore from backup if needed

### Code Backup

- GitHub is your backup
- Regular commits ensure history
- Can restore any previous version

## Cost Estimate

- Render Free Tier:
  - 1 free web service (spins down after 15 min inactivity)
  - 1 free static site
  - 100 GB bandwidth/month

- MongoDB Atlas Free Tier:
  - 512 MB storage
  - Shared cluster
  - Unlimited databases/collections

Total Cost: Free (with limitations)

## Deployment Checklist

```
Backend:
✓ Code pushed to GitHub
✓ All environment variables configured
✓ MongoDB Atlas cluster created
✓ Web Service created on Render
✓ Health endpoint responds
✓ API endpoints accessible

Frontend:
✓ Code pushed to GitHub
✓ Build successful locally
✓ Static site created on Render
✓ Site loads without errors
✓ API communication works

Testing:
✓ Register new user
✓ Login
✓ Add employee
✓ View employees
✓ Search functionality
✓ AI recommendations
✓ All CRUD operations
✓ Error handling

Final:
✓ Document live URLs
✓ Share URLs with team
✓ Monitor first 24 hours
✓ Set up alerts
```

## Live URLs

After deployment, record your URLs:

**Backend API**: `https://employee-analytics-api.render.com`
**Frontend**: `https://employee-analytics.render.com`
**API Health**: `https://employee-analytics-api.render.com/api/health`

## Support

- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- GitHub Pages: https://pages.github.com

## Rollback

If deployment fails:

1. In Render dashboard
2. Deployments tab
3. Select previous successful deployment
4. Click "Redeploy"

## Maintenance

Regular tasks:
- Monitor logs weekly
- Update dependencies monthly
- Check MongoDB storage
- Review API usage
- Update security patches
