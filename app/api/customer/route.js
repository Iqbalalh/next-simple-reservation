import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const asda = req.query;
  try {
    const [customers] = await pool.query("SELECT * FROM customers");
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan dalam mengambil data pelanggan" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name, email } = await req.json();
    if (!name || !email) {
      return NextResponse.json(
        { error: "Nama dan email diperlukan" },
        { status: 400 }
      );
    }
    const [result] = await pool.query(
      "INSERT INTO customers (name, email) VALUES (?, ?)",
      [name, email]
    );

    const newCustomer = { id: result.insertId, name, email };
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan dalam membuat pelanggan baru" },
      { status: 500 }
    );
  }
}
