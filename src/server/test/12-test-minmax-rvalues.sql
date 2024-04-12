SELECT k.id AS kid,
    k.weight AS kweight,
    k.ktype AS ktype,
    MIN(sk.skvalue) as skmin,
    MAX(sk.skvalue) as skmax
FROM kriteria k
JOIN subkriteria sk ON sk.kriteria_id = k.id
GROUP BY k.id;

SELECT
    -- rv.user_id,
    k.id AS kid,
    k.weight AS kweight,
    k.ktype AS ktype,
    MIN(sk.skvalue) as skmin,
    MAX(sk.skvalue) as skmax
FROM rvalues rv
JOIN subkriteria sk ON sk.id = rv.subkriteria_id
JOIN kriteria k ON k.id = sk.kriteria_id
WHERE rv.user_id = 4
GROUP BY k.id; --, rv.user_id;

SELECT k.id AS kid,
    k.weight AS kweight,
    k.ktype AS ktype,
    MIN(sk.skvalue) as skmin,
    MAX(sk.skvalue) as skmax
FROM kriteria k
JOIN subkriteria sk ON sk.kriteria_id = k.id
JOIN rvalues rv ON rv.subkriteria_id = sk.id
WHERE rv.user_id = 4
GROUP BY k.id;

SELECT k.id AS kid,
    k.weight AS kweight,
    k.ktype AS ktype,
    MIN(sk.skvalue) as skmin,
    MAX(sk.skvalue) as skmax
FROM kriteria k
JOIN subkriteria sk ON sk.kriteria_id = k.id
JOIN rvalues rv ON rv.subkriteria_id = sk.id
WHERE rv.user_id = 4
GROUP BY k.id;