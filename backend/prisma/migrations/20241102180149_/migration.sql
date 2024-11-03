/*
  Warnings:

  - You are about to drop the `GrapicalMethod` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GrapicalMethod";

-- CreateTable
CREATE TABLE "RootOfEquation" (
    "id" SERIAL NOT NULL,
    "function" VARCHAR(255) NOT NULL,
    "start" VARCHAR(255) NOT NULL,
    "stop" VARCHAR(255) NOT NULL,
    "method" VARCHAR(255) NOT NULL,

    CONSTRAINT "RootOfEquation_pkey" PRIMARY KEY ("id")
);
