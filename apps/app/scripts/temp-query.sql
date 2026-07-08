SELECT 
  cat.name AS kategori,
  COUNT(DISTINCT co.id) AS jumlah_kursus_aktif
FROM "Category" cat
LEFT JOIN "Course" co ON co."categoryId" = cat.id
LEFT JOIN "Module" m ON m."courseId" = co.id
WHERE m.id IS NOT NULL
GROUP BY cat.name
ORDER BY cat.name;
