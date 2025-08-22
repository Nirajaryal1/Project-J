# Deployment

## GitHub → Firebase Hosting
1. Create `FIREBASE_SERVICE_ACCOUNT` and `FIREBASE_PROJECT_ID` as GitHub Secrets.
2. Push to `main` to trigger `Deploy` workflow (see `.github/workflows/deploy.yml`).

## Manual
```bash
pnpm build
firebase deploy
```
