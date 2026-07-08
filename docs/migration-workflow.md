# Payload CMS Migration Workflow

## Overview

This document describes the production-grade migration workflow for the Travel CMS monorepo.

**Key Principle**: Migrations are NEVER run inside the dev loop. They are always a separate, explicit step.

---

## Environment Variables

| Variable | Purpose | When to Use |
|----------|---------|-------------|
| `CI=true` | Skips interactive prompts, applies only safe migrations | Always in dev/staging/prod |
| `PAYLOAD_DROP_DATABASE=true` | Allows destructive operations (truncate/drop) | ONLY for local reset |

---

## Local Development Workflow

### First-time setup or after schema changes:

```bash
# 1. Check current migration status
pnpm migrate:cms:status

# 2. Run migrations interactively (if you need to handle prompts)
pnpm migrate:cms

# 3. Start development (will NOT prompt - CI=true is set)
pnpm dev:cms
```

### After pulling new code with schema changes:

```bash
# 1. Stop dev server (Ctrl+C)
# 2. Run migrations
pnpm migrate:cms

# 3. Restart dev
pnpm dev:cms
```

### Creating a new migration:

```bash
# Generate a blank migration file
pnpm migrate:cms:create
# This creates a timestamped file in apps/cms/src/migrations/
```

### Resetting local database (DESTRUCTIVE):

```bash
# This will DROP all tables and re-run migrations
pnpm --filter @travel/cms migrate:reset
# ⚠️ NEVER run this in staging/production
```

---

## CI/CD Pipeline Workflow

### Staging Deployment

```yaml
# Example GitHub Actions / GitLab CI step
- name: Run Migrations
  run: pnpm migrate:cms:ci
  env:
    DATABASE_URL: ${{ secrets.STAGING_DATABASE_URL }}
    CI: true

- name: Start Server
  run: pnpm start:cms
```

### Production Deployment

```yaml
# 1. Run migrations as a separate job BEFORE deployment
- name: Run Migrations
  run: pnpm migrate:cms:ci
  env:
    DATABASE_URL: ${{ secrets.PROD_DATABASE_URL }}
    CI: true

# 2. Deploy application (migrations already complete)
- name: Deploy
  run: pnpm start:cms
```

---

## Script Reference

### Root `package.json`

| Script | Purpose |
|--------|---------|
| `pnpm migrate:cms` | Interactive migrations (local dev) |
| `pnpm migrate:cms:ci` | Non-interactive migrations (CI/CD) |
| `pnpm migrate:cms:status` | Check pending migrations |
| `pnpm migrate:cms:create` | Create new migration file |
| `pnpm dev:cms` | Start dev server (no prompts) |
| `pnpm start:cms` | Start production server |

### CMS `package.json` (apps/cms)

| Script | Purpose |
|--------|---------|
| `migrate` | Run migrations with interactive prompts |
| `migrate:ci` | Run migrations without prompts (CI=true) |
| `migrate:status` | Show migration status |
| `migrate:create` | Generate new migration file |
| `migrate:down` | Rollback last migration |
| `migrate:reset` | ⚠️ DROP database and re-migrate (local only) |
| `dev` | Dev server with CI=true (no prompts) |
| `dev:unsafe` | Dev server WITHOUT CI=true (allows prompts) |

---

## Handling Destructive Migrations

When a migration requires destructive operations (e.g., adding unique constraint to column with duplicates):

### Local Development

1. **Stop the dev server**
2. **Run migration interactively**:
   ```bash
   pnpm migrate:cms
   ```
3. **Choose the appropriate option** when prompted (e.g., truncate, skip, etc.)
4. **Restart dev server**

### Staging/Production

**NEVER** allow interactive prompts in staging/production. Instead:

1. **Test the migration locally first**
2. **Write a data migration script** if data cleanup is needed:
   ```typescript
   // apps/cms/src/migrations/20260102_cleanup_duplicates.ts
   export async function up({ payload }) {
     // Clean up duplicate data BEFORE the schema migration
     await payload.db.raw(`
       DELETE FROM cities a USING cities b 
       WHERE a.id < b.id AND a.slug = b.slug
     `);
   }
   ```
3. **Run migrations in CI** with `pnpm migrate:cms:ci`

---

## Troubleshooting

### "Cannot prompt in non-interactive mode"

This means a migration requires a destructive action. Solutions:

1. Run `pnpm migrate:cms` locally to handle the prompt
2. Write a data migration to fix the underlying issue
3. For staging: temporarily run with `dev:unsafe` (NOT recommended)

### Migration fails in CI

1. Check `pnpm migrate:cms:status` to see pending migrations
2. Review migration files for destructive operations
3. Test locally with `pnpm migrate:cms` first

### Nodemon keeps restarting during migrations

The nodemon config ignores `src/migrations/*`. If issues persist:
- Migrations should NOT be run inside nodemon
- Use `pnpm migrate:cms` separately

---

## Best Practices Checklist

- [ ] Never run migrations inside `pnpm dev`
- [ ] Always run `pnpm migrate:cms` before `pnpm dev:cms` after schema changes
- [ ] Use `CI=true` in all automated environments
- [ ] Never use `PAYLOAD_DROP_DATABASE=true` outside local dev
- [ ] Commit all migration files to git
- [ ] Test migrations locally before merging
- [ ] Use `migrate:ci` in CI/CD pipelines
- [ ] Run migrations as a separate deployment step, not during server startup
