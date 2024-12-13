import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const [reservations] = await pool.query("SELECT * FROM reservations");
    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan dalam mengambil data reservasi" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { customerId, tableId, reservationDate, reservationTime } = await req.json();

    if (!customerId || !tableId || !reservationDate || !reservationTime) {
      return NextResponse.json(
        { error: "Customer ID, Table ID, Tanggal, dan Waktu reservasi diperlukan" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      "INSERT INTO reservations (customer_id, table_id, reservation_date, reservation_time) VALUES (?, ?, ?, ?)",
      [customerId, tableId, reservationDate, reservationTime]
    );

    const newReservation = { id: result.insertId, customerId, tableId, reservationDate, reservationTime };
    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan dalam membuat reservasi baru" },
      { status: 500 }
    );
  }
}
