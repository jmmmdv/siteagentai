#!/usr/bin/env bash
# One-time local setup: Postgres (Docker) + schema + owner seed.
# Run from repo root: bash scripts/setup-local.sh

set -euo pipefail

CONTAINER_NAME="siteagentai-db"
DB_USER="siteagent"
DB_PASS="siteagent_dev_2026"
DB_NAME="siteagentai"
WIDGET_KEY="${DEFAULT_BUSINESS_WIDGET_KEY:-58540491-231d-480c-a4a0-600ed2ff136e}"
AUTH_SECRET="${AUTH_SECRET:-$(openssl rand -base64 32)}"
ADMIN_EMAIL="${ADMIN_EMAIL:-owner@demo.siteagentai.local}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-SiteAgentDemo2026!}"

echo "Starting Postgres container..."
if ! docker ps -a --format '{{.Names}}' | grep -qx "$CONTAINER_NAME"; then
  docker run -d --name "$CONTAINER_NAME" \
    -e POSTGRES_USER="$DB_USER" \
    -e POSTGRES_PASSWORD="$DB_PASS" \
    -e POSTGRES_DB="$DB_NAME" \
    -p 5432:5432 \
    postgres:16-alpine
else
  docker start "$CONTAINER_NAME" >/dev/null 2>&1 || true
fi

echo "Waiting for database..."
for _ in $(seq 1 20); do
  if docker exec "$CONTAINER_NAME" pg_isready -U "$DB_USER" -d "$DB_NAME" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

echo "Running schema..."
docker exec -i "$CONTAINER_NAME" psql -U "$DB_USER" -d "$DB_NAME" < scripts/init-db.sql

if [[ ! -f .env.local ]]; then
  cat > .env.local <<EOF
DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}
DATABASE_SSL=false
AUTH_SECRET=${AUTH_SECRET}
DEFAULT_BUSINESS_WIDGET_KEY=${WIDGET_KEY}
ADMIN_EMAIL=${ADMIN_EMAIL}
ADMIN_PASSWORD=${ADMIN_PASSWORD}
ADMIN_NAME=Demo Owner
BUSINESS_NAME=Demo Business
BUSINESS_SLUG=demo
BUSINESS_NOTIFICATION_EMAIL=${ADMIN_EMAIL}
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_ENFORCE_SUBSCRIPTIONS=false
EOF
  echo "Created .env.local"
fi

echo "Seeding owner account..."
export DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}"
export DATABASE_SSL=false
export ADMIN_EMAIL ADMIN_PASSWORD DEFAULT_BUSINESS_WIDGET_KEY="$WIDGET_KEY"
export ADMIN_NAME="Demo Owner" BUSINESS_NAME="Demo Business" BUSINESS_SLUG=demo
export BUSINESS_NOTIFICATION_EMAIL="$ADMIN_EMAIL"
npm run seed:owner

cat <<EOF

========================================
SiteAgentAI local setup complete
========================================
Owner login:  http://localhost:3000/login
Email:        ${ADMIN_EMAIL}
Password:     ${ADMIN_PASSWORD}
Admin:        http://localhost:3000/admin
Widget:       http://localhost:3000/widget/${WIDGET_KEY}
Homepage:     http://localhost:3000

Start app:    npm run dev
========================================
EOF
