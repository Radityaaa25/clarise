-- Script untuk mengamankan database dari akses Anon Key (RLS Bypass)
-- Silakan jalankan script ini di SQL Editor pada dashboard Supabase (https://supabase.com/dashboard/project/_/sql)

-- 1. Mengaktifkan Row Level Security (RLS) di semua tabel publik
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Course" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Module" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Slide" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Source" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CourseRating" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Badge" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserBadge" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserActivity" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReferralLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AiChatHistory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DailyReminder" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Voucher" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VoucherRedemption" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Announcement" ENABLE ROW LEVEL SECURITY;

-- 2. Hapus semua policy default (jika ada) yang mengizinkan anon/public access
-- (Prisma tidak membuat policy, tapi untuk jaga-jaga)
DROP POLICY IF EXISTS "public_access" ON "User";
-- (dan seterusnya, secara default tabel yang baru di-enable RLS-nya akan menolak SEMUA akses (Default Deny))

-- KETERANGAN:
-- Karena backend kita menggunakan Prisma (Server-Side), Prisma terhubung menggunakan 
-- koneksi Postgres standar (role postgres / service_role) yang mem-bypass RLS.
-- Sehingga fitur aplikasi tidak akan rusak. 
--
-- RLS ini hanya untuk memblokir akses langsung dari REST API Supabase (PostgREST)
-- jika seandainya NEXT_PUBLIC_SUPABASE_ANON_KEY berhasil diambil oleh pihak luar.
