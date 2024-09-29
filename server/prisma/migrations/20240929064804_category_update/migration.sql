/*
  Warnings:

  - Added the required column `category_id` to the `poi_information` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "poi_information" ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "poi_information" ADD CONSTRAINT "poi_information_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
