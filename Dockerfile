FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npx prisma generate

RUN npm run build && npm prune --production

FROM node:18-alpine

ENV PORT=3000
ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
