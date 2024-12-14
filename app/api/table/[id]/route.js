import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = await params;
  const { tableName, capacity } = await req.json();

  if (!tableName || !capacity) {
    return NextResponse.json(
      { error: "Nama tabel dan kapasitas diperlukan" },
      { status: 400 }
    );
  }

  try {
    const [result] = await pool.query(
      "UPDATE tables SET table_name = ?, capacity = ? WHERE id = ?",
      [tableName, capacity, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Tabel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ id, tableName, capacity }, { status: 200 });
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
