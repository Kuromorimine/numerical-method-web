-- CreateTable
CREATE TABLE "Spline" (
    "id" SERIAL NOT NULL,
    "points" INTEGER NOT NULL,
    "x0" INTEGER NOT NULL,
    "fx0" VARCHAR(255) NOT NULL,
    "xtarget" INTEGER NOT NULL,

    CONSTRAINT "Spline_pkey" PRIMARY KEY ("id")
);
