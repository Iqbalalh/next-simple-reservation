import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const [tables] = await pool.query("SELECT * FROM tables");
    return NextResponse.json(tables, { status: 200 });
  } catch (error) {
    console.error("Error fetching tables:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan dalam mengambil data tabel" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { tableName, capacity } = await req.json();

    if (!tableName || !capacity) {
      return NextResponse.json(
        { error: "Nama tabel dan kapasitas diperlukan" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      "INSERT INTO tables (table_name, capacity) VALUES (?, ?)",
      [tableName, capacity]
    );

    const newTable = { id: result.insertId, tableName, capacity };
    return NextResponse.json(newTable, { status: 201 });
  } catch (error) {
    console.error("Error creating table:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan dalam membuat tabel baru" },
      { status: 500 }
    );
  }
}
