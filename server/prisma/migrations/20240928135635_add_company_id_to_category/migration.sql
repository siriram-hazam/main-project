-- AlterTable
ALTER TABLE "category" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
