# Vercel Deployment Guide

This project has been configured for deployment on Vercel. Follow these steps to deploy your application.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect this as a Next.js project
5. Configure environment variables (see below)
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

## Environment Variables

Set up the following environment variables in your Vercel project settings:

### Required Variables
- `DB_HOST` - Your database host
- `DB_USER` - Your database username
- `DB_PASSWORD` - Your database password
- `DB_NAME` - Your database name (default: kalro_knowledge_hub)

### Optional Variables
- `JWT_SECRET` - Secret key for JWT tokens
- `NEXT_PUBLIC_APP_URL` - Your app's URL (auto-set by Vercel)
- `NEXT_TELEMETRY_DISABLED` - Set to `1` to disable Next.js telemetry

## Database Setup

Make sure your database is accessible from Vercel's servers. Popular options include:

- **PlanetScale** - MySQL-compatible serverless database
- **Supabase** - PostgreSQL with real-time features
- **Railway** - Simple database hosting
- **AWS RDS** - Amazon's managed database service

## Post-Deployment

1. Test all API endpoints
2. Verify database connections
3. Check that all environment variables are properly set
4. Test the authentication flow (if applicable)

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Ensure your database allows connections from Vercel's IP ranges
   - Check that environment variables are correctly set

2. **Build Errors**
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are listed in package.json

3. **API Route Issues**
   - Verify that API routes are in the correct directory structure
   - Check for any hardcoded localhost URLs

### Getting Help

- Check Vercel's documentation: [vercel.com/docs](https://vercel.com/docs)
- Review build logs in the Vercel dashboard
- Check the browser console for client-side errors

## Performance Optimization

The project is already configured with several Vercel optimizations:

- Automatic code splitting
- Edge functions for API routes
- Image optimization
- Static generation where possible

## Custom Domain (Optional)

To use a custom domain:

1. Go to your project settings in Vercel
2. Navigate to the "Domains" tab
3. Add your custom domain
4. Follow the DNS configuration instructions
