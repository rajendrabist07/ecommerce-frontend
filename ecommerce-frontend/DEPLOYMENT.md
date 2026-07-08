# Deployment Guide

## Production Deployment Checklist

### Pre-Deployment

- [ ] Environment variables configured in `.env.production.local`
- [ ] All tests passing
- [ ] Build succeeds without warnings
- [ ] No console errors or warnings
- [ ] API endpoints configured and tested
- [ ] SEO meta tags verified in `index.html`
- [ ] Favicon and logo assets in place

### Environment Variables

Create a `.env.local` file with:

```env
VITE_API_URL=https://your-backend-api.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
```

### Vercel Deployment

#### Option 1: Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Option 2: GitHub Integration (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel auto-deploys on every push to main

#### Environment Variables in Vercel

1. Go to Project Settings
2. Navigate to Environment Variables
3. Add your variables:
   - `VITE_API_URL`
   - `VITE_CLOUDINARY_CLOUD_NAME`
   - `VITE_CLOUDINARY_UPLOAD_PRESET`

### Production Build

```bash
npm run build
npm run preview  # Test production build locally
```

### Performance Optimization

- Images are optimized via Cloudinary
- Code splitting enabled automatically
- Lazy loading for routes
- Caching headers configured in `vercel.json`

### Monitoring

- Check Vercel Analytics
- Monitor API performance
- Track user errors via error logging
- Monitor Core Web Vitals

### Troubleshooting

#### 404 Routes

All routes should work because `vercel.json` is configured with SPA rewrites.

#### API Connection Issues

- Verify backend URL in environment variables
- Check CORS headers on backend
- Ensure backend is online (Render free tier may sleep)

#### Image Upload Issues

- Verify Cloudinary credentials
- Check upload preset configuration
- Ensure file size within limits

### Rollback

```bash
# View deployments
vercel list

# Rollback to previous
vercel rollback
```

### Security Headers

Vercel automatically applies security headers configured in `vercel.json`:

- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### SSL/HTTPS

Automatically enabled on all Vercel deployments.

### Domain Configuration

1. Add custom domain in Vercel project settings
2. Update DNS records (instructions provided by Vercel)
3. SSL certificate auto-provisioned

### Support

- Vercel Documentation: https://vercel.com/docs
- GitHub Issues: https://github.com/rajendrabist07/ecommerce-frontend/issues
- Email: rajendra@example.com
