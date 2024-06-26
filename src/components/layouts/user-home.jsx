import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Contact, About } from "../../pages";
import { Header, Footer,Login } from "../../components";
import { ProductDetail } from "../../commons";
const UserHome = () => {
  return (
    <>
      <Header />
      <Routes path="/">
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/sign-in" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserHome;
