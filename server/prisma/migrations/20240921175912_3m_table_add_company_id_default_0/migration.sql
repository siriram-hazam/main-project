-- AlterTable
ALTER TABLE "m_organization" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "m_physical" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "m_technical" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "m_organization" ADD CONSTRAINT "m_organization_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "m_technical" ADD CONSTRAINT "m_technical_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "m_physical" ADD CONSTRAINT "m_physical_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
