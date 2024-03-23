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
      LEFT JOIN "public"."subkriteria" AS "j2" ON ("j2"."id") = ("t1"."subkriteria_id") 
    WHERE 
      (
        "t1"."kostum_id" = $1 
        AND (
          "j2"."kriteria_id" = $2 
          AND ("j2"."id" IS NOT NULL)
        ) 
        AND "t1"."user_id" = $3 
        AND "t1"."kostum_id" IS NOT NULL
      )
  ) OFFSET $4
