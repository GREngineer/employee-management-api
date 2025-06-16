# CI/CD Pipeline Documentation

## Overview

This project uses GitHub Actions for Continuous Integration and Continuous Deployment. The CI/CD pipeline automatically runs tests, security checks, and build verification on every push and pull request.

## Pipeline Configuration

### Trigger Events
- **Push** to `develop` (main branch)
- **Pull Request** to `develop`

### Workflow File
- **Location**: `.github/workflows/ci.yml`
- **Name**: Employee Management API CI

## Pipeline Jobs

### 1. Test Job
**Purpose**: Run all tests and generate coverage reports

**Steps**:
1. **Checkout**: Clone the repository to a clean VM
2. **Setup Node.js**: Install Node.js (16.x, 18.x, 20.x)
3. **Install Dependencies**: Run `npm ci` (express, jest etc)
4. **Run Tests**: Execute all test suites `npm test`
5. **Coverage Report**: Generate coverage with `npm run test:coverage`
6. **Coverage Check**: Ensure coverage is above 90%

**Matrix Strategy**:
- Tests run on multiple Node.js versions for compatibility
- Ensures the code works across different Node.js environments

### 2. Security Job
**Purpose**: Perform security audits and vulnerability checks

**Steps**:
1. **Checkout**: Clone the repository
2. **Setup Node.js**: Install Node.js 18.x
3. **Install Dependencies**: Run `npm ci`
4. **Security Audit**: Run `npm audit --audit-level=moderate` (outdated packages with known vulnerabilities etc.)
5. **High Severity Check**: Fail if high severity vulnerabilities found (remote code execution in package, SQL injection in dB package etc.)

**Security Levels**:
- **Moderate**: Warnings for moderate vulnerabilities
- **High**: Pipeline fails for high severity vulnerabilities

### 3. Build Job
**Purpose**: Verify application startup and create deployment packages

**Steps**:
1. **Checkout**: Clone the repository
2. **Setup Node.js**: Install Node.js 18.x
3. **Install Dependencies**: Run `npm ci`
4. **Application Verification**: Test if the app starts successfully
5. **Create Package**: Build deployment artifacts in `dist/` folder
6. **Upload Artifacts**: Store deployment package for 30 days

### 4. Deploy Production Job
**Purpose**: Deploy the application to production environment

**Steps**:
1. **Checkout**: Clone the repository
2. **Setup Node.js**: Install Node.js 18.x
3. **Install Dependencies**: Run `npm ci`
4. **Deploy**: Deploy the application to production (currently simulated)

**Deployment Trigger**:
- Only runs when pushing to `develop` branch
- Requires all previous jobs (test, security, build) to pass

## Coverage Requirements

### Current Coverage
- **Overall**: 98.5%
- **Statements**: 98.52%
- **Branches**: 96%
- **Functions**: 95.65%
- **Lines**: 98.48%

### Minimum Requirements
- **Minimum Coverage**: 90%
- **Coverage Check**: Automated in CI pipeline
- **Failure**: Pipeline fails if coverage drops below 90%

## Security Checks

### npm Audit
- **Purpose**: Check for known vulnerabilities in dependencies
- **Level**: Moderate and High severity checks
- **Action**: Pipeline fails on high severity vulnerabilities

### Dependency Management
- **Lock File**: Uses `package-lock.json` for consistent installs
- **CI Install**: Uses `npm ci` for faster, reliable installs
- **Cache**: GitHub Actions caches node_modules for faster builds

## Build Artifacts

### Deployment Package (`dist/` folder)
- **Purpose**: Clean, production-ready package for deployment
- **Location**: `dist/` directory (created during CI build)
- **Contents**: 
  - `controllers/` - All controller files
  - `middlewares/` - All middleware files
  - `models/` - All model files
  - `routes/` - All route files
  - `server.js` - Main application file
  - `package.json` - Dependencies and scripts
- **Excluded**: `node_modules/`, `tests/`, `coverage/`, `.git/`, etc.
- **Retention**: 30 days in GitHub Actions artifacts
- **Download**: Available in GitHub Actions artifacts section

### Why `dist/` folder?
- **Clean deployment**: Only includes files needed for production
- **Security**: Excludes test files, configuration files, and development tools
- **Size optimization**: Smaller package for faster deployments
- **Consistency**: Same structure across all deployments

## Local Development

### Pre-commit Checklist
Before pushing code, ensure:
1. All tests pass locally (`npm test`)
2. Coverage is above 90% (`npm run test:coverage`)
3. No security vulnerabilities (`npm audit`)
4. Application starts successfully (`npm start`)

### Running CI Locally
```bash
# Install dependencies
npm ci

# Run tests
npm test

# Check coverage
npm run test:coverage

# Security audit
npm audit

# Verify startup
npm start
```

### Creating dist/ folder locally (optional)
```bash
# Create dist/ folder manually (same as CI)
mkdir -p dist
cp -r controllers middlewares models routes server.js package.json dist/
```

## Deployment Process

### Current Setup
- **Environment**: Production deployment is currently simulated
- **Trigger**: Automatic deployment on successful CI pipeline
- **Branch**: Only deploys from `develop` branch
- **Approval**: No manual approval required

### Viewing CI Results:

1. Go to GitHub repository
2. Click on the "Actions" tab
3. View the latest workflow run
4. Check individual job results and logs


