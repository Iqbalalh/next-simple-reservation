"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  return (
    <div className="my-auto mx-auto">
      <Link href={"/routes/reservations"}>Pemesanan</Link>
      <Link href={"/routes/customers"}>Pelanggan</Link>
      <Link href={"/routes/tables"}>Meja</Link>
    </div>
  );
}
