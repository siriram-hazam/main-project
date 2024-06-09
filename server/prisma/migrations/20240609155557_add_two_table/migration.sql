-- CreateTable
CREATE TABLE "info_role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "info_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "information_info_role" (
    "information_id" INTEGER NOT NULL,
    "info_role_id" INTEGER NOT NULL,

    CONSTRAINT "information_info_role_pkey" PRIMARY KEY ("information_id","info_role_id")
);

-- CreateTable
CREATE TABLE "info_document" (
    "id" SERIAL NOT NULL,
    "document" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "info_document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "information_info_document" (
    "information_id" INTEGER NOT NULL,
    "info_document_id" INTEGER NOT NULL,

    CONSTRAINT "information_info_document_pkey" PRIMARY KEY ("information_id","info_document_id")
);

-- AddForeignKey
ALTER TABLE "info_role" ADD CONSTRAINT "info_role_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_role" ADD CONSTRAINT "information_info_role_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_role" ADD CONSTRAINT "information_info_role_info_role_id_fkey" FOREIGN KEY ("info_role_id") REFERENCES "info_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_document" ADD CONSTRAINT "info_document_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_document" ADD CONSTRAINT "information_info_document_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_info_document" ADD CONSTRAINT "information_info_document_info_document_id_fkey" FOREIGN KEY ("info_document_id") REFERENCES "info_document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
