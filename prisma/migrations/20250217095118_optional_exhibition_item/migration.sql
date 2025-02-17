-- AlterTable
ALTER TABLE "ExhibitionItem" ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "position" DROP DEFAULT;
DROP SEQUENCE "ExhibitionItem_position_seq";
