-- CreateTable
CREATE TABLE "submissions" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR,
    "score" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

