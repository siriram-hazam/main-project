-- DropForeignKey
ALTER TABLE "information_info_access" DROP CONSTRAINT "information_info_access_info_access_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_access" DROP CONSTRAINT "information_info_access_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_access_condition" DROP CONSTRAINT "information_info_access_condition_info_access_condition_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_access_condition" DROP CONSTRAINT "information_info_access_condition_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_allowed_ps" DROP CONSTRAINT "information_info_allowed_ps_info_allowed_ps_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_allowed_ps" DROP CONSTRAINT "information_info_allowed_ps_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_allowed_ps_condition" DROP CONSTRAINT "information_info_allowed_ps_condition_info_allowed_ps_cond_fkey";

-- DropForeignKey
ALTER TABLE "information_info_allowed_ps_condition" DROP CONSTRAINT "information_info_allowed_ps_condition_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_document" DROP CONSTRAINT "information_info_document_info_document_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_document" DROP CONSTRAINT "information_info_document_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_placed" DROP CONSTRAINT "information_info_placed_info_placed_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_placed" DROP CONSTRAINT "information_info_placed_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_ps_destroyer" DROP CONSTRAINT "information_info_ps_destroyer_info_ps_destroyer_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_ps_destroyer" DROP CONSTRAINT "information_info_ps_destroyer_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_ps_destroying" DROP CONSTRAINT "information_info_ps_destroying_info_ps_destroying_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_ps_destroying" DROP CONSTRAINT "information_info_ps_destroying_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_ps_sendto_outside" DROP CONSTRAINT "information_info_ps_sendto_outside_info_ps_sendto_outside__fkey";

-- DropForeignKey
ALTER TABLE "information_info_ps_sendto_outside" DROP CONSTRAINT "information_info_ps_sendto_outside_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_ps_usedbyrole_inside" DROP CONSTRAINT "information_info_ps_usedbyrole_inside_info_ps_usedbyrole_i_fkey";

-- DropForeignKey
ALTER TABLE "information_info_ps_usedbyrole_inside" DROP CONSTRAINT "information_info_ps_usedbyrole_inside_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_role" DROP CONSTRAINT "information_info_role_info_role_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_role" DROP CONSTRAINT "information_info_role_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_stored_period" DROP CONSTRAINT "information_info_stored_period_info_stored_period_id_fkey";

-- DropForeignKey
ALTER TABLE "information_info_stored_period" DROP CONSTRAINT "information_info_stored_period_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_m_organization" DROP CONSTRAINT "information_m_organization_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_m_organization" DROP CONSTRAINT "information_m_organization_m_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "information_m_physical" DROP CONSTRAINT "information_m_physical_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_m_physical" DROP CONSTRAINT "information_m_physical_m_physical_id_fkey";

-- DropForeignKey
ALTER TABLE "information_m_technical" DROP CONSTRAINT "information_m_technical_information_id_fkey";

-- DropForeignKey
ALTER TABLE "information_m_technical" DROP CONSTRAINT "information_m_technical_m_technical_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_information" DROP CONSTRAINT "poi_information_information_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_information" DROP CONSTRAINT "poi_information_poi_id_fkey";

-- AddForeignKey
ALTER TABLE "information_m_organization" ADD CONSTRAINT "information_m_organization_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_m_organization" ADD CONSTRAINT "information_m_organization_m_organization_id_fkey" FOREIGN KEY ("m_organization_id") REFERENCES "m_organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_m_technical" ADD CONSTRAINT "information_m_technical_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_m_technical" ADD CONSTRAINT "information_m_technical_m_technical_id_fkey" FOREIGN KEY ("m_technical_id") REFERENCES "m_technical"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_m_physical" ADD CONSTRAINT "information_m_physical_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_m_physical" ADD CONSTRAINT "information_m_physical_m_physical_id_fkey" FOREIGN KEY ("m_physical_id") REFERENCES "m_physical"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_information" ADD CONSTRAINT "poi_information_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_information" ADD CONSTRAINT "poi_information_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_role" ADD CONSTRAINT "information_info_role_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_role" ADD CONSTRAINT "information_info_role_info_role_id_fkey" FOREIGN KEY ("info_role_id") REFERENCES "info_role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_document" ADD CONSTRAINT "information_info_document_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_document" ADD CONSTRAINT "information_info_document_info_document_id_fkey" FOREIGN KEY ("info_document_id") REFERENCES "info_document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_stored_period" ADD CONSTRAINT "information_info_stored_period_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_stored_period" ADD CONSTRAINT "information_info_stored_period_info_stored_period_id_fkey" FOREIGN KEY ("info_stored_period_id") REFERENCES "info_stored_period"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_placed" ADD CONSTRAINT "information_info_placed_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_placed" ADD CONSTRAINT "information_info_placed_info_placed_id_fkey" FOREIGN KEY ("info_placed_id") REFERENCES "info_placed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_allowed_ps" ADD CONSTRAINT "information_info_allowed_ps_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_allowed_ps" ADD CONSTRAINT "information_info_allowed_ps_info_allowed_ps_id_fkey" FOREIGN KEY ("info_allowed_ps_id") REFERENCES "info_allowed_ps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_allowed_ps_condition" ADD CONSTRAINT "information_info_allowed_ps_condition_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_allowed_ps_condition" ADD CONSTRAINT "information_info_allowed_ps_condition_info_allowed_ps_cond_fkey" FOREIGN KEY ("info_allowed_ps_condition_id") REFERENCES "info_allowed_ps_condition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_access" ADD CONSTRAINT "information_info_access_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_access" ADD CONSTRAINT "information_info_access_info_access_id_fkey" FOREIGN KEY ("info_access_id") REFERENCES "info_access"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_access_condition" ADD CONSTRAINT "information_info_access_condition_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_access_condition" ADD CONSTRAINT "information_info_access_condition_info_access_condition_id_fkey" FOREIGN KEY ("info_access_condition_id") REFERENCES "info_access_condition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_usedbyrole_inside" ADD CONSTRAINT "information_info_ps_usedbyrole_inside_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_usedbyrole_inside" ADD CONSTRAINT "information_info_ps_usedbyrole_inside_info_ps_usedbyrole_i_fkey" FOREIGN KEY ("info_ps_usedbyrole_inside_id") REFERENCES "info_ps_usedbyrole_inside"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_sendto_outside" ADD CONSTRAINT "information_info_ps_sendto_outside_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_sendto_outside" ADD CONSTRAINT "information_info_ps_sendto_outside_info_ps_sendto_outside__fkey" FOREIGN KEY ("info_ps_sendto_outside_id") REFERENCES "info_ps_sendto_outside"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_destroying" ADD CONSTRAINT "information_info_ps_destroying_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_destroying" ADD CONSTRAINT "information_info_ps_destroying_info_ps_destroying_id_fkey" FOREIGN KEY ("info_ps_destroying_id") REFERENCES "info_ps_destroying"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_destroyer" ADD CONSTRAINT "information_info_ps_destroyer_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_destroyer" ADD CONSTRAINT "information_info_ps_destroyer_info_ps_destroyer_id_fkey" FOREIGN KEY ("info_ps_destroyer_id") REFERENCES "info_ps_destroyer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
