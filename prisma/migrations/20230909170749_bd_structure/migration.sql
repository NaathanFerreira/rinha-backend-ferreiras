-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" TEXT NOT NULL,
    "stack" TEXT[],

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "people_apelido_key" ON "people"("apelido");
