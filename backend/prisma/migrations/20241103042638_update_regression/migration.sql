/*
  Warnings:

  - Added the required column `method` to the `Regression` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Regression" ADD COLUMN     "method" VARCHAR(255) NOT NULL;
