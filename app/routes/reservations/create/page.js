"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateReservation() {
  const [customerId, setCustomerId] = useState("");
  const [tableId, setTableId] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/reservation", {
        customerId,
        tableId,
        date,
      });
      router.push("/routes/reservations");
    } catch (error) {
      setError("Terjadi kesalahan saat membuat pemesanan");
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div className="my-auto mx-auto text-center">
      <h1 className="text-center mb-4">Tambah Pemesanan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="customerId" className="block">Pelanggan ID</label>
          <input
            type="text"
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="border-2 border-gray-300 p-2"
          />
        </div>
        <div>
          <label htmlFor="tableId" className="block">Meja ID</label>
          <input
            type="text"
            id="tableId"
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            className="border-2 border-gray-300 p-2"
          />
        </div>
        <div>
          <label htmlFor="date" className="block">Tanggal</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-2 border-gray-300 p-2"
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Tambah Pemesanan
        </button>
      </form>
    </div>
  );
}
