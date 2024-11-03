/*
  Warnings:

  - Added the required column `start` to the `GrapicalMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stop` to the `GrapicalMethod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GrapicalMethod" ADD COLUMN     "start" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "stop" DOUBLE PRECISION NOT NULL;
