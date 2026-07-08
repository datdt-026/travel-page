# ========================================
# PayloadCMS Dockerfile
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
COPY apps/cms/package.json ./apps/cms/

# Install dependencies
RUN pnpm install --frozen-lockfile --prod=false

# Stage 2: Builder
FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/cms/node_modules ./apps/cms/node_modules

# Copy source code
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY apps/cms ./apps/cms

ARG PAYLOAD_PUBLIC_SERVER_URL
ARG PAYLOAD_SECRET

ENV PAYLOAD_PUBLIC_SERVER_URL=$PAYLOAD_PUBLIC_SERVER_URL
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET

# Build the CMS
WORKDIR /app/apps/cms
ENV NODE_ENV=production
ENV CI=true
RUN pnpm build

# Stage 3: Runner
FROM node:18-alpine AS runner
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

ENV NODE_ENV=production
ENV CI=true

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 payload

# Copy built files
COPY --from=builder /app/apps/cms/dist ./apps/cms/dist
COPY --from=builder /app/apps/cms/build ./apps/cms/build
COPY --from=builder /app/apps/cms/package.json ./apps/cms/
COPY --from=builder /app/apps/cms/node_modules ./apps/cms/node_modules
COPY --from=builder /app/node_modules ./node_modules

# Copy migrations if exists
COPY --from=builder /app/apps/cms/src/migrations ./apps/cms/src/migrations

# Create media directory
RUN mkdir -p /app/apps/cms/media && chown -R payload:nodejs /app/apps/cms/media

USER payload

WORKDIR /app/apps/cms

EXPOSE 3005

ENV PORT=3005
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

CMD ["node", "dist/server.js"]
