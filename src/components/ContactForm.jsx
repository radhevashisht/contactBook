import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const ContactForm = ({ onSubmit, initialValues }) => {
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Required")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: yup.string().email("Invalid email format").required("Required"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(
        /^[6-9]\d{9}$/,
        "Phone number must be 10 digits and start with 6-9"
      ),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zipCode: yup
      .string()
      .required("Zip code is required")
      .matches(/^\d{5,6}$/, "Zip code must be 5-6 digits"),
    country: yup.string().required("Country is required"),
    facebook: yup.string().url("Must be a valid URL"),
    twitter: yup.string().url("Must be a valid URL"),
    instagram: yup.string().url("Must be a valid URL"),
    linkedin: yup.string().url("Must be a valid URL"),
    birthday: yup.date().max(new Date(), "Birthday cannot be in the future"),
    relationship: yup.string().required("Relationship is required"),
    notes: yup.string().max(500, "Notes cannot exceed 500 characters"),
  });

  const relationshipOptions = [
    { value: "", label: "Select relationship" },
    { value: "me", label: "Me" },
    { value: "friend", label: "Friend" },
    { value: "family", label: "Family" },
    { value: "colleague", label: "Colleague" },
    { value: "client", label: "Client" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow border-0">
            <div className="card-header border-bottom">
              <h4 className="mb-0 text-primary">
                <i className="bi bi-person-plus me-2"></i>
                Contact Information
              </h4>
            </div>
            <div className="card-body p-4">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
              >
                <Form>
                  {/* Basic Information */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          <i className="bi bi-person me-2"></i>
                          Full Name *
                        </label>
                        <Field
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Enter full name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="relationship" className="form-label">
                          <i className="bi bi-people me-2"></i>
                          Relationship *
                        </label>
                        <Field
                          as="select"
                          name="relationship"
                          id="relationship"
                          className="form-select"
                        >
                          {relationshipOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="relationship"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          <i className="bi bi-envelope me-2"></i>
                          Email Address *
                        </label>
                        <Field
                          name="email"
                          id="email"
                          type="email"
                          className="form-control"
                          placeholder="Enter email address"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          <i className="bi bi-telephone me-2"></i>
                          Phone Number *
                        </label>
                        <Field
                          name="phone"
                          id="phone"
                          className="form-control"
                          placeholder="Enter 10-digit phone number"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="birthday" className="form-label">
                          <i className="bi bi-calendar me-2"></i>
                          Birthday
                        </label>
                        <Field
                          name="birthday"
                          id="birthday"
                          type="date"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="birthday"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="card mt-4 mb-4">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="bi bi-geo-alt me-2"></i>
                        Address Information
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="city" className="form-label">
                              City *
                            </label>
                            <Field
                              name="city"
                              id="city"
                              className="form-control"
                              placeholder="Enter city"
                            />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-danger small mt-1"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="state" className="form-label">
                              State *
                            </label>
                            <Field
                              name="state"
                              id="state"
                              className="form-control"
                              placeholder="Enter state"
                            />
                            <ErrorMessage
                              name="state"
                              component="div"
                              className="text-danger small mt-1"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="zipCode" className="form-label">
                              Zip Code *
                            </label>
                            <Field
                              name="zipCode"
                              id="zipCode"
                              className="form-control"
                              placeholder="Enter zip code"
                            />
                            <ErrorMessage
                              name="zipCode"
                              component="div"
                              className="text-danger small mt-1"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="country" className="form-label">
                              Country *
                            </label>
                            <Field
                              name="country"
                              id="country"
                              className="form-control"
                              placeholder="Enter country"
                            />
                            <ErrorMessage
                              name="country"
                              component="div"
                              className="text-danger small mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Section */}
                  <div className="card mb-4">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="bi bi-share me-2"></i>
                        Social Media Links
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="facebook" className="form-label">
                              <i className="bi bi-facebook me-2"></i>
                              Facebook
                            </label>
                            <Field
                              name="facebook"
                              id="facebook"
                              type="url"
                              className="form-control"
                              placeholder="https://facebook.com/username"
                            />
                            <ErrorMessage
                              name="facebook"
                              component="div"
                              className="text-danger small mt-1"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="whatsapp" className="form-label">
                              <i className="bi bi-whatsapp me-2"></i>
                              WhatsApp
                            </label>
                            <Field
                              name="whatsapp"
                              id="whatsapp"
                              type="url"
                              className="form-control"
                              placeholder="https://wa.me/PhoneNumber"
                            />
                            <ErrorMessage
                              name="whatsapp"
                              component="div"
                              className="text-danger small mt-1"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="twitter" className="form-label">
                              <i className="bi bi-twitter me-2"></i>
                              Twitter
                            </label>
                            <Field
                              name="twitter"
                              id="twitter"
                              type="url"
                              className="form-control"
                              placeholder="https://twitter.com/username"
                            />
                            <ErrorMessage
                              name="twitter"
                              component="div"
                              className="text-danger small mt-1"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="instagram" className="form-label">
                              <i className="bi bi-instagram me-2"></i>
                              Instagram
                            </label>
                            <Field
                              name="instagram"
                              id="instagram"
                              type="url"
                              className="form-control"
                              placeholder="https://instagram.com/username"
                            />
                            <ErrorMessage
                              name="instagram"
                              component="div"
                              className="text-danger small mt-1"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="linkedin" className="form-label">
                              <i className="bi bi-linkedin me-2"></i>
                              LinkedIn
                            </label>
                            <Field
                              name="linkedin"
                              id="linkedin"
                              type="url"
                              className="form-control"
                              placeholder="https://linkedin.com/in/username"
                            />
                            <ErrorMessage
                              name="linkedin"
                              component="div"
                              className="text-danger small mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="mb-4">
                    <label htmlFor="notes" className="form-label">
                      <i className="bi bi-sticky me-2"></i>
                      Notes
                    </label>
                    <Field
                      as="textarea"
                      name="notes"
                      id="notes"
                      className="form-control"
                      rows="4"
                      placeholder="Enter any additional notes about this contact..."
                    />
                    <ErrorMessage
                      name="notes"
                      component="div"
                      className="text-danger small mt-1"
                    />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      <i className="bi bi-check-circle me-2"></i>
                      Save Contact
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
