import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import ContactForm from "../components/ContactForm";

const AddContact = () => {
  const { addContact } = useContext(ContactContext);
  const navigate = useNavigate();

  const handleAdd = (values) => {
    addContact(values);
    toast.success("Contact added");
    navigate("/");
  };

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
                <i className="bi bi-person-plus me-2"></i>
                Add New Contact
              </h2>
            </div>
          </div>
        </div>
      </div>
      <ContactForm
        initialValues={{
          name: "",
          email: "",
          phone: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          facebook: "",
          twitter: "",
          instagram: "",
          linkedin: "",
          birthday: "",
          relationship: "",
          notes: "",
        }}
        onSubmit={handleAdd}
      />
    </div>
  );
};

export default AddContact;
