import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await axios.get("/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (contact) => {
    const res = await axios.post("/contacts", contact);
    setContacts([...contacts, res.data]);
  };

  const deleteContact = async (id) => {
    await axios.delete(`/contacts/${id}`);
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const updateContact = async (id, updatedData) => {
    try {
      const res = await axios.put(`/contacts/${id}`, updatedData);
      setContacts(contacts.map((c) => (c.id === id ? res.data : c)));
    } catch (error) {
      console.error("Failed to update contact:", error);
      toast.error(`Failed to update contact: ${error.message}`);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addContact,
        deleteContact,
        updateContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
