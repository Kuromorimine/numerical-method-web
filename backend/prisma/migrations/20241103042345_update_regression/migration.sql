/*
  Warnings:

  - You are about to drop the column `regressionarray` on the `Regression` table. All the data in the column will be lost.
  - Added the required column `regressionarrayx` to the `Regression` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regressoinarrayy` to the `Regression` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Regression" DROP COLUMN "regressionarray",
ADD COLUMN     "regressionarrayx" JSONB NOT NULL,
ADD COLUMN     "regressoinarrayy" JSONB NOT NULL;
