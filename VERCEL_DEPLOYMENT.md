# NALA Personal Loans - Vercel Deployment Guide

This guide explains how to deploy the NALA Personal Loans frontend to Vercel while keeping the backend on Manus hosting.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Vercel (Frontend)                      │
│  https://nala-loans.vercel.app                          │
│  - React/Vite SPA                                        │
│  - Deployed from dist/public folder                      │
│  - Handles all UI and client-side logic                  │
└──────────────────────┬──────────────────────────────────┘
                       │ API Calls
                       │ /api/trpc
                       ▼
┌─────────────────────────────────────────────────────────┐
│              Manus Backend (API Server)                  │
│  https://nalaloans-hjhv9quk.manus.space                 │
│  - Express.js tRPC API                                   │
│  - Database connections                                  │
│  - Authentication & business logic                       │
└─────────────────────────────────────────────────────────┘
```

## Deployment Steps

### 1. Connect Your GitHub Repository to Vercel

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Search for `mandlakevin-creator/NalaLoans`
5. Click "Import"

### 2. Configure Build Settings

In the Vercel project settings:

**Build & Development Settings:**
- **Framework Preset**: Vite
- **Build Command**: `pnpm build`
- **Output Directory**: `dist/public`
- **Install Command**: `pnpm install`

### 3. Set Environment Variables

In Vercel Project Settings → Environment Variables, add:

```
VITE_API_URL=https://nalaloans-hjhv9quk.manus.space
```

This tells the frontend where to send API requests.

### 4. Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be live at `https://nala-loans.vercel.app`

## How It Works

### Frontend (Vercel)
- The React app is built and deployed to Vercel's CDN
- All static files are served from Vercel's edge network
- The app runs entirely in the browser

### API Calls
- When the frontend makes API calls to `/api/trpc`, the `VITE_API_URL` environment variable redirects them to the Manus backend
- The `main.tsx` file contains logic to route API calls:
  ```typescript
  const getApiUrl = () => {
    if (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== window.location.origin) {
      return `${import.meta.env.VITE_API_URL}/api/trpc`;
    }
    return "/api/trpc";
  };
  ```

### Backend (Manus)
- All business logic, authentication, and database operations happen on Manus
- The Manus backend handles:
  - User authentication (Manus OAuth)
  - Loan calculations
  - Eligibility checks
  - Database operations
  - Payment processing (future)

## CORS Configuration

The Manus backend is configured to accept requests from Vercel domains. If you encounter CORS errors:

1. Check that `VITE_API_URL` is correctly set in Vercel
2. Verify the Manus backend is running
3. Check browser console for specific error messages

## Troubleshooting

### Build Fails
- **Issue**: "Cannot find module"
  - **Solution**: Ensure all dependencies are in `package.json`
  - Run `pnpm install` locally and commit the lock file

- **Issue**: TypeScript errors
  - **Solution**: Run `pnpm check` locally to verify
  - Fix any errors before pushing

### API Calls Fail
- **Issue**: 404 errors on `/api/trpc`
  - **Solution**: Verify `VITE_API_URL` is set correctly in Vercel
  - Check that the Manus backend is running

- **Issue**: CORS errors
  - **Solution**: Ensure the backend allows requests from your Vercel domain
  - Check browser console for specific error details

### Blank Page
- **Issue**: Page loads but shows nothing
  - **Solution**: Check browser console for errors
  - Verify the build output contains `index.html`
  - Check that all assets loaded correctly

## Monitoring

### Vercel Dashboard
- Monitor build logs: https://vercel.com/dashboard
- Check deployment history
- View analytics and performance metrics

### Manus Dashboard
- Monitor backend health
- Check database connections
- View API logs

## Updating the Deployment

### When You Push to GitHub
1. Vercel automatically detects changes to the `main` branch
2. It runs the build command: `pnpm build`
3. If successful, it deploys the new version
4. Your site updates automatically

### Manual Redeploy
1. Go to Vercel project dashboard
2. Click "Deployments"
3. Find the deployment you want
4. Click "Redeploy"

## Performance Tips

1. **Monitor Bundle Size**
   - Vercel shows bundle size in deployment logs
   - Current size: ~836KB (JavaScript)
   - Consider code-splitting if it grows

2. **Use Vercel Analytics**
   - Enable Web Analytics in project settings
   - Monitor Core Web Vitals
   - Track user interactions

3. **Cache Strategy**
   - Static assets are cached by Vercel's CDN
   - API responses are not cached (real-time data)

## Rollback

If a deployment breaks:

1. Go to Vercel project dashboard
2. Click "Deployments"
3. Find the previous working deployment
4. Click the three dots → "Promote to Production"

## Next Steps

1. **Stripe Integration**: Add payment processing to the backend
2. **Custom Domain**: Connect a custom domain (e.g., nalaloans.com)
3. **Email Notifications**: Set up email alerts for deployment failures
4. **Analytics**: Enable Vercel Analytics to track user behavior

## Support

For issues:
- **Vercel Support**: https://vercel.com/support
- **Manus Support**: https://help.manus.im
- **GitHub Issues**: Create an issue in the repository

---

**Last Updated**: March 2026
**Frontend**: Vercel (React/Vite)
**Backend**: Manus (Express/tRPC)
**Status**: Production Ready
