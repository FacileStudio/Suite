FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
ARG PUBLIC_JOURNAL_URL=https://journal.facile.studio/api
ARG PUBLIC_JOURNAL_KEY=journal_pub_suite_ayWEHUnTQODAlr6MTwyTYCJHMWHVXxoMUHe2U2MZfCQ
ENV PUBLIC_JOURNAL_URL=$PUBLIC_JOURNAL_URL
ENV PUBLIC_JOURNAL_KEY=$PUBLIC_JOURNAL_KEY
RUN bun run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
