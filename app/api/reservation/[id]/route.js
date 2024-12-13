import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = await params;
  const { customerId, tableId, reservationDate, reservationTime } = await req.json();

  if (!customerId || !tableId || !reservationDate || !reservationTime) {
    return NextResponse.json(
      { error: "Customer ID, Table ID, Tanggal, dan Waktu reservasi diperlukan" },
      { status: 400 }
    );
  }

  try {
    const [result] = await pool.query(
      "UPDATE reservations SET customer_id = ?, table_id = ?, reservation_date = ?, reservation_time = ? WHERE id = ?",
      [customerId, tableId, reservationDate, reservationTime, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Reservasi tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ id, customerId, tableId, reservationDate, reservationTime }, { status: 200 });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan dalam memperbarui reservasi" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    const [result] = await pool.query("DELETE FROM reservations WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Reservasi tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Reservasi berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan dalam menghapus reservasi" },
      { status: 500 }
    );
  }
}
