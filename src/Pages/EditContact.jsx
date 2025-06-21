import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../context/ContactContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import { toast } from "react-toastify";
import axios from "../api/axios";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateContact } = useContext(ContactContext);
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/contacts/${id}`);
        setInitialValues(res.data);
        setError(null);
      } catch (err) {
        setError("Contact not found");
        setInitialValues(null);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  const handleUpdate = (values) => {
    updateContact(id, values);
    toast.success("Contact updated");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading contact information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-danger">
              <div className="card-body text-center">
                <i className="bi bi-exclamation-triangle text-danger display-1 mb-3"></i>
                <h4 className="text-danger">Error</h4>
                <p className="text-muted">{error}</p>
                <Link to="/" className="btn btn-primary">
                  <i className="bi bi-house me-2"></i>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center mb-4">
              <Link to="/" className="btn btn-outline-secondary me-3">
                <i className="bi bi-arrow-left me-2"></i>
                Back to Contacts
              </Link>
              <h2 className="mb-0 text-primary">
                <i className="bi bi-pencil-square me-2"></i>
                Edit Contact
              </h2>
            </div>
          </div>
        </div>
      </div>
      <ContactForm initialValues={initialValues} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditContact;
