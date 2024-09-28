/*
  Warnings:

  - You are about to drop the column `category_id` on the `piece_of_info` table. All the data in the column will be lost.
  - Added the required column `piece_of_info` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "piece_of_info" DROP CONSTRAINT "piece_of_info_category_id_fkey";

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "piece_of_info" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "piece_of_info" DROP COLUMN "category_id";

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_piece_of_info_fkey" FOREIGN KEY ("piece_of_info") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
