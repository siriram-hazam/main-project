/*
  Warnings:

  - You are about to drop the column `company_id` on the `piece_of_info` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "piece_of_info" DROP CONSTRAINT "piece_of_info_company_id_fkey";

-- AlterTable
ALTER TABLE "info" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "piece_of_info" DROP COLUMN "company_id";

-- AddForeignKey
ALTER TABLE "info" ADD CONSTRAINT "info_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
