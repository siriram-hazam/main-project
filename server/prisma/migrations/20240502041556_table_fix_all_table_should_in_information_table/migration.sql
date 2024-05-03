/*
  Warnings:

  - You are about to drop the `poi_info_access` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `poi_info_access_condition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `poi_info_allowed_ps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `poi_info_allowed_ps_condition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `poi_info_placed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `poi_info_ps_destroyer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `poi_info_ps_destroying` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `poi_info_ps_sendto_outside` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `poi_info_ps_usedbyrole_inside` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `poi_info_stored_period` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "poi_info_access" DROP CONSTRAINT "poi_info_access_info_access_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_access" DROP CONSTRAINT "poi_info_access_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_access_condition" DROP CONSTRAINT "poi_info_access_condition_info_access_condition_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_access_condition" DROP CONSTRAINT "poi_info_access_condition_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_allowed_ps" DROP CONSTRAINT "poi_info_allowed_ps_info_allowed_ps_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_allowed_ps" DROP CONSTRAINT "poi_info_allowed_ps_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_allowed_ps_condition" DROP CONSTRAINT "poi_info_allowed_ps_condition_info_allowed_ps_condition_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_allowed_ps_condition" DROP CONSTRAINT "poi_info_allowed_ps_condition_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_placed" DROP CONSTRAINT "poi_info_placed_info_placed_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_placed" DROP CONSTRAINT "poi_info_placed_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_ps_destroyer" DROP CONSTRAINT "poi_info_ps_destroyer_info_ps_destroyer_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_ps_destroyer" DROP CONSTRAINT "poi_info_ps_destroyer_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_ps_destroying" DROP CONSTRAINT "poi_info_ps_destroying_info_ps_destroying_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_ps_destroying" DROP CONSTRAINT "poi_info_ps_destroying_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_ps_sendto_outside" DROP CONSTRAINT "poi_info_ps_sendto_outside_info_ps_sendto_outside_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_ps_sendto_outside" DROP CONSTRAINT "poi_info_ps_sendto_outside_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_ps_usedbyrole_inside" DROP CONSTRAINT "poi_info_ps_usedbyrole_inside_info_ps_usedbyrole_inside_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_ps_usedbyrole_inside" DROP CONSTRAINT "poi_info_ps_usedbyrole_inside_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_stored_period" DROP CONSTRAINT "poi_info_stored_period_info_stored_period_fkey";

-- DropForeignKey
ALTER TABLE "poi_info_stored_period" DROP CONSTRAINT "poi_info_stored_period_poi_id_fkey";

-- DropTable
DROP TABLE "poi_info_access";

-- DropTable
DROP TABLE "poi_info_access_condition";

-- DropTable
DROP TABLE "poi_info_allowed_ps";

-- DropTable
DROP TABLE "poi_info_allowed_ps_condition";

-- DropTable
DROP TABLE "poi_info_placed";

-- DropTable
DROP TABLE "poi_info_ps_destroyer";

-- DropTable
DROP TABLE "poi_info_ps_destroying";

-- DropTable
DROP TABLE "poi_info_ps_sendto_outside";

-- DropTable
DROP TABLE "poi_info_ps_usedbyrole_inside";

-- DropTable
DROP TABLE "poi_info_stored_period";

-- CreateTable
CREATE TABLE "information_info_stored_period" (
    "information_id" INTEGER NOT NULL,
    "info_stored_period_id" INTEGER NOT NULL,

    CONSTRAINT "information_info_stored_period_pkey" PRIMARY KEY ("information_id","info_stored_period_id")
);

-- CreateTable
CREATE TABLE "information_info_placed" (
    "information_id" INTEGER NOT NULL,
    "info_placed_id" INTEGER NOT NULL,

    CONSTRAINT "information_info_placed_pkey" PRIMARY KEY ("information_id","info_placed_id")
);

-- CreateTable
CREATE TABLE "information_info_allowed_ps" (
    "information_id" INTEGER NOT NULL,
    "info_allowed_ps_id" INTEGER NOT NULL,

    CONSTRAINT "information_info_allowed_ps_pkey" PRIMARY KEY ("information_id","info_allowed_ps_id")
);

-- CreateTable
CREATE TABLE "information_info_allowed_ps_condition" (
    "information_id" INTEGER NOT NULL,
    "info_allowed_ps_condition_id" INTEGER NOT NULL,

    CONSTRAINT "information_info_allowed_ps_condition_pkey" PRIMARY KEY ("information_id","info_allowed_ps_condition_id")
);

-- CreateTable
CREATE TABLE "information_info_access" (
    "information_id" INTEGER NOT NULL,
    "info_access_id" INTEGER NOT NULL,

    CONSTRAINT "information_info_access_pkey" PRIMARY KEY ("information_id","info_access_id")
);

-- CreateTable
CREATE TABLE "information_info_access_condition" (
    "information_id" INTEGER NOT NULL,
    "info_access_condition_id" INTEGER NOT NULL,

    CONSTRAINT "information_info_access_condition_pkey" PRIMARY KEY ("information_id","info_access_condition_id")
);

-- CreateTable
CREATE TABLE "information_info_ps_usedbyrole_inside" (
    "information_id" INTEGER NOT NULL,
    "info_ps_usedbyrole_inside_id" INTEGER NOT NULL,

    CONSTRAINT "information_info_ps_usedbyrole_inside_pkey" PRIMARY KEY ("information_id","info_ps_usedbyrole_inside_id")
);

-- CreateTable
CREATE TABLE "information_info_ps_sendto_outside" (
    "information_id" INTEGER NOT NULL,
    "info_ps_sendto_outside_id" INTEGER NOT NULL,

    CONSTRAINT "information_info_ps_sendto_outside_pkey" PRIMARY KEY ("information_id","info_ps_sendto_outside_id")
);

-- CreateTable
CREATE TABLE "information_info_ps_destroying" (
    "information_id" INTEGER NOT NULL,
    "info_ps_destroying_id" INTEGER NOT NULL,

    CONSTRAINT "information_info_ps_destroying_pkey" PRIMARY KEY ("information_id","info_ps_destroying_id")
);

-- CreateTable
CREATE TABLE "information_info_ps_destroyer" (
    "information_id" INTEGER NOT NULL,
    "info_ps_destroyer_id" INTEGER NOT NULL,

    CONSTRAINT "information_info_ps_destroyer_pkey" PRIMARY KEY ("information_id","info_ps_destroyer_id")
);

-- AddForeignKey
ALTER TABLE "information_info_stored_period" ADD CONSTRAINT "information_info_stored_period_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_stored_period" ADD CONSTRAINT "information_info_stored_period_info_stored_period_id_fkey" FOREIGN KEY ("info_stored_period_id") REFERENCES "info_stored_period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_placed" ADD CONSTRAINT "information_info_placed_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_placed" ADD CONSTRAINT "information_info_placed_info_placed_id_fkey" FOREIGN KEY ("info_placed_id") REFERENCES "info_placed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_allowed_ps" ADD CONSTRAINT "information_info_allowed_ps_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_allowed_ps" ADD CONSTRAINT "information_info_allowed_ps_info_allowed_ps_id_fkey" FOREIGN KEY ("info_allowed_ps_id") REFERENCES "info_allowed_ps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_allowed_ps_condition" ADD CONSTRAINT "information_info_allowed_ps_condition_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_allowed_ps_condition" ADD CONSTRAINT "information_info_allowed_ps_condition_info_allowed_ps_cond_fkey" FOREIGN KEY ("info_allowed_ps_condition_id") REFERENCES "info_allowed_ps_condition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_access" ADD CONSTRAINT "information_info_access_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_access" ADD CONSTRAINT "information_info_access_info_access_id_fkey" FOREIGN KEY ("info_access_id") REFERENCES "info_access"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_access_condition" ADD CONSTRAINT "information_info_access_condition_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_access_condition" ADD CONSTRAINT "information_info_access_condition_info_access_condition_id_fkey" FOREIGN KEY ("info_access_condition_id") REFERENCES "info_access_condition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_usedbyrole_inside" ADD CONSTRAINT "information_info_ps_usedbyrole_inside_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_usedbyrole_inside" ADD CONSTRAINT "information_info_ps_usedbyrole_inside_info_ps_usedbyrole_i_fkey" FOREIGN KEY ("info_ps_usedbyrole_inside_id") REFERENCES "info_ps_usedbyrole_inside"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_sendto_outside" ADD CONSTRAINT "information_info_ps_sendto_outside_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_sendto_outside" ADD CONSTRAINT "information_info_ps_sendto_outside_info_ps_sendto_outside__fkey" FOREIGN KEY ("info_ps_sendto_outside_id") REFERENCES "info_ps_sendto_outside"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_destroying" ADD CONSTRAINT "information_info_ps_destroying_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_destroying" ADD CONSTRAINT "information_info_ps_destroying_info_ps_destroying_id_fkey" FOREIGN KEY ("info_ps_destroying_id") REFERENCES "info_ps_destroying"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_destroyer" ADD CONSTRAINT "information_info_ps_destroyer_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_ps_destroyer" ADD CONSTRAINT "information_info_ps_destroyer_info_ps_destroyer_id_fkey" FOREIGN KEY ("info_ps_destroyer_id") REFERENCES "info_ps_destroyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
