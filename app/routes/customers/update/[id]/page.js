"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function UpdateCustomer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/customer/${id}`)
      .then((response) => {
        const { name, email } = response.data;
        setName(name);
        setEmail(email);
      })
      .catch((error) => {
        console.error("Error fetching customer:", error);
        setError("Terjadi kesalahan dalam mengambil data pelanggan.");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Nama dan email diperlukan.");
      return;
    }

    try {
      await axios.put(`/api/customer/${id}`, { name, email });
      setSuccess("Pelanggan berhasil diperbarui!");
      setError("");
      router.push("/routes/customers");
    } catch (error) {
      console.error("Error updating customer:", error);
      setError("Terjadi kesalahan dalam memperbarui pelanggan.");
    }
  };

  return (
    <div className="my-auto mx-auto text-center">
      <h1 className="text-center mb-4">Perbarui Data Pelanggan</h1>
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
            Perbarui Pelanggan
          </button>
        </div>
      </form>
    </div>
  );
}
