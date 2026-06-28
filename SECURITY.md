# Security Policy

## Reporting a Vulnerability

If you find a security issue in SiteAgentAI, please do not open a public issue with exploit details.

Email: info@jlobglobal.com

Include:

- A short description of the issue
- The affected route, file, or feature
- Steps to reproduce if safe to share
- Any relevant screenshots or logs with secrets removed

## Secret Handling

Never commit real values for:

- `DATABASE_URL`
- `AUTH_SECRET`
- API keys
- Stripe secrets or webhook secrets
- Passwords or private keys

Use `.env.local` for local development and hosting-provider environment variables for production.

## Current Security Notes

This project includes basic input validation, lead submission throttling, security headers, password hashing, and Stripe webhook signature verification. For production use, add provider-backed rate limiting, monitoring, backups, and a formal incident response process.

## Supported Status

SiteAgentAI is currently an MVP. Security reports are welcome, but production support timelines are not guaranteed until the project moves beyond pilot/demo status.
