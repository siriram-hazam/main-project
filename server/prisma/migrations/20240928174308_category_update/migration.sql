-- DropForeignKey
ALTER TABLE "category_information" DROP CONSTRAINT "category_information_category_id_fkey";

-- DropForeignKey
ALTER TABLE "piece_of_info" DROP CONSTRAINT "piece_of_info_categoryId_fkey";

-- CreateTable
CREATE TABLE "category_piece_of_info" (
    "categoryId" INTEGER NOT NULL,
    "piece_of_infoId" INTEGER NOT NULL,

    CONSTRAINT "category_piece_of_info_pkey" PRIMARY KEY ("categoryId","piece_of_infoId")
);

-- AddForeignKey
ALTER TABLE "category_piece_of_info" ADD CONSTRAINT "category_piece_of_info_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_piece_of_info" ADD CONSTRAINT "category_piece_of_info_piece_of_infoId_fkey" FOREIGN KEY ("piece_of_infoId") REFERENCES "piece_of_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;
