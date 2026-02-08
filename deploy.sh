#!/bin/bash

# EnterpriseDrive Firebase File Uploader - Deployment Script
# Usage: ./deploy.sh [vercel|netlify|firebase]

set -e

PROJECT_NAME="38-tool-firebase-file-uploader"

case "${1:-vercel}" in
  vercel)
    echo "🚀 Deploying to Vercel..."
    npx vercel --prod
    ;;
  netlify)
    echo "🚀 Deploying to Netlify..."
    npx netlify deploy --prod --dir=dist
    ;;
  firebase)
    echo "🚀 Deploying to Firebase Hosting..."
    npx firebase deploy --only hosting
    ;;
  *)
    echo "Usage: ./deploy.sh [vercel|netlify|firebase]"
    exit 1
    ;;
esac

echo "✅ Deployment complete!"
echo "🌐 Live URL will be provided by the deployment platform."
