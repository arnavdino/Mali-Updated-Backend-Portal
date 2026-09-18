# Keep the existing Node major version for this release; upgrade it separately
# after compatibility testing because Node 16 is end-of-life.
FROM node:16.17.0-bullseye-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
# The checked-in lockfile predates several declared dependencies. Keep this
# deploy build reproducible from package.json until the lockfile is reconciled.
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

FROM node:16.17.0-bullseye-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force

COPY --from=build /app/dist ./dist

EXPOSE 3001
CMD ["node", "dist/src/main.js"]
