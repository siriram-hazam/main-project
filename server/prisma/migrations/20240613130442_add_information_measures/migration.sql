-- CreateTable
CREATE TABLE "m_organization" (
    "id" SERIAL NOT NULL,
    "organization" TEXT NOT NULL,

    CONSTRAINT "m_organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "information_m_organization" (
    "information_id" INTEGER NOT NULL,
    "m_organization_id" INTEGER NOT NULL,

    CONSTRAINT "information_m_organization_pkey" PRIMARY KEY ("information_id","m_organization_id")
);

-- CreateTable
CREATE TABLE "m_technical" (
    "id" SERIAL NOT NULL,
    "technical" TEXT NOT NULL,

    CONSTRAINT "m_technical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "information_m_technical" (
    "information_id" INTEGER NOT NULL,
    "m_technical_id" INTEGER NOT NULL,

    CONSTRAINT "information_m_technical_pkey" PRIMARY KEY ("information_id","m_technical_id")
);

-- CreateTable
CREATE TABLE "m_physical" (
    "id" SERIAL NOT NULL,
    "physical" TEXT NOT NULL,

    CONSTRAINT "m_physical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "information_m_physical" (
    "information_id" INTEGER NOT NULL,
    "m_physical_id" INTEGER NOT NULL,

    CONSTRAINT "information_m_physical_pkey" PRIMARY KEY ("information_id","m_physical_id")
);

-- AddForeignKey
ALTER TABLE "information_m_organization" ADD CONSTRAINT "information_m_organization_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_m_organization" ADD CONSTRAINT "information_m_organization_m_organization_id_fkey" FOREIGN KEY ("m_organization_id") REFERENCES "m_organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_m_technical" ADD CONSTRAINT "information_m_technical_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_m_technical" ADD CONSTRAINT "information_m_technical_m_technical_id_fkey" FOREIGN KEY ("m_technical_id") REFERENCES "m_technical"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_m_physical" ADD CONSTRAINT "information_m_physical_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "information_m_physical" ADD CONSTRAINT "information_m_physical_m_physical_id_fkey" FOREIGN KEY ("m_physical_id") REFERENCES "m_physical"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
