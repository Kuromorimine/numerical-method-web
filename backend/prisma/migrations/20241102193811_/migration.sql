-- CreateTable
CREATE TABLE "AXB" (
    "id" SERIAL NOT NULL,
    "sizecolumn" INTEGER NOT NULL,
    "sizerow" INTEGER NOT NULL,
    "matrixA" JSONB NOT NULL,
    "matrixB" JSONB NOT NULL,
    "method" VARCHAR(255) NOT NULL,

    CONSTRAINT "AXB_pkey" PRIMARY KEY ("id")
);
