-- DropForeignKey
ALTER TABLE "category_information" DROP CONSTRAINT "category_information_category_id_fkey";

-- DropForeignKey
ALTER TABLE "category_information" DROP CONSTRAINT "category_information_information_id_fkey";

-- AddForeignKey
ALTER TABLE "category_information" ADD CONSTRAINT "category_information_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_information" ADD CONSTRAINT "category_information_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
