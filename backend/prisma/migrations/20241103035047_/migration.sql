-- CreateTable
CREATE TABLE "Differentiation" (
    "id" SERIAL NOT NULL,
    "functionmain" VARCHAR(255) NOT NULL,
    "inputa" VARCHAR(255) NOT NULL,
    "inputb" VARCHAR(255) NOT NULL,
    "inputn" VARCHAR(255),

    CONSTRAINT "Differentiation_pkey" PRIMARY KEY ("id")
);
