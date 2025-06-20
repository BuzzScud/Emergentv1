# Complete Setup Guide for GitHub & Google Cloud Platform

This guide will help you set up your sidebar application for both GitHub repository management and Google Cloud Platform deployment.

## 📋 Prerequisites

- Node.js 18+ installed
- Google Cloud account with billing enabled
- GitHub account
- Git installed locally

## 🚀 GitHub Setup

### 1. Repository Setup

```bash
# If you haven't already, create a new repository on GitHub
# Then connect your local repository:
git remote add origin https://github.com/your-username/sidebar-app.git
git branch -M main
git push -u origin main
```

### 2. GitHub Secrets Configuration

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add these secrets:

#### Required Secrets:
- `GCP_PROJECT_ID`: Your Google Cloud Project ID
- `GCP_SA_KEY`: Service Account JSON key (see Google Cloud setup below)

#### Optional Secrets:
- `NEXT_PUBLIC_API_URL`: Your API endpoint
- `DATABASE_URL`: Database connection string
- `NEXTAUTH_SECRET`: Authentication secret key

### 3. Branch Protection Rules

1. Go to Settings → Branches
2. Add rule for `main` branch:
   - Require pull request reviews
   - Require status checks to pass
   - Require CI to pass before merging

## ☁️ Google Cloud Platform Setup

### 1. Create a New Project

```bash
# Install Google Cloud CLI if not already installed
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Initialize gcloud
gcloud init

# Create new project (optional)
gcloud projects create your-project-id --name="Sidebar App"

# Set project
gcloud config set project your-project-id
```

### 2. Enable Required APIs

```bash
# Enable necessary APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable storage-api.googleapis.com
```

### 3. Create Service Account

```bash
# Create service account
gcloud iam service-accounts create github-actions \
    --display-name="GitHub Actions" \
    --description="Service account for GitHub Actions deployment"

# Get your project ID
PROJECT_ID=$(gcloud config get-value project)

# Grant necessary roles
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/cloudbuild.builds.editor"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"

# Create and download service account key
gcloud iam service-accounts keys create github-actions-key.json \
    --iam-account=github-actions@$PROJECT_ID.iam.gserviceaccount.com
```

### 4. Configure Cloud Build Trigger (Optional)

```bash
# Connect your GitHub repository to Cloud Build
gcloud builds triggers create github \
    --repo-name=sidebar-app \
    --repo-owner=your-github-username \
    --branch-pattern=main \
    --build-config=cloudbuild.yaml
```

## 🔧 Local Development Setup

### 1. Environment Variables

Create a `.env.local` file (never commit this):

```bash
# Copy the example file
cp .env.example .env.local

# Edit with your actual values
nano .env.local
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 🚢 Deployment Options

### Option 1: Automatic GitHub Actions Deployment

1. Push to `main` branch
2. GitHub Actions will automatically:
   - Run tests and linting
   - Build the application
   - Deploy to Google Cloud Run
   - Clean up old container images

### Option 2: Manual Deployment

```bash
# Build and deploy manually
npm run build
gcloud builds submit --config cloudbuild.yaml
```

### Option 3: App Engine Deployment

```bash
# Deploy to App Engine (alternative to Cloud Run)
gcloud app deploy app.yaml
```

## 🔍 Monitoring & Debugging

### View Logs

```bash
# Cloud Run logs
gcloud logs tail --service=sidebar-app

# Cloud Build logs
gcloud builds list
```

### Check Deployment Status

```bash
# Get service URL
gcloud run services describe sidebar-app \
    --region=us-central1 \
    --format='value(status.url)'
```

## 🛡️ Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use GitHub Secrets for sensitive data
- Rotate service account keys regularly

### 2. Service Account Security
- Use principle of least privilege
- Regularly audit IAM permissions
- Enable audit logging

### 3. Application Security
- Keep dependencies updated
- Use HTTPS everywhere
- Implement proper authentication

## 🔄 CI/CD Pipeline

The project includes two GitHub Actions workflows:

1. **CI Pipeline** (`.github/workflows/ci.yml`)
   - Runs on every push and PR
   - Linting and type checking
   - Build verification
   - Security auditing

2. **Google Cloud Deployment** (`.github/workflows/deploy-gcp.yml`)
   - Runs on push to main branch
   - Builds and deploys to Cloud Run
   - Updates deployment status

## 📈 Performance Optimization

### 1. Next.js Configuration
The `next.config.ts` includes:
- Standalone output for containerization
- Image optimization settings
- Security headers
- Performance optimizations

### 2. Docker Optimization
The Dockerfile uses:
- Multi-stage builds
- Alpine Linux for smaller images
- Non-root user for security
- Efficient layer caching

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**: Check Node.js version compatibility
2. **Deployment Timeout**: Increase Cloud Run timeout settings
3. **Permission Denied**: Verify service account roles
4. **Environment Variables**: Ensure secrets are properly set

### Debug Commands

```bash
# Check gcloud configuration
gcloud config list

# Verify service account
gcloud auth list

# Test local build
npm run build

# Check Docker build
docker build -t test-image .
```

## 📞 Support

- Check the [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
- Open an issue for bugs or feature requests
- Review logs for deployment issues

---

🎉 **Congratulations!** Your sidebar application is now ready for professional GitHub and Google Cloud Platform deployment! 