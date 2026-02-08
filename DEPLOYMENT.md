# Production Deployment (Vercel)

## Prerequisites
- Vercel account and an existing Vercel project
- GitHub repository for this codebase
- Vercel token, org ID, and project ID

## Recommended Setup: Native Vercel GitHub Connection
If your GitHub repository (e.g., cafesuncity77/amrit-wp-nextjs) is already connected to Vercel:
- Push to `main` to trigger an automatic deployment
- Configure Environment Variables in the Vercel Dashboard (Project Settings → Environment Variables)
- Use “Deployments” tab in Vercel to trigger a redeploy when needed

## Alternative Setup: GitHub Actions with Vercel CLI
Only needed if you prefer CI-managed deploys with tokens. In that case, add these repository secrets in GitHub → Settings → Secrets and variables → Actions:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Then create a workflow that:
- Pulls Vercel env and links the project
- Builds with `vercel build`
- Deploys with `vercel deploy --prebuilt --prod`

## Steps
1. Create a GitHub repo and push this code
2. In Vercel, create or select your project
3. Get the token, org ID, and project ID from Vercel
4. Add the three secrets to the GitHub repo (only for Actions-based deploys)
5. Push to `main` to trigger deployment (either native or Actions-based)

## Notes
- Build uses `npm ci` and Node 20
- Uses `vercel.json` (version 2)
- Next.js images are configured in `next.config.mjs`
