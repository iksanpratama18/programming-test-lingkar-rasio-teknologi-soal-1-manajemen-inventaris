import { Kategori } from "@prisma/client";

type BarangType = {
    id?: number;
    namaBarang: string;
    kategori: Kategori;
    jumlahBarang: number
    hargaPerUnit: number;
    tanggalMasuk: Date;
}

type FormState = {
    namaBarang: string;
    kategori: Kategori | string;
    jumlahBarang: number | '';
    hargaPerUnit: string | number;
    tanggalMasuk: string;
}

type FormError = {
    namaBarang?: string;
    kategori?: string;
    jumlahBarang?: string;
    hargaPerUnit?: string;
    tanggalMasuk?: string;
}

export type { BarangType, FormError, FormState }