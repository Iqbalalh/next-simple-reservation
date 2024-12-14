import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const [reservations] = await pool.query(
      "SELECT id, customerId AS customerId, tableId, reservationDate FROM reservations"
    );
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
    const { customerId, tableId, reservationDate } = await req.json();

    if (!customerId || !tableId || !reservationDate) {
      return NextResponse.json(
        { error: "Customer ID, Table ID, dan Tanggal reservasi diperlukan" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      "INSERT INTO reservations (customerId, tableId, reservationDate) VALUES (?, ?, ?)",
      [customerId, tableId, reservationDate]
    );

    const newReservation = {
      id: result.insertId,
      customerId,
      tableId,
      reservationDate,
    };
    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan dalam membuat reservasi baru" },
      { status: 500 }
    );
  }
}
