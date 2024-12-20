'use server'

import { prisma } from "@/lib/prisma"
import { BarangType } from '@/lib/types';
import { revalidatePath } from "next/cache"

const saveBarang = async (barang: BarangType) => {
    try {
        console.log(barang);
        const newBarang = await prisma.barang.create({
            data: {
                namaBarang: barang.namaBarang,
                hargaPerUnit: barang.hargaPerUnit,
                jumlahBarang: barang.jumlahBarang,
                kategori: barang.kategori,
                tanggalMasuk: new Date(barang.tanggalMasuk)
            }
        })
        if(!newBarang) throw new Error('Barang failed to save')
        revalidatePath('/')
    } catch (error) {
        console.log(error);
    }
}

const listBarang = async () => {
    try {
        const barang = await prisma.barang.findMany();
        return barang;
    } catch (error) {
        console.log(error);
    }
}

const editBarang = async (id: number, barang: BarangType) => {
    console.log(id, barang);
    try {
        const updateBarang = await prisma.barang.update({
            data: {
                namaBarang: barang.namaBarang,
                hargaPerUnit: barang.hargaPerUnit,
                jumlahBarang: barang.jumlahBarang,
                kategori: barang.kategori,
                tanggalMasuk: new Date(barang.tanggalMasuk),
            },
            where: { id }
        })
        if (!updateBarang) throw new Error(`Failed to update barang ${id}`)
        revalidatePath('/')
    } catch (error) {
        console.log(error);
    }
}

const deleteBarang = async (id: number) => {
    try {
        const deleteBarangbarang = await prisma.barang.delete({ where: { id } })
        if(!deleteBarangbarang) throw new Error(`Failed to Delete Barang ${id}`)
        revalidatePath('/')
    } catch (error) {
        console.log(error)
    }
}

export { saveBarang, listBarang, deleteBarang, editBarang }