"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Reservation } from "@/app/models/Reservation";
import Link from "next/link";

export default function ReservationPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios
      .get("/api/reservation")
      .then((response) => {
        const reservationData = response.data.map(
          (reservation) => new Reservation(reservation.id, reservation.customerId, reservation.tableId, reservation.date)
        );
        setReservations(reservationData);
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/reservation/${id}`);
      setReservations(reservations.filter((reservation) => reservation.id !== id));
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <div className="my-auto mx-auto text-center">
      <h1 className="text-center mb-4">
        Pemesanan <Link href={"/routes/reservations/create"}>Tambah</Link>
      </h1>
      <table className="border-4 border-black">
        <thead>
          <tr>
            <th className="border-4 border-black">ID</th>
            <th className="border-4 border-black">Pelanggan ID</th>
            <th className="border-4 border-black">Meja ID</th>
            <th className="border-4 border-black">Tanggal</th>
            <th className="border-4 border-black">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                Tidak ada data pemesanan.
              </td>
            </tr>
          ) : (
            reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="border-4 border-black">{reservation.id}</td>
                <td className="border-4 border-black">{reservation.customerId}</td>
                <td className="border-4 border-black">{reservation.tableId}</td>
                <td className="border-4 border-black">{reservation.date}</td>
                <td className="border-4 border-black">
                  <Link href={`/routes/reservations/update/${reservation.id}`}>
                    <button className="mr-2 text-blue-600">Update</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(reservation.id)}
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
