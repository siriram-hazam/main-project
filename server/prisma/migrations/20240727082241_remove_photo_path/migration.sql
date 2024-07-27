/*
  Warnings:

  - You are about to drop the column `photo_path` on the `user_account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "company" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "company_id_seq";

-- AlterTable
ALTER TABLE "user_account" DROP COLUMN "photo_path",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "user_account_id_seq";
