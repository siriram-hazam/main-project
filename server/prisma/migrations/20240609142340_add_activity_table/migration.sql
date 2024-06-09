/*
  Warnings:

  - You are about to drop the column `activity` on the `information` table. All the data in the column will be lost.
  - Added the required column `activity_id` to the `information` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "information" DROP COLUMN "activity",
ADD COLUMN     "activity_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "activity" (
    "id" SERIAL NOT NULL,
    "activity" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information" ADD CONSTRAINT "information_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
