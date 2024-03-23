-- Step 1
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
        AND "t1"."user_id" = $2 
        AND "t1"."kostum_id" IS NOT NULL
      )
  ) OFFSET $3

-- Step 2
SELECT 
  "public"."rvalues"."user_id", 
  "public"."rvalues"."kostum_id", 
  "public"."rvalues"."subkriteria_id" 
FROM 
  "public"."rvalues" 
WHERE 
  "public"."rvalues"."kostum_id" IN ($1) OFFSET $2

-- Step 3
SELECT 
  "public"."subkriteria"."id", 
  "public"."subkriteria"."kriteria_id", 
  "public"."subkriteria"."name", 
  "public"."subkriteria"."skvalue" 
FROM 
  "public"."subkriteria" 
WHERE 
  "public"."subkriteria"."id" IN ($1, $2, $3, $4, $5) OFFSET $6

-- Step 4
SELECT 
  "public"."kriteria"."id", 
  "public"."kriteria"."name", 
  "public"."kriteria"."weight", 
  "public"."kriteria"."ktype" :: text 
FROM 
  "public"."kriteria" 
WHERE 
  "public"."kriteria"."id" IN ($1, $2, $3, $4, $5) OFFSET $6
