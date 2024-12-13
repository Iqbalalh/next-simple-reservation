"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateCustomer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Nama dan email diperlukan.");
      return;
    }

    try {
      const response = await axios.post("/api/customer", { name, email });
      setSuccess("Pelanggan berhasil dibuat!");
      setName("");
      setEmail("");
      setError("");
      router.push("/routes/customers");
    } catch (error) {
      console.error("Error creating customer:", error);
      setError("Terjadi kesalahan dalam membuat pelanggan.");
    }
  };

  return (
    <div className="my-auto mx-auto text-center">
      <h1 className="text-center mb-4">Buat Pelanggan Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-left">
            Nama
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-left">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 p-2 w-full"
            required
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Buat Pelanggan
          </button>
        </div>
      </form>
    </div>
  );
}
