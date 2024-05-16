"use client";

import { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import ContactTable from "../components/ContactTable";

export default function Home() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contacts");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setContacts(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleSave = async (contact: any) => {
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const newContact = await res.json();
      setContacts([...contacts, newContact.data]);
    } catch (error) {
      console.error("Failed to save contact:", error);
    }
  };

  const handleUpdate = async (contact: any) => {
    try {
      const res = await fetch(`/api/contacts/${contact._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const updatedContact = await res.json();
      setContacts(
        contacts.map((c) =>
          c._id === updatedContact.data._id ? updatedContact.data : c
        )
      );
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Network response was not ok");
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  const handleEmail = async (selectedContacts: any[]) => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contacts: selectedContacts }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      {showForm && (
        <ContactForm onSave={handleSave} onClose={() => setShowForm(false)} />
      )}
      <div>
        <ContactTable
          contacts={contacts}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onEmail={handleEmail}
        />
      </div>
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-500 text-white p-2 rounded-md mb-4 hover:bg-green-600 transition-colors mt-5"
      >
        Add New Data
      </button>
    </div>
  );
}
