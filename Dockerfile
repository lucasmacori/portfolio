# ============================================================
# Stage 1 — deps
# Install production dependencies only
# ============================================================
FROM node:22-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci


# ============================================================
# Stage 2 — builder
# Build the Next.js application
# ============================================================
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Secrets are injected at runtime via K8S — use a placeholder
# so the build succeeds without the real value
ENV N8N_PORTFOLIO_AUTH=build-placeholder

RUN npm run build


# ============================================================
# Stage 3 — runner
# Minimal production image using Next.js standalone output
# ============================================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy only what Next.js standalone needs to run
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
