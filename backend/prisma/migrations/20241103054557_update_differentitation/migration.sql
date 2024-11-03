/*
  Warnings:

  - The `inputn` column on the `Differentiation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `inputa` on the `Differentiation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `inputb` on the `Differentiation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Differentiation" DROP COLUMN "inputa",
ADD COLUMN     "inputa" INTEGER NOT NULL,
DROP COLUMN "inputb",
ADD COLUMN     "inputb" INTEGER NOT NULL,
DROP COLUMN "inputn",
ADD COLUMN     "inputn" INTEGER;
