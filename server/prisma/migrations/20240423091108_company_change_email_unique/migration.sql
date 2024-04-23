/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "company_email_key" ON "company"("email");
