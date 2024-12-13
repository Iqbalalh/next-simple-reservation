"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Customer } from "@/app/models/Customer";
import Link from "next/link";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/customer")
      .then((response) => {
        const customerData = response.data.map(
          (customer) => new Customer(customer.id, customer.name, customer.email)
        );
        setCustomers(customerData);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/customer/${id}`);
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="my-auto mx-auto text-center">
      <h1 className="text-center mb-4">
        Pelanggan <Link href={"/routes/customers/create"}>Tambah</Link>
      </h1>
      <table className="border-4 border-black">
        <thead>
          <tr>
            <th className="border-4 border-black">ID</th>
            <th className="border-4 border-black">Nama</th>
            <th className="border-4 border-black">Email</th>
            <th className="border-4 border-black">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                Tidak ada data pelanggan.
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td className="border-4 border-black">{customer.id}</td>
                <td className="border-4 border-black">{customer.name}</td>
                <td className="border-4 border-black">{customer.email}</td>
                <td className="border-4 border-black">
                  <Link href={`/routes/customers/update/${customer.id}`}>
                    <button className="mr-2 text-blue-600">Update</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
