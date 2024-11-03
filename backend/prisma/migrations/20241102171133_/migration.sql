/*
  Warnings:

  - You are about to alter the column `start` on the `GrapicalMethod` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `VarChar(255)`.
  - You are about to alter the column `stop` on the `GrapicalMethod` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "GrapicalMethod" ALTER COLUMN "start" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "stop" SET DATA TYPE VARCHAR(255);
