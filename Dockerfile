FROM node:16.15-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:16.15-alpine 
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY package.json .
COPY prisma ./prisma
COPY .env /app/.env

EXPOSE 3000
ENTRYPOINT ["node", "build"]