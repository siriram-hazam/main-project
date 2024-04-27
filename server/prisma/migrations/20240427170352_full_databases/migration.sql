-- CreateTable
CREATE TABLE "information" (
    "id" SERIAL NOT NULL,
    "activity" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_information" (
    "information_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "company_information_pkey" PRIMARY KEY ("information_id","company_id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "department_id" INTEGER NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_information" (
    "information_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "category_information_pkey" PRIMARY KEY ("information_id","category_id")
);

-- CreateTable
CREATE TABLE "poi_information" (
    "information_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_information_pkey" PRIMARY KEY ("information_id","poi_id")
);

-- CreateTable
CREATE TABLE "piece_of_info" (
    "id" SERIAL NOT NULL,
    "info" TEXT NOT NULL,

    CONSTRAINT "piece_of_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_owner" (
    "id" SERIAL NOT NULL,
    "owner_" TEXT NOT NULL,

    CONSTRAINT "info_owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_owner" (
    "info_owner_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_owner_pkey" PRIMARY KEY ("info_owner_id","poi_id")
);

-- CreateTable
CREATE TABLE "info_from" (
    "id" SERIAL NOT NULL,
    "from_" TEXT NOT NULL,

    CONSTRAINT "info_from_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_from" (
    "info_from_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_from_pkey" PRIMARY KEY ("info_from_id","poi_id")
);

-- CreateTable
CREATE TABLE "info_format" (
    "id" SERIAL NOT NULL,
    "format_" TEXT NOT NULL,

    CONSTRAINT "info_format_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_format" (
    "info_format_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_format_pkey" PRIMARY KEY ("info_format_id","poi_id")
);

-- CreateTable
CREATE TABLE "info_type" (
    "id" SERIAL NOT NULL,
    "type_" TEXT NOT NULL,

    CONSTRAINT "info_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_type" (
    "info_type_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_type_pkey" PRIMARY KEY ("info_type_id","poi_id")
);

-- CreateTable
CREATE TABLE "info_objective" (
    "id" SERIAL NOT NULL,
    "objective_" TEXT NOT NULL,

    CONSTRAINT "info_objective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_objective" (
    "info_objective_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_objective_pkey" PRIMARY KEY ("info_objective_id","poi_id")
);

-- CreateTable
CREATE TABLE "info_lawbase" (
    "id" SERIAL NOT NULL,
    "lawBase_" TEXT NOT NULL,

    CONSTRAINT "info_lawbase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_lawbase" (
    "info_lawbase_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_lawbase_pkey" PRIMARY KEY ("info_lawbase_id","poi_id")
);

-- CreateTable
CREATE TABLE "info_stored_period" (
    "id" SERIAL NOT NULL,
    "period_" TEXT NOT NULL,

    CONSTRAINT "info_stored_period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_stored_period" (
    "info_stored_period" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_stored_period_pkey" PRIMARY KEY ("info_stored_period","poi_id")
);

-- CreateTable
CREATE TABLE "info_placed" (
    "id" SERIAL NOT NULL,
    "placed_" TEXT NOT NULL,

    CONSTRAINT "info_placed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_placed" (
    "info_placed_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_placed_pkey" PRIMARY KEY ("info_placed_id","poi_id")
);

-- CreateTable
CREATE TABLE "info_allowed_ps" (
    "id" SERIAL NOT NULL,
    "allowed_ps_" TEXT NOT NULL,

    CONSTRAINT "info_allowed_ps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_allowed_ps" (
    "info_allowed_ps_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_allowed_ps_pkey" PRIMARY KEY ("info_allowed_ps_id","poi_id")
);

-- CreateTable
CREATE TABLE "info_allowed_ps_condition" (
    "id" SERIAL NOT NULL,
    "allowed_ps_condition_" TEXT NOT NULL,

    CONSTRAINT "info_allowed_ps_condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_allowed_ps_condition" (
    "info_allowed_ps_condition_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_allowed_ps_condition_pkey" PRIMARY KEY ("info_allowed_ps_condition_id","poi_id")
);

-- CreateTable
CREATE TABLE "info_access" (
    "id" SERIAL NOT NULL,
    "access_" TEXT NOT NULL,

    CONSTRAINT "info_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_access" (
    "info_access_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_access_pkey" PRIMARY KEY ("info_access_id","poi_id")
);

-- CreateTable
CREATE TABLE "info_access_condition" (
    "id" SERIAL NOT NULL,
    "access_condition_" TEXT NOT NULL,

    CONSTRAINT "info_access_condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_access_condition" (
    "info_access_condition_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_access_condition_pkey" PRIMARY KEY ("info_access_condition_id","poi_id")
);

-- CreateTable
CREATE TABLE "info_ps_usedbyrole_inside" (
    "id" SERIAL NOT NULL,
    "use_by_role_" TEXT NOT NULL,

    CONSTRAINT "info_ps_usedbyrole_inside_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_ps_usedbyrole_inside" (
    "info_ps_usedbyrole_inside_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_ps_usedbyrole_inside_pkey" PRIMARY KEY ("info_ps_usedbyrole_inside_id","poi_id")
);

-- CreateTable
CREATE TABLE "info_ps_sendto_outside" (
    "id" SERIAL NOT NULL,
    "sendto_" TEXT NOT NULL,

    CONSTRAINT "info_ps_sendto_outside_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_ps_sendto_outside" (
    "info_ps_sendto_outside_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_ps_sendto_outside_pkey" PRIMARY KEY ("info_ps_sendto_outside_id","poi_id")
);

-- CreateTable
CREATE TABLE "info_ps_destroying" (
    "id" SERIAL NOT NULL,
    "destroying_" TEXT NOT NULL,

    CONSTRAINT "info_ps_destroying_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_ps_destroying" (
    "info_ps_destroying_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_ps_destroying_pkey" PRIMARY KEY ("info_ps_destroying_id","poi_id")
);

-- CreateTable
CREATE TABLE "info_ps_destroyer" (
    "id" SERIAL NOT NULL,
    "destroyer_" TEXT NOT NULL,

    CONSTRAINT "info_ps_destroyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_info_ps_destroyer" (
    "info_ps_destroyer_id" INTEGER NOT NULL,
    "poi_id" INTEGER NOT NULL,

    CONSTRAINT "poi_info_ps_destroyer_pkey" PRIMARY KEY ("info_ps_destroyer_id","poi_id")
);

-- AddForeignKey
ALTER TABLE "company_information" ADD CONSTRAINT "company_information_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_information" ADD CONSTRAINT "company_information_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_information" ADD CONSTRAINT "category_information_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_information" ADD CONSTRAINT "category_information_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_information" ADD CONSTRAINT "poi_information_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_information" ADD CONSTRAINT "poi_information_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_owner" ADD CONSTRAINT "poi_info_owner_info_owner_id_fkey" FOREIGN KEY ("info_owner_id") REFERENCES "info_owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_owner" ADD CONSTRAINT "poi_info_owner_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_from" ADD CONSTRAINT "poi_info_from_info_from_id_fkey" FOREIGN KEY ("info_from_id") REFERENCES "info_from"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_from" ADD CONSTRAINT "poi_info_from_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_format" ADD CONSTRAINT "poi_info_format_info_format_id_fkey" FOREIGN KEY ("info_format_id") REFERENCES "info_format"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_format" ADD CONSTRAINT "poi_info_format_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_type" ADD CONSTRAINT "poi_info_type_info_type_id_fkey" FOREIGN KEY ("info_type_id") REFERENCES "info_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_type" ADD CONSTRAINT "poi_info_type_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_objective" ADD CONSTRAINT "poi_info_objective_info_objective_id_fkey" FOREIGN KEY ("info_objective_id") REFERENCES "info_objective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_objective" ADD CONSTRAINT "poi_info_objective_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_lawbase" ADD CONSTRAINT "poi_info_lawbase_info_lawbase_id_fkey" FOREIGN KEY ("info_lawbase_id") REFERENCES "info_lawbase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_lawbase" ADD CONSTRAINT "poi_info_lawbase_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_stored_period" ADD CONSTRAINT "poi_info_stored_period_info_stored_period_fkey" FOREIGN KEY ("info_stored_period") REFERENCES "info_stored_period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_stored_period" ADD CONSTRAINT "poi_info_stored_period_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_placed" ADD CONSTRAINT "poi_info_placed_info_placed_id_fkey" FOREIGN KEY ("info_placed_id") REFERENCES "info_placed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_placed" ADD CONSTRAINT "poi_info_placed_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_allowed_ps" ADD CONSTRAINT "poi_info_allowed_ps_info_allowed_ps_id_fkey" FOREIGN KEY ("info_allowed_ps_id") REFERENCES "info_allowed_ps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_allowed_ps" ADD CONSTRAINT "poi_info_allowed_ps_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_allowed_ps_condition" ADD CONSTRAINT "poi_info_allowed_ps_condition_info_allowed_ps_condition_id_fkey" FOREIGN KEY ("info_allowed_ps_condition_id") REFERENCES "info_allowed_ps_condition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_allowed_ps_condition" ADD CONSTRAINT "poi_info_allowed_ps_condition_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_access" ADD CONSTRAINT "poi_info_access_info_access_id_fkey" FOREIGN KEY ("info_access_id") REFERENCES "info_access"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_access" ADD CONSTRAINT "poi_info_access_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_access_condition" ADD CONSTRAINT "poi_info_access_condition_info_access_condition_id_fkey" FOREIGN KEY ("info_access_condition_id") REFERENCES "info_access_condition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_access_condition" ADD CONSTRAINT "poi_info_access_condition_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_ps_usedbyrole_inside" ADD CONSTRAINT "poi_info_ps_usedbyrole_inside_info_ps_usedbyrole_inside_id_fkey" FOREIGN KEY ("info_ps_usedbyrole_inside_id") REFERENCES "info_ps_usedbyrole_inside"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_ps_usedbyrole_inside" ADD CONSTRAINT "poi_info_ps_usedbyrole_inside_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_ps_sendto_outside" ADD CONSTRAINT "poi_info_ps_sendto_outside_info_ps_sendto_outside_id_fkey" FOREIGN KEY ("info_ps_sendto_outside_id") REFERENCES "info_ps_sendto_outside"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_ps_sendto_outside" ADD CONSTRAINT "poi_info_ps_sendto_outside_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_ps_destroying" ADD CONSTRAINT "poi_info_ps_destroying_info_ps_destroying_id_fkey" FOREIGN KEY ("info_ps_destroying_id") REFERENCES "info_ps_destroying"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_ps_destroying" ADD CONSTRAINT "poi_info_ps_destroying_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_ps_destroyer" ADD CONSTRAINT "poi_info_ps_destroyer_info_ps_destroyer_id_fkey" FOREIGN KEY ("info_ps_destroyer_id") REFERENCES "info_ps_destroyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_info_ps_destroyer" ADD CONSTRAINT "poi_info_ps_destroyer_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "piece_of_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
