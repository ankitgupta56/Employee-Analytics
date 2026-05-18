# GitHub Repository Setup Guide

## Initial Setup

1. **Create Repository**
   - Go to https://github.com/new
   - Repository name: `employee-analytics-mern`
   - Description: "MERN Application with AI Integration for Employee Performance Analytics"
   - Choose Public or Private
   - Initialize with README (optional, we have one)
   - Click Create Repository

2. **Clone or Initialize Local Repo**
   ```bash
   # If not initialized
   git init
   
   # Add remote origin
   git remote add origin https://github.com/yourusername/employee-analytics-mern.git
   ```

3. **Initial Commit**
   ```bash
   git add .
   git commit -m "Initial project setup - MERN stack with AI integration"
   git branch -M main
   git push -u origin main
   ```

## Commit History Guidelines

### Commit Messages Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Formatting
- **refactor**: Code restructuring
- **test**: Tests
- **chore**: Build/config changes

### Examples

```bash
# Q1 - Frontend Components
git commit -m "feat(frontend): create employee form component"
git commit -m "feat(frontend): implement employee list page"
git commit -m "feat(frontend): add search and filter functionality"
git commit -m "feat(frontend): create AI recommendations display"

# Q2 - Backend APIs
git commit -m "feat(backend): implement employee CRUD endpoints"
git commit -m "feat(backend): add employee search functionality"
git commit -m "feat(backend): implement AI recommendation endpoint"

# Q3 - Database
git commit -m "feat(database): create employee and user schemas"
git commit -m "feat(database): add data validation"

# Q4 - Integration
git commit -m "feat(integration): connect frontend to backend APIs"
git commit -m "feat(integration): implement full CRUD operations"

# Q5 - AI
git commit -m "feat(ai): integrate OpenRouter API"
git commit -m "feat(ai): implement AI recommendation engine"

# Q6 - Auth
git commit -m "feat(auth): implement JWT authentication"
git commit -m "feat(auth): add bcrypt password hashing"
git commit -m "feat(auth): implement protected routes"

# Q9 - Documentation
git commit -m "docs: add comprehensive API documentation"
git commit -m "docs: update README with setup instructions"
```

## Repository Structure in GitHub

```
/
├── README.md (main project documentation)
├── .gitignore
├── backend/
│   ├── README.md
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── config/
│       ├── models/
│       ├── controllers/
│       ├── routes/
│       ├── middleware/
│       ├── utils/
│       └── index.js
├── frontend/
│   ├── README.md
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── context/
│       ├── App.jsx
│       └── main.jsx
└── docs/
    ├── API_DOCUMENTATION.md
    ├── TESTING_GUIDE.md
    ├── DEPLOYMENT.md
    └── TEST_CASES.md
```

## GitHub Features to Utilize

### Issues
- Use GitHub Issues for tracking bugs and feature requests
- Label issues: bug, feature, documentation, etc.
- Reference issues in commits: `git commit -m "fix: resolve issue #1"`

### Pull Requests
- Create feature branches: `git checkout -b feat/employee-form`
- Create pull requests for code review
- Reference issues: "Closes #1"

### Releases
- Tag versions: `git tag -a v1.0.0 -m "Release version 1.0.0"`
- Create releases on GitHub
- Document changes in release notes

### Actions (CI/CD)
- Set up GitHub Actions for automated testing
- Deploy on push to main branch

## Important Files to Exclude

`.gitignore` already includes:
- node_modules/
- .env (use .env.example)
- dist/ (build output)
- .DS_Store (macOS)
- *.log files

## Cloning for Others

```bash
# Clone repository
git clone https://github.com/yourusername/employee-analytics-mern.git
cd employee-analytics-mern

# Setup backend
cd backend
cp .env.example .env
npm install
npm run dev

# In another terminal, setup frontend
cd frontend
npm install
npm run dev
```

## Branch Strategy

- **main**: Production-ready code
- **develop**: Development branch
- **feat/\***: Feature branches
- **fix/\***: Bug fix branches
- **docs/\***: Documentation branches

Example:
```bash
# Create feature branch
git checkout -b feat/ai-integration

# Make changes and commit
git commit -m "feat(ai): implement recommendation engine"

# Push to GitHub
git push origin feat/ai-integration

# Create Pull Request on GitHub
```

## Collaboration

### For Team Members
1. Clone the repository
2. Create a branch for their work
3. Commit regularly with clear messages
4. Push to GitHub
5. Create a Pull Request
6. Wait for review and merge

### Code Review Checklist
- [ ] Code follows project style
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No sensitive data in commits
- [ ] Commit messages are clear

## Useful Commands

```bash
# View commit history
git log --oneline

# View changes
git status

# Unstage changes
git reset HEAD filename

# Discard changes
git checkout -- filename

# View remote URLs
git remote -v

# Update from remote
git pull origin main

# Force push (use with caution!)
git push -f origin branch-name
```

## Important Notes

1. **Never commit sensitive data**
   - API keys should be in .env (not tracked)
   - Passwords should be .env variables
   - Use .env.example template

2. **Keep commits atomic**
   - One feature/fix per commit
   - Don't mix multiple changes

3. **Write clear commit messages**
   - First line: brief summary (50 chars)
   - Body: detailed explanation
   - Reference issues when applicable

4. **Push regularly**
   - Don't let changes pile up
   - Easier to resolve conflicts with regular commits

5. **Review before pushing**
   - `git diff` to review changes
   - `git status` to check what's staged

## Setting Up Local Development

```bash
# 1. Fork the repository (if contributing to someone else's project)
# 2. Clone your fork
git clone https://github.com/yourusername/employee-analytics-mern.git

# 3. Add upstream (original repository)
git remote add upstream https://github.com/original/employee-analytics-mern.git

# 4. Create feature branch
git checkout -b feat/your-feature

# 5. Keep fork updated
git fetch upstream
git rebase upstream/main

# 6. Push to your fork
git push origin feat/your-feature

# 7. Create Pull Request on GitHub
```

## Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
