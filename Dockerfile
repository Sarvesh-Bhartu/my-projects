# Dockerfile for Next.js application

# 1. Base Stage: Use a specific Node.js version
FROM node:18-alpine AS base

# 2. Dependencies Stage: Install dependencies
FROM base AS deps
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
# An npm install will be triggered by App Hosting based on the package.json.
# In a typical Docker build, you would run 'npm install' here.

# 3. Build Stage: Build the Next.js application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for the build
# The GEMINI_API_KEY can be passed during the build process
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=${GEMINI_API_KEY}

# Build the Next.js application
RUN npm run build

# 4. Runner Stage: Create the final image
FROM base AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# The Genkit flows need to be available at runtime
COPY --from=builder /app/src/ai/flows ./src/ai/flows
COPY --from=builder /app/src/ai/genkit.ts ./src/ai/genkit.ts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000

ENV PORT 3000

# Start the Next.js application
CMD ["node", "server.js"]
