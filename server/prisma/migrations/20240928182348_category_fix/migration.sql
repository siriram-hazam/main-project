-- AddForeignKey
ALTER TABLE "category_information" ADD CONSTRAINT "category_information_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
