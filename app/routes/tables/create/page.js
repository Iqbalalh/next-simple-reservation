"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateTablePage() {
  const [tableName, setTableName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!tableName || !capacity) {
      setError("Nama dan kapasitas meja diperlukan.");
      return;
    }

    try {
      const newTable = { tableName, capacity };
      await axios.post("/api/table", newTable);
      router.push("/routes/tables"); // Redirect to table list after creation
    } catch (error) {
      console.error("Error creating table:", error);
      setError("Terjadi kesalahan saat menambah meja.");
    }
  };

  return (
    <div className="my-auto mx-auto text-center">
      <h1 className="text-center mb-4">Tambah Meja</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="table_name" className="block mb-2">
            Nama Meja
          </label>
          <input
            type="text"
            id="table_name"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className="border-2 border-gray-400 rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="capacity" className="block mb-2">
            Kapasitas Meja
          </label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="border-2 border-gray-400 rounded p-2 w-full"
            required
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Tambah Meja
          </button>
        </div>
      </form>
    </div>
  );
}
