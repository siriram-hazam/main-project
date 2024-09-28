-- AlterTable
ALTER TABLE "piece_of_info" ADD COLUMN     "category_id" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "piece_of_info" ADD CONSTRAINT "piece_of_info_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
