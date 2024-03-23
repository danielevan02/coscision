-- EVERY
-- cari semua rvalues yang tidak null dan bukan merupakan user tersebut
-- kemudian cari kostum yang tidak berada dalam nilai yang didapatkan
-- SUM: cari semua kostum yang bukan milik orang lain
SELECT "public"."kostum"."id", 
    "public"."kostum"."name", 
    "public"."kostum"."origin", 
    "public"."kostum"."preference"::text, 
    "public"."kostum"."image", 
    "public"."kostum"."link", 
    "public"."kostum"."kset" 
FROM "public"."kostum" 
WHERE ("public"."kostum"."id") NOT IN (
    SELECT "t1"."kostum_id" 
    FROM "public"."rvalues" AS "t1" 
    WHERE ((NOT "t1"."user_id" = $1) AND "t1"."kostum_id" IS NOT NULL)
) OFFSET $2

-- SOME
SELECT "public"."kostum"."id", 
    "public"."kostum"."name",
    "public"."kostum"."origin",
    "public"."kostum"."preference"::text, 
    "public"."kostum"."image", 
    "public"."kostum"."link", 
    "public"."kostum"."kset" 
FROM "public"."kostum" 
WHERE ("public"."kostum"."id") IN (
    SELECT "t1"."kostum_id" 
    FROM "public"."rvalues" AS "t1" 
    WHERE ("t1"."user_id" = $1 AND "t1"."kostum_id" IS NOT NULL)
) OFFSET $2

-- NONE
SELECT "public"."kostum"."id", 
    "public"."kostum"."name", 
    "public"."kostum"."origin", 
    "public"."kostum"."preference"::text, 
    "public"."kostum"."image", 
    "public"."kostum"."link", 
    "public"."kostum"."kset" 
FROM "public"."kostum" 
WHERE ("public"."kostum"."id") NOT IN (
    SELECT "t1"."kostum_id" 
    FROM "public"."rvalues" AS "t1" 
    WHERE ("t1"."user_id" = $1 AND "t1"."kostum_id" IS NOT NULL)
) OFFSET $2