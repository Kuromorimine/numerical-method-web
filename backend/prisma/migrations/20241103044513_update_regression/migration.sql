/*
  Warnings:

  - You are about to drop the column `regressoinarrayy` on the `Regression` table. All the data in the column will be lost.
  - Added the required column `regressionarrayy` to the `Regression` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Regression" DROP COLUMN "regressoinarrayy",
ADD COLUMN     "regressionarrayy" JSONB NOT NULL;
