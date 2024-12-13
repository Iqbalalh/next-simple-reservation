"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function UpdateReservation() {
  const { id } = useParams();
  const [customerId, setCustomerId] = useState("");
  const [tableId, setTableId] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/reservation/${id}`)
      .then((response) => {
        const reservation = response.data;
        setCustomerId(reservation.customerId);
        setTableId(reservation.tableId);
        setDate(reservation.date);
      })
      .catch((error) => {
        console.error("Error fetching reservation:", error);
        setError("Terjadi kesalahan saat memuat pemesanan.");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/reservation/${id}`, {
        customerId,
        tableId,
        date,
      });
      router.push("/routes/reservations");
    } catch (error) {
      setError("Terjadi kesalahan saat memperbarui pemesanan.");
      console.error("Error updating reservation:", error);
    }
  };

  return (
    <div className="my-auto mx-auto text-center">
      <h1 className="text-center mb-4">Perbarui Pemesanan</h1>
      {error && <p className="text-red-600">{error}</p>}
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
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Perbarui Pemesanan
        </button>
      </form>
    </div>
  );
}
