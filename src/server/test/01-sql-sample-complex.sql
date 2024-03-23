-- EVERY
SELECT 
  "public"."kostum"."id", 
  "public"."kostum"."name", 
  "public"."kostum"."origin", 
  "public"."kostum"."preference" :: text, 
  "public"."kostum"."image", 
  "public"."kostum"."link", 
  "public"."kostum"."kset" 
FROM 
  "public"."kostum" 
WHERE 
  ("public"."kostum"."id") NOT IN (
    SELECT 
      "t1"."kostum_id" 
    FROM 
      "public"."rvalues" AS "t1" 
    WHERE 
      (
        (
          NOT (
            "t1"."kostum_id" = $1 
            AND "t1"."subkriteria_id" = $2 
            AND "t1"."user_id" = $3
          )
        ) 
        AND "t1"."kostum_id" IS NOT NULL
      )
  ) OFFSET $4

-- SOME
SELECT 
  "public"."kostum"."id", 
  "public"."kostum"."name", 
  "public"."kostum"."origin", 
  "public"."kostum"."preference" :: text, 
  "public"."kostum"."image", 
  "public"."kostum"."link", 
  "public"."kostum"."kset" 
FROM 
  "public"."kostum" 
WHERE 
  ("public"."kostum"."id") IN (
    SELECT 
      "t1"."kostum_id" 
    FROM 
      "public"."rvalues" AS "t1" 
    WHERE 
      (
        "t1"."kostum_id" = $1 
        AND "t1"."subkriteria_id" = $2 
        AND "t1"."user_id" = $3 
        AND "t1"."kostum_id" IS NOT NULL
      )
  ) OFFSET $4

-- NONE
SELECT 
  "public"."kostum"."id", 
  "public"."kostum"."name", 
  "public"."kostum"."origin", 
  "public"."kostum"."preference" :: text, 
  "public"."kostum"."image", 
  "public"."kostum"."link", 
  "public"."kostum"."kset" 
FROM 
  "public"."kostum" 
WHERE 
  ("public"."kostum"."id") NOT IN (
    SELECT 
      "t1"."kostum_id" 
    FROM 
      "public"."rvalues" AS "t1" 
    WHERE 
      (
        "t1"."kostum_id" = $1 
        AND "t1"."subkriteria_id" = $2 
        AND "t1"."user_id" = $3 
        AND "t1"."kostum_id" IS NOT NULL
      )
  ) OFFSET $4