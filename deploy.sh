#!/bin/bash

# Google Cloud Deployment Script for Sidebar App
# Usage: ./deploy.sh [project-id] [deployment-type]
# deployment-type: appengine or cloudrun (default: cloudrun)

set -e

PROJECT_ID=${1:-"your-project-id"}
DEPLOYMENT_TYPE=${2:-"cloudrun"}
SERVICE_NAME="sidebar-app"
REGION="us-central1"

echo "🚀 Starting deployment process..."
echo "Project ID: $PROJECT_ID"
echo "Deployment Type: $DEPLOYMENT_TYPE"
echo "Service Name: $SERVICE_NAME"
echo "Region: $REGION"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI is not installed. Please install it first."
    exit 1
fi

# Set the project
echo "📋 Setting Google Cloud project..."
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

if [ "$DEPLOYMENT_TYPE" = "appengine" ]; then
    gcloud services enable appengine.googleapis.com
fi

# Build the application
echo "🏗️ Building the application..."
npm install
npm run build

if [ "$DEPLOYMENT_TYPE" = "appengine" ]; then
    echo "🚀 Deploying to App Engine..."
    gcloud app deploy app.yaml --quiet --promote
    echo "✅ Deployment completed!"
    echo "🌐 Your app is available at: https://$PROJECT_ID.appspot.com"
    
elif [ "$DEPLOYMENT_TYPE" = "cloudrun" ]; then
    echo "🚀 Deploying to Cloud Run..."
    
    # Build and push the container
    IMAGE_URL="gcr.io/$PROJECT_ID/$SERVICE_NAME"
    
    echo "🐳 Building Docker image..."
    docker build -t $IMAGE_URL .
    
    echo "📤 Pushing image to Container Registry..."
    docker push $IMAGE_URL
    
    echo "☁️ Deploying to Cloud Run..."
    gcloud run deploy $SERVICE_NAME \
        --image $IMAGE_URL \
        --platform managed \
        --region $REGION \
        --allow-unauthenticated \
        --port 3000 \
        --memory 512Mi \
        --cpu 1 \
        --max-instances 10 \
        --quiet
    
    echo "✅ Deployment completed!"
    SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")
    echo "🌐 Your app is available at: $SERVICE_URL"
    
else
    echo "❌ Error: Invalid deployment type. Use 'appengine' or 'cloudrun'"
    exit 1
fi

echo "🎉 Deployment process completed successfully!" 