import React from "react";

const Footer = () => {
  const getYear = new Date().getFullYear();
  return (
    <div>
      <footer className="py-4 mt-5 border-top">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="mb-0 text-secondary">Contact Book App</p>
              <small className="text-muted">
                © <span>{getYear}</span>
                <span> Radhe Vasisht</span>  Contact Book. All rights reserved.
              </small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
