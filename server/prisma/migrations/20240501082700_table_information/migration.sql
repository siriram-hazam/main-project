/*
  Warnings:

  - You are about to drop the `company_information` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company_id` to the `information` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "company_information" DROP CONSTRAINT "company_information_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_information" DROP CONSTRAINT "company_information_information_id_fkey";

-- AlterTable
ALTER TABLE "information" ADD COLUMN     "company_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "company_information";

-- AddForeignKey
ALTER TABLE "information" ADD CONSTRAINT "information_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
