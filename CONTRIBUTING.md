# Contributing

SiteAgentAI is currently a private MVP. Keep changes small, focused, and easy to review.

## Local Checks

Before opening a pull request or sharing a branch, run:

```bash
npm ci
npm run lint
npm run test
npm run build
```

## Security

Do not commit real secrets, customer data, database dumps, or production credentials. Use `.env.local` for local development and `.env.production.example` as the production variable checklist.

## Change Style

- Prefer small pull requests.
- Include screenshots for visible UI changes.
- Add tests for validation, billing, auth, and data handling changes.
- Keep migrations and deployment notes explicit.
