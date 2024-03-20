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

## Development Notes

### Search by function

```ts
({
    getKostums: publicProcedure.input(z.object({
            rank: z.boolean().default(false),
            name: z.string().optional(),
            link: z.string().optional(),
            origin: z.string().optional(),
        }).default({}))
        .query(({ ctx: { db }, }) => db.kostum.findMany({
            //
        })),
})
```

Such searching features has default value. Whether developer input `undefined` it would use the default. For every query 
is a wildcard, which would not care of cAsE and incomp...(lete) words even if it is at the ...start, end..., or mid..dle.

### Search by Omnibox

A omnibox like Google Search Bar or Github Repository Search usually using additional parameters that can be used. E.g.

```
sort:name,desc origin:Game param2:Long param but between params param1:"Long Params" A usual normal search
```

This could be breakdowns to
```ts
const x = {
    sort: ["name", "desc"],
    origin: "Game",
    // notice by "param2:Lomg" and "params "
    // In regex should be `:\w+\s`
    param2: "Long param but between params",
    param1: "Long Params",
    q: "A usual normal search"
}
```

### Upload File

1. First upload file to `POST /api/upload` as `multipart/form-data` to a field named `file`
2. Get the filename by response `name`
3. Pass the `name` to other service on tRPC.