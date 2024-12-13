import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = await params;
  const { name, email } = await req.json();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Nama dan email diperlukan" },
      { status: 400 }
    );
  }

  try {
    const [result] = await pool.query(
      "UPDATE customers SET name = ?, email = ? WHERE id = ?",
      [name, email, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Pelanggan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ id, name, email }, { status: 200 });
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan dalam memperbarui pelanggan" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    const [result] = await pool.query("DELETE FROM customers WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Pelanggan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Pelanggan berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan dalam menghapus pelanggan" },
      { status: 500 }
    );
  }
}
