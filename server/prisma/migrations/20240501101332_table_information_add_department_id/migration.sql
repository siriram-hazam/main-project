-- AlterTable
ALTER TABLE "information" ADD COLUMN     "department_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "information" ADD CONSTRAINT "information_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
