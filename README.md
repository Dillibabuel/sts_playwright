# STS Playwright POM Tests

This project runs one Playwright test suite against local, dev, and prod STS environments.

## Setup

1. Copy `.env.example` to `.env`.
2. Fill `STS_USERNAME`, `STS_PASSWORD`, and your environment URLs.
3. Install dependencies:

```bash
npm install
```

## Run tests

```bash
npm run test:local
npm run test:dev
npm run test:prod
```

All commands run the same POM-based test cases. Only the target URL changes.

## Notes

- `STS_ENV` decides which URL is used (`local`, `dev`, `prod`).
- `STS_BASE_URL` can override everything for ad-hoc runs.
