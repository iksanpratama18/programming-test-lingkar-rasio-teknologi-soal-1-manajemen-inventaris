-- CreateEnum
CREATE TYPE "Kategori" AS ENUM ('Elektronik', 'Pakaian', 'Makanan', 'Lainnya');

-- CreateTable
CREATE TABLE "Barang" (
    "id" SERIAL NOT NULL,
    "namaBarang" TEXT NOT NULL,
    "kategori" "Kategori" NOT NULL,
    "jumlahBarang" INTEGER NOT NULL,
    "hargaPerUnit" INTEGER NOT NULL,
    "tanggalMasuk" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Barang_pkey" PRIMARY KEY ("id")
);
