"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "@/app/models/Table";
import Link from "next/link";

export default function TablePage() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    axios
      .get("/api/table")
      .then((response) => {
        const tableData = response.data.map(
          (table) => new Table(table.id, table.table_name, table.capacity)
        );
        setTables(tableData);
      })
      .catch((error) => {
        console.error("Error fetching tables:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/table/${id}`);
      setTables(tables.filter((table) => table.id !== id));
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  };

  return (
    <div className="my-auto mx-auto text-center">
      <h1 className="text-center mb-4">
        Meja <Link href={"/routes/tables/create"}>Tambah</Link>
      </h1>
      <table className="border-4 border-black">
        <thead>
          <tr>
            <th className="border-4 border-black">ID</th>
            <th className="border-4 border-black">Nama</th>
            <th className="border-4 border-black">Kapasitas</th>
            <th className="border-4 border-black">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {tables.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                Tidak ada data meja.
              </td>
            </tr>
          ) : (
            tables.map((table) => (
              <tr key={table.id}>
                <td className="border-4 border-black">{table.id}</td>
                <td className="border-4 border-black">{table.tableName}</td>
                <td className="border-4 border-black">{table.capacity}</td>
                <td className="border-4 border-black">
                  <Link href={`/routes/tables/update/${table.id}`}>
                    <button className="mr-2 text-blue-600">Update</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(table.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
