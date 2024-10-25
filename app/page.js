import BlogSection from "@/components/BlogSection";
import RealEstateCarousel from "@/components/Carrousel";
import Footer from "@/components/Footer";
import ContactForm from "@/components/Formulario";
import Header from "@/components/Header";
import NuestraEmpresa from "@/components/NuestraEmpresa";
import Valores from "@/components/NuestrosValores";
import PorQueElegirnos from "@/components/Porque";
import ComprarSection from "@/components/Propiedades";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Header />

      <RealEstateCarousel />
      <PorQueElegirnos />
      <NuestraEmpresa />
      <Valores />
      <ComprarSection />

      <ContactForm />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default HomePage;
