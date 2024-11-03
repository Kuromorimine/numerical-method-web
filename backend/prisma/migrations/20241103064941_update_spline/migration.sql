/*
  Warnings:

  - Added the required column `splinetype` to the `Spline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Spline" ADD COLUMN     "splinetype" VARCHAR(255) NOT NULL;
