-- AlterTable
ALTER TABLE "info_access" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_access_condition" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_allowed_ps" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_allowed_ps_condition" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_format" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_from" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_lawbase" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_objective" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_owner" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_placed" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_ps_destroyer" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_ps_destroying" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_ps_sendto_outside" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_ps_usedbyrole_inside" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_stored_period" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "info_type" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "piece_of_info" ADD COLUMN     "company_id" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "piece_of_info" ADD CONSTRAINT "piece_of_info_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_owner" ADD CONSTRAINT "info_owner_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_from" ADD CONSTRAINT "info_from_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_format" ADD CONSTRAINT "info_format_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_type" ADD CONSTRAINT "info_type_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_objective" ADD CONSTRAINT "info_objective_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_lawbase" ADD CONSTRAINT "info_lawbase_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_stored_period" ADD CONSTRAINT "info_stored_period_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_placed" ADD CONSTRAINT "info_placed_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_allowed_ps" ADD CONSTRAINT "info_allowed_ps_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_allowed_ps_condition" ADD CONSTRAINT "info_allowed_ps_condition_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_access" ADD CONSTRAINT "info_access_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_access_condition" ADD CONSTRAINT "info_access_condition_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_ps_usedbyrole_inside" ADD CONSTRAINT "info_ps_usedbyrole_inside_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_ps_sendto_outside" ADD CONSTRAINT "info_ps_sendto_outside_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_ps_destroying" ADD CONSTRAINT "info_ps_destroying_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_ps_destroyer" ADD CONSTRAINT "info_ps_destroyer_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
