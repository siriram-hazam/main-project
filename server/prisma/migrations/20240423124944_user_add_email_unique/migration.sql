/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `user_account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `user_account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_account" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_account_email_key" ON "user_account"("email");
