FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:24-alpine
WORKDIR /app
RUN npm install -g npm@latest && npm install -g serve
COPY --from=builder /app/dist ./dist
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh
RUN adduser -D -u 10014 appuser && chown -R appuser /app/dist
USER 10014
EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]
