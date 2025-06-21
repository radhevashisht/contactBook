import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ContactContext } from "../context/ContactContext";
import { toast } from "react-toastify";

const ViewContactDetail = () => {
  const { id } = useParams();
  const { contacts, deleteContact } = useContext(ContactContext);
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundContact = contacts.find((c) => c.id === id);
    if (foundContact) {
      setContact(foundContact);
    } else {
      toast.error("Contact not found");
      navigate("/");
    }
  }, [id, contacts, navigate]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteContact(contact.id);
      toast.success("Contact deleted successfully");
      navigate("/");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

  if (!contact) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="text-primary mb-1">
                <i className="bi bi-person-circle me-2"></i>
                Contact Details
              </h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none">
                      <i className="bi bi-house me-1"></i>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {contact.name}
                  </li>
                </ol>
              </nav>
            </div>
            <div className="d-flex gap-2">
              <Link to={`/edit/${contact.id}`} className="btn btn-primary">
                <i className="bi bi-pencil me-2"></i>
                Edit Contact
              </Link>
              <button onClick={handleDelete} className="btn btn-outline-danger">
                <i className="bi bi-trash me-2"></i>
                Delete
              </button>
            </div>
          </div>

          {/* Contact Card */}
          <div className="card shadow border-0">
            <div className="card-body p-0">
              {/* Basic Information */}
              <div className="p-4 border-bottom bg-light">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div
                      className="contact-avatar bg-primary rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <i className="bi bi-person text-white fs-1"></i>
                    </div>
                  </div>
                  <div className="col">
                    <h3 className="mb-1 text-primary">{contact.name}</h3>
                    <p className="text-muted mb-2">
                      <i className="bi bi-people me-2"></i>
                      {formatRelationship(contact.relationship)}
                    </p>
                    <div className="d-flex flex-wrap gap-3">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-envelope text-muted me-2"></i>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-decoration-none"
                        >
                          {contact.email}
                        </a>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-telephone text-muted me-2"></i>
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-decoration-none"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="row">
                  {/* Personal Information */}
                  <div className="col-md-6">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-header bg-transparent border-0">
                        <h5 className="mb-0 text-primary">
                          <i className="bi bi-person-badge me-2"></i>
                          Personal Information
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="form-label text-muted small">
                            Birthday
                          </label>
                          <p className="mb-0">
                            <i className="bi bi-calendar me-2"></i>
                            {formatDate(contact.birthday)}
                          </p>
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-muted small">
                            Relationship
                          </label>
                          <p className="mb-0">
                            <i className="bi bi-people me-2"></i>
                            {formatRelationship(contact.relationship)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="col-md-6">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-header bg-transparent border-0">
                        <h5 className="mb-0 text-primary">
                          <i className="bi bi-geo-alt me-2"></i>
                          Address Information
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="form-label text-muted small">
                            City
                          </label>
                          <p className="mb-0">
                            <i className="bi bi-building me-2"></i>
                            {contact.city || "Not specified"}
                          </p>
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-muted small">
                            State
                          </label>
                          <p className="mb-0">
                            <i className="bi bi-map me-2"></i>
                            {contact.state || "Not specified"}
                          </p>
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-muted small">
                            Zip Code
                          </label>
                          <p className="mb-0">
                            <i className="bi bi-pin-map me-2"></i>
                            {contact.zipCode || "Not specified"}
                          </p>
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-muted small">
                            Country
                          </label>
                          <p className="mb-0">
                            <i className="bi bi-globe me-2"></i>
                            {contact.country || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                {(contact.facebook ||
                  contact.whatsapp ||
                  contact.twitter ||
                  contact.instagram ||
                  contact.linkedin) && (
                  <div className="card mt-4 border-0 bg-light">
                    <div className="card-header bg-transparent border-0">
                      <h5 className="mb-0 text-primary">
                        <i className="bi bi-share me-2"></i>
                        Social Media Links
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        {contact.facebook && (
                          <div className="col-md-6 mb-3">
                            <div className="d-flex align-items-center">
                              <i className="bi bi-facebook text-primary me-3 fs-4"></i>
                              <div>
                                <label className="form-label text-muted small mb-1">
                                  Facebook
                                </label>
                                <p className="mb-0">
                                  <a
                                    href={contact.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                  >
                                    {contact.facebook}
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        {contact.whatsapp && (
                          <div className="col-md-6 mb-3">
                            <div className="d-flex align-items-center">
                              <i className="bi bi-whatsapp text-primary me-3 fs-4"></i>
                              <div>
                                <label className="form-label text-muted small mb-1">
                                  whatsapp
                                </label>
                                <p className="mb-0">
                                  <a
                                    href={contact.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                  >
                                    {contact.whatsapp}
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        {contact.twitter && (
                          <div className="col-md-6 mb-3">
                            <div className="d-flex align-items-center">
                              <i className="bi bi-twitter text-info me-3 fs-4"></i>
                              <div>
                                <label className="form-label text-muted small mb-1">
                                  Twitter
                                </label>
                                <p className="mb-0">
                                  <a
                                    href={contact.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                  >
                                    {contact.twitter}
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        {contact.instagram && (
                          <div className="col-md-6 mb-3">
                            <div className="d-flex align-items-center">
                              <i className="bi bi-instagram text-danger me-3 fs-4"></i>
                              <div>
                                <label className="form-label text-muted small mb-1">
                                  Instagram
                                </label>
                                <p className="mb-0">
                                  <a
                                    href={contact.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                  >
                                    {contact.instagram}
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        {contact.linkedin && (
                          <div className="col-md-6 mb-3">
                            <div className="d-flex align-items-center">
                              <i className="bi bi-linkedin text-primary me-3 fs-4"></i>
                              <div>
                                <label className="form-label text-muted small mb-1">
                                  LinkedIn
                                </label>
                                <p className="mb-0">
                                  <a
                                    href={contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                  >
                                    {contact.linkedin}
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes */}
                {contact.notes && (
                  <div className="card mt-4 border-0 bg-light">
                    <div className="card-header bg-transparent border-0">
                      <h5 className="mb-0 text-primary">
                        <i className="bi bi-sticky me-2"></i>
                        Notes
                      </h5>
                    </div>
                    <div className="card-body">
                      <p className="mb-0">{contact.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContactDetail;
