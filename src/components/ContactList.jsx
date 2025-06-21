import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ContactList = ({ contacts }) => {
  const { deleteContact } = useContext(ContactContext);

  const handleDelete = (contact) => {
    deleteContact(contact.id);
    toast.success("Contact deleted");
  };
  const formatRelationship = (relationship) => {
    const relationships = {
      me: "Me",
      friend: "Friend",
      family: "Family",
      colleague: "Colleague",
      client: "Client",
      other: "Other",
    };
    return relationships[relationship] || relationship;
  };

  return (
    <div>
      {contacts.length === 0 ? (
        <div className="text-center py-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <i className="bi bi-person-x display-1 text-muted mb-3"></i>
              <h4 className="text-muted">No contacts found</h4>
              <p className="text-muted">Start by adding your first contact!</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="col">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="contact-avatar bg-light rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <i className="bi bi-person text-secondary fs-4"></i>
                    </div>
                    <h5 className="card-title mb-0 text-primary">
                      {contact.name}
                    </h5>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-person text-secondary fs-6"></i>
                      <span className="text-muted">
                        {formatRelationship(contact.relationship)}
                      </span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-envelope text-muted me-2"></i>
                      <span className="text-muted">{contact.email}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-telephone text-muted me-2"></i>
                      <span className="text-muted">{contact.phone}</span>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <Link
                      to={`/view/${contact.id}`}
                      className="btn btn-outline-info btn-sm flex-fill"
                    >
                      <i className="bi bi-eye me-1"></i>
                      View
                    </Link>
                    <Link
                      to={`/edit/${contact.id}`}
                      className="btn btn-outline-primary btn-sm flex-fill"
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(contact)}
                      className="btn btn-outline-danger btn-sm flex-fill"
                    >
                      <i className="bi bi-trash me-1"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
