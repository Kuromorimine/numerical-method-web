-- CreateTable
CREATE TABLE "Interpolation" (
    "id" SERIAL NOT NULL,
    "sizearray" INTEGER NOT NULL,
    "arrayx" JSONB NOT NULL,
    "arrayy" JSONB NOT NULL,
    "inputindex" INTEGER NOT NULL,
    "indexleft" INTEGER NOT NULL,
    "indexright" INTEGER NOT NULL,
    "inputx" INTEGER NOT NULL,
    "method" VARCHAR(255) NOT NULL,

    CONSTRAINT "Interpolation_pkey" PRIMARY KEY ("id")
);
