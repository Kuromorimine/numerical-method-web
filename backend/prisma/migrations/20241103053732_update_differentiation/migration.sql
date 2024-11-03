/*
  Warnings:

  - Added the required column `method` to the `Differentiation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Differentiation" ADD COLUMN     "method" VARCHAR(255) NOT NULL;
