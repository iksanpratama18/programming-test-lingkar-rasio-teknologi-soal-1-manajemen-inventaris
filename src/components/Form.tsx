'use client'

import { saveBarang } from '@/actions';
import { FormError, FormState } from '@/lib/types';
import React, { useState } from 'react';

export enum KategoriBarang {
  Elektronik = "Elektronik",
  Pakaian = "Pakaian",
  Makanan = "Makanan",
  Lainnya = "Lainnya"
}


const Form: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({ namaBarang: '', kategori: '', jumlahBarang: '', hargaPerUnit: '', tanggalMasuk: '', });

  const [errors, setErrors] = useState<FormError>({});

  const today = new Date().toISOString().split('T')[0];

  const formatRupiah = (angka: string) => {
    const number_string = angka.replace(/[^,\d]/g, '').toString();
    const split = number_string.split(',');
    const sisa = split[0].length % 3;
    let rupiah = split[0].slice(0, sisa);
    const ribuan = split[0].slice(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return 'Rp. ' + rupiah
  };

  const handleHargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^,\d]/g, '');
    setFormState({
      ...formState,
      hargaPerUnit: formatRupiah(numericValue)
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: FormError = {};

    if (!formState.namaBarang) {
      newErrors.namaBarang = 'Nama Barang wajib diisi.';
    }

    if (!formState.kategori) {
      newErrors.kategori = 'Kategori wajib dipilih.';
    } else if (!Object.values(KategoriBarang).includes(formState.kategori as KategoriBarang)) {
      newErrors.kategori = 'Kategori tidak valid.';
    }

    if (formState.jumlahBarang === '' || formState.jumlahBarang < 1) {
      newErrors.jumlahBarang = 'Jumlah Barang harus minimal 1.';
    }

    const hargaNumericValue = parseInt(formState.hargaPerUnit.toString().replace(/[^0-9]/g, ''), 10);
    if (formState.hargaPerUnit === '' || hargaNumericValue < 100) {
      newErrors.hargaPerUnit = 'Harga per Unit harus minimal Rp100.';
    }


    if (!formState.tanggalMasuk) {
      newErrors.tanggalMasuk = 'Tanggal Masuk wajib diisi.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const numericPrice = typeof formState.hargaPerUnit === 'string' ? parseInt(formState.hargaPerUnit.replace(/[^\d,-]/g, '').replace(',', '.')) : formState.hargaPerUnit;
      const jumlahBarangToNumber = typeof formState.jumlahBarang === 'string' ? parseInt(formState.jumlahBarang) : formState.jumlahBarang;

      saveBarang({ namaBarang: formState.namaBarang, kategori: formState.kategori as KategoriBarang, tanggalMasuk: new Date(formState.tanggalMasuk), jumlahBarang: jumlahBarangToNumber, hargaPerUnit: numericPrice })
    }
  };

  return (
    <form className="w-full space-y-6 p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nama Barang</label>
        <input
          value={formState.namaBarang}
          onChange={(e) => setFormState({ ...formState, namaBarang: e.target.value })}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2.5 text-lg"
        />
        {errors.namaBarang && <p className="text-red-500 text-xs italic">{errors.namaBarang}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Kategori</label>
        <select
          value={formState.kategori}
          onChange={(e) => setFormState({ ...formState, kategori: e.target.value })}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2.5 text-lg"
        >
          <option value="">Pilih Kategori</option>
          {Object.values(KategoriBarang).map((kategori) => (
            <option key={kategori} value={kategori}>{kategori}</option>
          ))}
        </select>
        {errors.kategori && <p className="text-red-500 text-xs italic">{errors.kategori}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Jumlah Barang</label>
        <input
          type="number"
          value={formState.jumlahBarang}
          onChange={(e) => setFormState({ ...formState, jumlahBarang: (e.target.value ? parseInt(e.target.value) : '') })}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2.5 text-lg appearance-none"
        />
        {errors.jumlahBarang && <p className="text-red-500 text-xs italic">{errors.jumlahBarang}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Harga per Unit</label>
        <input
          type="text"
          value={formState.hargaPerUnit}
          onChange={handleHargaChange}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2.5 text-lg"
        />
        {errors.hargaPerUnit && <p className="text-red-500 text-xs italic">{errors.hargaPerUnit}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tanggal Masuk</label>
        <input
          type="date"
          max={today}
          value={formState.tanggalMasuk}
          onChange={(e) => setFormState({ ...formState, tanggalMasuk: e.target.value })}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2.5 text-lg"
        />
        {errors.tanggalMasuk && <p className="text-red-500 text-xs italic">{errors.tanggalMasuk}</p>}
      </div>
      <button type="submit" className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Submit
      </button>
    </form>
  );
};

export default Form;
