/*
  Warnings:

  - You are about to drop the column `piece_of_info` on the `category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_piece_of_info_fkey";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "piece_of_info";

-- AlterTable
ALTER TABLE "piece_of_info" ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "piece_of_info" ADD CONSTRAINT "piece_of_info_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
