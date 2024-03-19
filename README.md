# Coscision

Ranks customs perfect-preferencely by using Simple Additive Weighting (SAW) algorithm.

## Development

### Local

1. Run your postgreSQL. You could mock your database by using docker in `start-database.sh`
2. Copy `.env.example` to `.env`
3. Set `DATABASE_URL`
4. If you never push the database schema, just run: `npm run db:push`
5. Try to run `npm run postinstall`
6. If you are on linux: `./.env && npm exec -y tsx -- ./prisma/insert.ts` \
   If you are on windows: `npm exec -y env-cmd -- npm exec -y tsx -- ./prisma/insert.ts` \
   or you could just use `npm run db:insert-linux` or `npm run db:insert-win`
7. Last, run `npm run dev`

### Codespace

All commands already scripted and implemented in `.devcontainer/postStart.sh`. You could just open 
a new Codespace and wait for terminal finishing the build. After that, run `npm run dev`.