import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = await params;
  const { tableName, tableCapacity } = await req.json();

  if (!tableName || !tableCapacity) {
    return NextResponse.json(
      { error: "Nama tabel dan kapasitas diperlukan" },
      { status: 400 }
    );
  }

  try {
    const [result] = await pool.query(
      "UPDATE tables SET table_name = ?, table_capacity = ? WHERE id = ?",
      [tableName, tableCapacity, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Tabel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ id, tableName, tableCapacity }, { status: 200 });
  } catch (error) {
    console.error("Error updating table:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan dalam memperbarui tabel" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    const [result] = await pool.query("DELETE FROM tables WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Tabel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Tabel berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting table:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan dalam menghapus tabel" },
      { status: 500 }
    );
  }
}
