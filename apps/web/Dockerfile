# ========================================
# Next.js Frontend Dockerfile
# Multi-stage build for production
# ========================================

# Stage 1: Dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Copy workspace config files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN pnpm install --frozen-lockfile --prod=false

# Stage 2: Builder
FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Build arguments for Next.js
ARG NEXT_PUBLIC_CMS_URL
ARG NEXT_PUBLIC_SITE_URL

ENV NEXT_PUBLIC_CMS_URL=$NEXT_PUBLIC_CMS_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules

# Copy source code
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY apps/web ./apps/web

# Build the Next.js app
WORKDIR /app/apps/web
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Skip build-time data fetching for static generation
ENV NEXT_SKIP_DATA_FETCH=true

RUN pnpm build

# Stage 3: Runner
FROM node:18-alpine AS runner
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/apps/web/public ./apps/web/public

# Copy standalone build
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

WORKDIR /app/apps/web

EXPOSE 3004

ENV PORT=3004
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
