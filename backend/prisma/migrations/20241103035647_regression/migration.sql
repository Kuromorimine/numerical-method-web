-- CreateTable
CREATE TABLE "Regression" (
    "id" SERIAL NOT NULL,
    "sizearray" VARCHAR(255) NOT NULL,
    "inputx" VARCHAR(255) NOT NULL,
    "m" VARCHAR(255),
    "regressionarray" JSONB NOT NULL,

    CONSTRAINT "Regression_pkey" PRIMARY KEY ("id")
);
