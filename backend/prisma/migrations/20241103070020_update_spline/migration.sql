/*
  Warnings:

  - Changed the type of `x0` on the `Spline` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fx0` on the `Spline` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Spline" ALTER COLUMN "points" SET DATA TYPE VARCHAR(255),
DROP COLUMN "x0",
ADD COLUMN     "x0" JSONB NOT NULL,
DROP COLUMN "fx0",
ADD COLUMN     "fx0" JSONB NOT NULL;
