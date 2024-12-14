"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function UpdateTablePage({ params }) {
  const [tableName, setTabletableName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    // Fetch table data to pre-fill the form
    axios
      .get(`/api/table/${id}`)
      .then((response) => {
        const table = response.data;
        setTabletableName(table.tableName);
        setCapacity(table.capacity);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
        setError("Tidak dapat mengambil data meja.");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!tableName || !capacity) {
      setError("Nama dan kapasitas meja diperlukan.");
      return;
    }

    try {
      const updatedTable = { tableName, capacity };
      await axios.put(`/api/table/${id}`, updatedTable);
      router.push("/routes/tables"); // Redirect to table list after update
    } catch (error) {
      console.error("Error updating table:", error);
      setError("Terjadi kesalahan saat memperbarui meja.");
    }
  };

  return (
    <div classtableName="my-auto mx-auto text-center">
      <h1 classtableName="text-center mb-4">Update Meja</h1>
      {error && <p classtableName="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} classtableName="space-y-4">
        <div>
          <label htmlFor="tableName" classtableName="block mb-2">
            Nama Meja
          </label>
          <input
            type="text"
            id="tableName"
            value={tableName}
            onChange={(e) => setTabletableName(e.target.value)}
            classtableName="border-2 border-gray-400 rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="capacity" classtableName="block mb-2">
            Kapasitas Meja
          </label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            classtableName="border-2 border-gray-400 rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            classtableName="bg-blue-500 text-white p-2 rounded w-full"
          >
            Perbarui Meja
          </button>
        </div>
      </form>
    </div>
  );
}
