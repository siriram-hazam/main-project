-- AlterTable
ALTER TABLE "department" ALTER COLUMN "company_id" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "department" ADD CONSTRAINT "department_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
