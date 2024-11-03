/*
  Warnings:

  - Changed the type of `sizearray` on the `Regression` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Regression" DROP COLUMN "sizearray",
ADD COLUMN     "sizearray" INTEGER NOT NULL;
