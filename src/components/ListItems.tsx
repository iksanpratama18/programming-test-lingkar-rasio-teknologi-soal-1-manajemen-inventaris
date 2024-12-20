'use client'

import BarangItem from "./BarangItem";
import { BarangType } from "@/lib/types";
import { useState } from "react";
import { KategoriBarang } from "./Form";

interface IBarang {
    barangList: BarangType[];
}

const ListItems: React.FC<IBarang> = ({ barangList }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("");

    const filteredList = barangList.filter(
        barang => barang.namaBarang.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (filterCategory ? barang.kategori === filterCategory : true));

    const exportToCSV = () => {
        const csvRows =
            [
                ["Nama Barang", "Kategori", "Jumlah Barang", "Harga per Unit", "Harga Total", "Tanggal Masuk"],
                ...filteredList.map(barang => [
                    barang.namaBarang,
                    barang.kategori,
                    barang.jumlahBarang.toString(),
                    barang.hargaPerUnit,
                    (barang.hargaPerUnit * barang.jumlahBarang).toString(),
                    barang.tanggalMasuk
                ])
            ];
        const csvContent = csvRows.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "barang_list.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="overflow-x-auto">
            <div className="py-2 flex items-center">
                <input type="text" placeholder="Nama barang" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="px-4 py-2 border rounded-md" />
                <select
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="ml-2 px-4 py-2 border rounded-md"
                >
                    <option value="">Pilih Kategori</option>
                    {Object.values(KategoriBarang).map((kategori) => (
                        <option key={kategori} value={kategori}>{kategori}</option>
                    ))}
                </select>
                <button onClick={exportToCSV} className="ml-4 px-4 py-2 border rounded-md bg-blue-500 text-white" > Export to CSV </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Barang</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Barang</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Masuk</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredList && filteredList.map((barang) => (
                        <BarangItem key={barang.id}
                            hargaPerUnit={barang.hargaPerUnit}
                            jumlahBarang={barang.jumlahBarang}
                            kategori={barang.kategori}
                            namaBarang={barang.namaBarang}
                            tanggalMasuk={barang.tanggalMasuk}
                            id={barang.id} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListItems;
