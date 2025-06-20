# Google Cloud Deployment Guide

This guide provides step-by-step instructions for deploying the Sidebar App to Google Cloud Platform.

## Prerequisites

1. **Google Cloud Account**: Ensure you have a Google Cloud account with billing enabled
2. **Google Cloud CLI**: Install the `gcloud` CLI tool
3. **Docker**: Install Docker for containerized deployments
4. **Node.js**: Version 20 or higher

## Installation Steps

### 1. Install Google Cloud CLI

```bash
# macOS
brew install --cask google-cloud-sdk

# Windows
# Download and install from: https://cloud.google.com/sdk/docs/install

# Linux
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### 2. Authentication

```bash
# Login to Google Cloud
gcloud auth login

# Set up application default credentials
gcloud auth application-default login
```

### 3. Create Google Cloud Project

```bash
# Create a new project (optional)
gcloud projects create your-project-id --name="Sidebar App"

# Set the project
gcloud config set project your-project-id
```

## Deployment Options

### Option 1: Cloud Run (Recommended)

Cloud Run is serverless, scales to zero, and handles traffic automatically.

#### Quick Deploy

```bash
# Make the deployment script executable
chmod +x deploy.sh

# Deploy to Cloud Run
./deploy.sh your-project-id cloudrun
```

#### Manual Deploy

```bash
# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build and deploy
gcloud builds submit --tag gcr.io/your-project-id/sidebar-app
gcloud run deploy sidebar-app --image gcr.io/your-project-id/sidebar-app --platform managed --region us-central1 --allow-unauthenticated
```

### Option 2: App Engine

App Engine provides a fully managed platform with automatic scaling.

#### Quick Deploy

```bash
# Deploy to App Engine
./deploy.sh your-project-id appengine
```

#### Manual Deploy

```bash
# Enable App Engine API
gcloud services enable appengine.googleapis.com

# Create App Engine application (first time only)
gcloud app create --region=us-central

# Deploy
gcloud app deploy app.yaml
```

### Option 3: Cloud Build (CI/CD)

For automated deployments triggered by Git commits.

```bash
# Connect to your repository
gcloud builds triggers create github \
    --repo-name=your-repo \
    --repo-owner=your-username \
    --branch-pattern="^main$" \
    --build-config=cloudbuild.yaml
```

## Configuration Files

### app.yaml (App Engine)
- Configured for Node.js 20 runtime
- Automatic scaling enabled
- Static file handling optimized

### Dockerfile (Cloud Run/Kubernetes)
- Multi-stage build for optimization
- Production-ready configuration
- Security best practices implemented

### cloudbuild.yaml (Cloud Build)
- Automated build and deployment
- Container image optimization
- Cloud Run deployment included

## Environment Variables

Set environment variables for production:

```bash
# For Cloud Run
gcloud run services update sidebar-app \
    --set-env-vars="NODE_ENV=production,NEXT_TELEMETRY_DISABLED=1" \
    --region=us-central1

# For App Engine
# Add to app.yaml:
env_variables:
  NODE_ENV: production
  NEXT_TELEMETRY_DISABLED: 1
```

## Custom Domain Setup

### Cloud Run

```bash
# Map custom domain
gcloud run domain-mappings create --service sidebar-app --domain your-domain.com --region us-central1
```

### App Engine

```bash
# Map custom domain
gcloud app domain-mappings create your-domain.com
```

## Monitoring and Logging

### Enable Cloud Monitoring

```bash
gcloud services enable monitoring.googleapis.com
gcloud services enable logging.googleapis.com
```

### View Logs

```bash
# Cloud Run logs
gcloud run services logs read sidebar-app --region=us-central1

# App Engine logs
gcloud app logs tail -s default
```

## Cost Optimization

### Cloud Run
- **Free Tier**: 2 million requests/month
- **Scaling**: Automatically scales to zero
- **Billing**: Pay per request and CPU time

### App Engine
- **Free Tier**: 28 instance hours/day
- **Auto Scaling**: Configurable instance limits
- **Billing**: Pay per instance hour

## Security Considerations

1. **IAM Permissions**: Use principle of least privilege
2. **VPC**: Consider VPC integration for sensitive data
3. **HTTPS**: Automatically enabled on Google Cloud
4. **Secrets**: Use Secret Manager for sensitive configuration

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs
   gcloud builds log [BUILD_ID]
   ```

2. **Memory Issues**
   ```bash
   # Increase memory for Cloud Run
   gcloud run services update sidebar-app --memory 1Gi --region us-central1
   ```

3. **Cold Starts**
   ```bash
   # Set minimum instances for Cloud Run
   gcloud run services update sidebar-app --min-instances 1 --region us-central1
   ```

### Health Checks

The app includes built-in health monitoring. Access at:
- `/api/health` - Basic health check
- Debug panel available in development mode

## Performance Optimization

1. **Image Optimization**: Next.js images are configured for unoptimized mode
2. **Caching**: Static assets are cached automatically
3. **Compression**: Enabled by default on Google Cloud
4. **CDN**: Cloud CDN can be enabled for global distribution

## Support

For deployment issues:
1. Check Google Cloud Status: https://status.cloud.google.com/
2. Review build logs: `gcloud builds list`
3. Monitor application logs through Cloud Console
4. Use Cloud Shell for debugging: https://shell.cloud.google.com/

## Next Steps

After successful deployment:
1. Set up monitoring and alerting
2. Configure backup strategies
3. Implement CI/CD pipeline
4. Set up staging environment
5. Configure custom domain and SSL 

# Add the GitHub repository as remote origin (SSH)
git remote add origin git@github.com:BuzzScud/emergent-fortuity.git

# Push the code to GitHub
git push -u origin main 