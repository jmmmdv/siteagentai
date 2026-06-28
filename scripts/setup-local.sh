#!/usr/bin/env bash
# One-time local setup: Postgres (Docker) + schema + owner seed.
# Run from repo root: bash scripts/setup-local.sh

set -euo pipefail

CONTAINER_NAME="siteagentai-db"
DB_USER="siteagent"
DB_NAME="siteagentai"

read_env_value() {
  local key="$1"
  if [[ -f .env.local ]]; then
    awk -F= -v key="$key" '$1 == key { sub(/^[^=]*=/, ""); print; exit }' .env.local
  fi
}

generate_password() {
  openssl rand -hex 24 | tr -d '\n'
}

generate_widget_key() {
  node -e "console.log(require('crypto').randomUUID())"
}

container_exists() {
  docker ps -a --format '{{.Names}}' | grep -qx "$CONTAINER_NAME"
}

container_is_ready() {
  docker exec "$CONTAINER_NAME" pg_isready -U "$DB_USER" -d "$DB_NAME" >/dev/null 2>&1
}

database_auth_works() {
  docker exec -e PGPASSWORD="$DB_PASS" "$CONTAINER_NAME" \
    psql -h 127.0.0.1 -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1" >/dev/null 2>&1
}

extract_database_password() {
  local database_url="$1"
  node -e "try { const url = new URL(process.argv[1]); console.log(decodeURIComponent(url.password)); } catch {}" "$database_url"
}

is_local_database_url() {
  local database_url="$1"
  node -e "try { const host = new URL(process.argv[1]).hostname; process.exit(['localhost', '127.0.0.1', '::1'].includes(host) ? 0 : 1); } catch { process.exit(1); }" "$database_url"
}

EXISTING_ADMIN_EMAIL="$(read_env_value ADMIN_EMAIL)"
EXISTING_ADMIN_PASSWORD="$(read_env_value ADMIN_PASSWORD)"
EXISTING_WIDGET_KEY="$(read_env_value DEFAULT_BUSINESS_WIDGET_KEY)"
EXISTING_DATABASE_URL="$(read_env_value DATABASE_URL)"
EXISTING_DB_PASS=""

if [[ -n "$EXISTING_DATABASE_URL" ]]; then
  if ! is_local_database_url "$EXISTING_DATABASE_URL"; then
    echo "Refusing to run local Docker setup with a non-local DATABASE_URL in .env.local."
    echo "Use the manual setup steps for hosted databases."
    exit 1
  fi
  EXISTING_DB_PASS="$(extract_database_password "$EXISTING_DATABASE_URL")"
fi

DB_PASS="${LOCAL_DB_PASSWORD:-${EXISTING_DB_PASS:-$(generate_password)}}"
LOCAL_DATABASE_URL="${DATABASE_URL:-${EXISTING_DATABASE_URL:-postgresql://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}}}"
WIDGET_KEY="${DEFAULT_BUSINESS_WIDGET_KEY:-${EXISTING_WIDGET_KEY:-$(generate_widget_key)}}"
AUTH_SECRET="${AUTH_SECRET:-$(openssl rand -base64 32)}"
ADMIN_EMAIL="${ADMIN_EMAIL:-${EXISTING_ADMIN_EMAIL:-owner@demo.siteagentai.local}}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-${EXISTING_ADMIN_PASSWORD:-$(generate_password)}}"

if ! is_local_database_url "$LOCAL_DATABASE_URL"; then
  echo "Refusing to run local Docker setup with a non-local DATABASE_URL."
  echo "Unset DATABASE_URL or use the manual setup steps for hosted databases."
  exit 1
fi

DB_PASS="$(extract_database_password "$LOCAL_DATABASE_URL")"
if [[ -z "$DB_PASS" ]]; then
  echo "Unable to read the password from the local DATABASE_URL."
  echo "Check .env.local or unset DATABASE_URL and run this script again."
  exit 1
fi

echo "Starting Postgres container..."
if ! container_exists; then
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
  if container_is_ready; then
    break
  fi
  sleep 1
done

if ! container_is_ready; then
  echo "Local Postgres did not become ready with the credentials in .env.local."
  echo "If you deleted or regenerated .env.local, remove the old Docker container and rerun:"
  echo "  docker rm -f ${CONTAINER_NAME}"
  exit 1
fi

if ! database_auth_works; then
  echo "Local Postgres is running, but the password in the local DATABASE_URL does not match it."
  echo "This can happen if .env.local was deleted or regenerated while the old Docker container still exists."
  echo "To start fresh, remove the old local container and rerun:"
  echo "  docker rm -f ${CONTAINER_NAME}"
  exit 1
fi

echo "Running schema..."
docker exec -i "$CONTAINER_NAME" psql -U "$DB_USER" -d "$DB_NAME" < scripts/init-db.sql

if [[ ! -f .env.local ]]; then
  cat > .env.local <<EOF
DATABASE_URL=${LOCAL_DATABASE_URL}
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
  chmod 600 .env.local
  echo "Created .env.local with generated local-only credentials."
else
  echo ".env.local already exists; keeping existing local credentials."
fi

echo "Seeding owner account..."
export DATABASE_URL="$LOCAL_DATABASE_URL"
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
Password:     stored in .env.local as ADMIN_PASSWORD
Admin:        http://localhost:3000/admin
Widget:       http://localhost:3000/widget/${WIDGET_KEY}
Homepage:     http://localhost:3000

Start app:    npm run dev
========================================
EOF
