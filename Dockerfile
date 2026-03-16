# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# ตั้งค่า npm
RUN npm config set fetch-timeout 120000 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit --progress=false

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy standalone build (includes node_modules and server.js)
COPY --from=builder /app/.next/standalone ./

# Copy static assets (not included in standalone)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]