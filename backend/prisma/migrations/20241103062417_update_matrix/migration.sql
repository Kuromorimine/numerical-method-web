/*
  Warnings:

  - You are about to drop the column `sizecolumn` on the `AXB` table. All the data in the column will be lost.
  - You are about to drop the column `sizerow` on the `AXB` table. All the data in the column will be lost.
  - Added the required column `size` to the `AXB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AXB" DROP COLUMN "sizecolumn",
DROP COLUMN "sizerow",
ADD COLUMN     "size" INTEGER NOT NULL;
