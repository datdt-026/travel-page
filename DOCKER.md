# Docker Deployment Guide

## Files Created

```
travel/
├── docker-compose.yml          # Main production compose
├── docker-compose.dev.yml      # Development (only PostgreSQL)
├── .dockerignore               # Docker build ignore patterns
├── .env.docker.example         # Environment variables template
├── nginx/
│   └── nginx.conf              # Nginx reverse proxy config
└── apps/
    ├── cms/
    │   └── Dockerfile          # PayloadCMS Dockerfile
    └── web/
        └── Dockerfile          # Next.js Dockerfile
```

## Quick Start

### 1. Setup Environment

```bash
# Copy environment template
cp .env.docker.example .env

# Edit .env and update:
# - POSTGRES_PASSWORD (use a strong password)
# - PAYLOAD_SECRET (min 32 characters)
# - Domain URLs for production
```

### 2. Build and Run

```bash
# Build all images
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### 3. Initialize Database

```bash
# Run migrations (first time)
docker-compose exec cms node -e "require('./dist/payload.config.js')"

# Or seed sample data
docker-compose exec cms pnpm seed
```

### 4. Access Services

- **Frontend**: http://localhost:3000
- **CMS Admin**: http://localhost:3001/admin
- **CMS API**: http://localhost:3001/api

## Production Deployment

### With Nginx (recommended for production)

```bash
# Start with nginx profile
docker-compose --profile production up -d
```

### SSL/HTTPS Setup

1. Get SSL certificates (e.g., Let's Encrypt):
```bash
certbot certonly --standalone -d yourdomain.com -d cms.yourdomain.com
```

2. Copy certificates:
```bash
mkdir -p nginx/ssl
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/
```

3. Uncomment SSL lines in `nginx/nginx.conf`

4. Update `docker-compose.yml` with production URLs

### Environment for Production

```bash
# .env for production
POSTGRES_USER=travel_user
POSTGRES_PASSWORD=super_secure_password_123!
POSTGRES_DB=travel_cms

PAYLOAD_SECRET=your-32-character-secret-key-here-minimum

PAYLOAD_PUBLIC_SERVER_URL=https://cms.yourdomain.com
NEXT_PUBLIC_CMS_URL=https://cms.yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Commands

### Manage Containers

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Rebuild specific service
docker-compose build cms
docker-compose up -d cms

# View logs
docker-compose logs -f web
docker-compose logs -f cms

# Execute command in container
docker-compose exec cms sh
docker-compose exec web sh

# Restart service
docker-compose restart cms
```

### Database Management

```bash
# Backup database
docker-compose exec postgres pg_dump -U postgres travel_cms > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres travel_cms < backup.sql

# Access PostgreSQL shell
docker-compose exec postgres psql -U postgres travel_cms
```

### Cleanup

```bash
# Remove containers and volumes (WARNING: deletes data)
docker-compose down -v

# Remove unused images
docker image prune -a

# Full cleanup
docker system prune -a --volumes
```

## Troubleshooting

### CMS not starting
```bash
# Check logs
docker-compose logs cms

# Verify database connection
docker-compose exec cms sh
nc -zv postgres 5432
```

### Build fails
```bash
# Clean rebuild
docker-compose build --no-cache

# Check disk space
df -h
```

### Permission issues
```bash
# Fix media folder permissions
docker-compose exec cms chown -R payload:nodejs /app/apps/cms/media
```

### Network issues between containers
```bash
# Verify network
docker network ls
docker network inspect travel_travel-network

# Test connectivity
docker-compose exec web ping cms
```

## Development Mode

For local development, only run PostgreSQL in Docker:

```bash
# Start only PostgreSQL
docker-compose -f docker-compose.dev.yml up -d

# Run apps locally
pnpm dev:cms  # Terminal 1
pnpm dev:web  # Terminal 2
```

## Resource Limits (Optional)

Add to docker-compose.yml for production:

```yaml
services:
  cms:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
  
  web:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

## Health Checks

All services have health checks configured:

- **PostgreSQL**: `pg_isready` command
- **CMS**: `GET /health`
- **Web**: `GET /api/health`

```bash
# Check health status
docker-compose ps
docker inspect travel-cms --format='{{.State.Health.Status}}'
```
