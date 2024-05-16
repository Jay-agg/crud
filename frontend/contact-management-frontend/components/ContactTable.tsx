import { useState } from "react";

interface ContactTableProps {
  contacts: any[];
  onUpdate: (contact: any) => void;
  onDelete: (id: string) => void;
  onEmail: (selectedContacts: any[]) => void;
}

export default function ContactTable({
  contacts,
  onUpdate,
  onDelete,
  onEmail,
}: ContactTableProps) {
  const [selected, setSelected] = useState<any[]>([]);

  const handleSelect = (contact: any) => {
    if (selected.includes(contact)) {
      setSelected(selected.filter((item) => item !== contact));
    } else {
      setSelected([...selected, contact]);
    }
  };

  const handleEmail = () => {
    onEmail(selected);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Contact List</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr>
            <th className="p-4 border-b">
              <input type="checkbox" />
            </th>
            <th className="p-4 border-b">ID</th>
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Phone Number</th>
            <th className="p-4 border-b">Email</th>
            <th className="p-4 border-b">Hobbies</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={contact._id}>
              <td className="p-4 border-b">
                <input type="checkbox" onChange={() => handleSelect(contact)} />
              </td>
              <td className="p-4 border-b">{index + 1}</td>
              <td className="p-4 border-b">{contact.name}</td>
              <td className="p-4 border-b">{contact.phoneNumber}</td>
              <td className="p-4 border-b">{contact.email}</td>
              <td className="p-4 border-b">{contact.hobbies}</td>
              <td className="p-4 border-b">
                <button
                  onClick={() => onUpdate(contact)}
                  className="bg-yellow-500 text-white p-2 rounded-md mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(contact._id)}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleEmail}
        className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-700 transition-colors"
      >
        Send
      </button>
    </div>
  );
}
