/*
  Warnings:

  - Changed the type of `createBy` on the `information` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "information" DROP COLUMN "createBy",
ADD COLUMN     "createBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "information" ADD CONSTRAINT "information_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "user_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
