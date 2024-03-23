-- Retrieve true nilai

SELECT 
  s.nilai_subkriteria AS sub, 
  kp.id_kriteria AS id_kriteria, 
  k.tipe_kriteria AS atribut 
FROM 
  tbl_subkriteria s, 
  tbl_nilai kp, 
  tbl_kriteria k 
WHERE 
  kp.id_kostum = '$kode' 
  AND s.id_subkriteria = kp.id_subkriteria 
  AND k.id_kriteria = kp.id_kriteria 
ORDER BY 
  kp.id_kriteria;

-- Get max

SELECT 
  MAX(s.nilai_subkriteria) AS nmax 
FROM 
  tbl_subkriteria s, 
  tbl_nilai kp 
WHERE 
  kp.id_kriteria = '$result[id_kriteria]'
  AND s.id_subkriteria = kp.id_subkriteria;

-- Get min

SELECT 
  MIN(s.nilai_subkriteria) AS nmin 
FROM 
  tbl_subkriteria s, 
  tbl_nilai kp 
WHERE 
  kp.id_kriteria = '$result[id_kriteria]' 
  AND s.id_subkriteria = kp.id_subkriteria;

-- Get Weight

SELECT 
  bobot_kriteria 
FROM 
  tbl_kriteria 
WHERE 
  id_kriteria = '$result[id_kriteria]';
