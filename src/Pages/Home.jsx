import { useContext, useState } from "react";
import { ContactContext } from "../context/ContactContext";
import ContactList from "../components/ContactList";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const Home = () => {
  const { contacts } = useContext(ContactContext);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("all");

  const filteredContacts = contacts
    .filter((contact) => {
      if (selected === "all") {
        return true;
      }
      return contact.relationship === selected;
    })
    .filter(
      (contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase()) ||
        contact.phone.toLowerCase().includes(search.toLowerCase())
    );

  const categoryOptions = [
    { value: "all", label: "All" },
    { value: "me", label: "Me" },
    { value: "friend", label: "Friend" },
    { value: "family", label: "Family" },
    { value: "colleague", label: "Colleague" },
    { value: "client", label: "Client" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-primary mb-0">
              <i className="bi bi-person-lines-fill me-2"></i>
              Contact Book
            </h1>
            <Link to="/add" className="btn btn-success">
              <i className="bi bi-plus-circle me-2"></i>
              Add New Contact
            </Link>
          </div>
          <Formik>
            <Form>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <label
                        htmlFor="category"
                        className="form-label fw-semibold text-muted"
                      >
                        <i className="bi bi-people-fill me-2 text-primary"></i>
                        Filter by Category
                      </label>
                      <Field
                        as="select"
                        name="category"
                        id="category"
                        className="form-select form-select-lg border-0 bg-light"
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                      >
                        {categoryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <label
                        htmlFor="search"
                        className="form-label fw-semibold text-muted"
                      >
                        <i className="bi bi-search me-2 text-primary"></i>
                        Search Contacts
                      </label>
                      <input
                        type="text"
                        id="search"
                        placeholder="Enter name, email, or phone..."
                        className="form-control form-control-lg border-0 bg-light"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
          <ContactList contacts={filteredContacts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
