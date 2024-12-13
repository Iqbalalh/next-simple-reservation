"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function UpdateTablePage({ params }) {
  const [name, setName] = useState("");
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
        setName(table.name);
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

    if (!name || !capacity) {
      setError("Nama dan kapasitas meja diperlukan.");
      return;
    }

    try {
      const updatedTable = { name, capacity };
      await axios.put(`/api/table/${id}`, updatedTable);
      router.push("/routes/tables"); // Redirect to table list after update
    } catch (error) {
      console.error("Error updating table:", error);
      setError("Terjadi kesalahan saat memperbarui meja.");
    }
  };

  return (
    <div className="my-auto mx-auto text-center">
      <h1 className="text-center mb-4">Update Meja</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2">
            Nama Meja
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Perbarui Meja
          </button>
        </div>
      </form>
    </div>
  );
}
