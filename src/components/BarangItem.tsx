'use client'

import React, { useState } from 'react';
import { deleteBarang, editBarang } from '@/actions';
import { BarangType } from '@/lib/types';

const BarangItem: React.FC<BarangType> = ({ id, namaBarang, kategori, jumlahBarang, hargaPerUnit, tanggalMasuk }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    namaBarang,
    kategori,
    jumlahBarang,
    hargaPerUnit,
    tanggalMasuk,
  });
  const [error, setError] = useState<string>('');

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = (id: number) => {
    deleteBarang(id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'hargaPerUnit' && Number(value) < 100) {
      setError('Harga per unit harus minimal Rp100.');
    } else if (name === 'jumlahBarang' && Number(value) < 1) {
      setError('Jumlah barang harus minimal 1.');
    } else {
      setError('');
    }

    setEditableData({
      ...editableData,
      [name]: name === 'jumlahBarang' || name === 'hargaPerUnit' ? Number(value) : value,
    });
  };

  const handleSave = (id: number) => {
    if (editableData.hargaPerUnit < 100) {
      setError('Harga per unit harus minimal Rp100.');
      return;
    }
    if (editableData.jumlahBarang < 1) {
      setError('Jumlah barang harus minimal 1.');
      return;
    }

    // Logika untuk menyimpan perubahan ke server bisa ditambahkan di sini
    console.log('Data disimpan', typeof editableData.tanggalMasuk);
    editBarang(id, editableData);
    setIsEditing(false);
  };

  return (
    <tr key={id} className="hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <input
            type="text"
            name="namaBarang"
            value={editableData.namaBarang}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          namaBarang
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <select
            name="kategori"
            value={editableData.kategori}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Elektronik">Elektronik</option>
            <option value="Pakaian">Pakaian</option>
            <option value="Makanan">Makanan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        ) : (
          kategori
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <input
            type="number"
            name="jumlahBarang"
            value={editableData.jumlahBarang}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        ) : (
          jumlahBarang
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <input
            type="number"
            name="hargaPerUnit"
            value={editableData.hargaPerUnit}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            min="100"
          />
        ) : (
          `Rp. ${new Intl.NumberFormat('id-ID').format(jumlahBarang * hargaPerUnit)}`
        )}
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <input
            type="date"
            name="tanggalMasuk"
            value={editableData.tanggalMasuk.toString()}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            max={new Date().toISOString().split('T')[0]}
          />
        ) : (
          tanggalMasuk.toDateString()
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <button
            className="bg-green-500 text-white px-2 py-1 mr-2 rounded hover:bg-green-700"
            onClick={() => handleSave(id!)}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-2 py-1 mr-2 rounded hover:bg-blue-700"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        <button
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
          onClick={() => handleDelete(id!)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BarangItem;
