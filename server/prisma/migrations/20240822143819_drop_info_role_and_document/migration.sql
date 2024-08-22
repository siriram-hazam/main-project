/*
  Warnings:

  - You are about to drop the `info_document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `info_role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `information_info_document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `information_info_role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "info_document" DROP CONSTRAINT "info_document_company_id_fkey";

-- DropForeignKey
ALTER TABLE "info_role" DROP CONSTRAINT "info_role_company_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_document" DROP CONSTRAINT "information_info_document_info_document_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_document" DROP CONSTRAINT "information_info_document_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_role" DROP CONSTRAINT "information_info_role_info_role_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_role" DROP CONSTRAINT "information_info_role_information_id_fkey";

-- DropTable
DROP TABLE "info_document";

-- DropTable
DROP TABLE "info_role";

-- DropTable
DROP TABLE "information_info_document";

-- DropTable
DROP TABLE "information_info_role";
