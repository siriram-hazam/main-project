/*
  Warnings:

  - You are about to drop the column `info` on the `piece_of_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "piece_of_info" DROP COLUMN "info";

-- CreateTable
CREATE TABLE "info" (
    "id" SERIAL NOT NULL,
    "info_" TEXT NOT NULL,

    CONSTRAINT "info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info" (
    "info_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_pkey" PRIMARY KEY ("info_id","poi_id")
);

-- AddForeignKey
ALTER TABLE "poi_info" ADD CONSTRAINT "poi_info_info_id_fkey" FOREIGN KEY ("info_id") REFERENCES "info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info" ADD CONSTRAINT "poi_info_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
