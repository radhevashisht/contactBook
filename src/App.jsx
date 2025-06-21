import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContactProvider } from "./context/ContactContext";
import AddContact from "./Pages/AddContact";
import Home from "./Pages/Home";
import EditContact from "./Pages/EditContact";
import ViewContactDetail from "./components/ViewContactDetail";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";

const App = () => {
  return (
    <ContactProvider>
      <Router>
        <div className="min-vh-100 d-flex flex-column bg-light">
          <main className="flex-grow-1 py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddContact />} />
              <Route path="/edit/:id" element={<EditContact />} />
              <Route path="/view/:id" element={<ViewContactDetail />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </ContactProvider>
  );
};

export default App;
