"use client";
import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  const [InputValues, setInputValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/SendMailForm", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(InputValues),
      });

      const responseData = await response.json();

      alert(responseData?.message || "Error al enviar el formulario");

      e.target.reset();
    } catch (error) {
      console.log("error", error);

      alert("Error al enviar el formulario");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlerChange = (e) => {
    setInputValues({
      ...InputValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <footer className="bg-[#1c1c24] text-white py-12 relative overflow-hidden">
      {/* Hexagonal background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern
              id="hexagons"
              width="50"
              height="43.4"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(2)"
            >
              <polygon
                points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 flex flex-wrap justify-between items-start relative z-10">
        {/* Logo */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <img
            src="/iconoBlanco.png"
            alt="Alva Negocios Inmobiliarios"
            className=" h-full w-auto"
          />
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-4 text-[#eab308]">Escribenos</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nombre *"
              className="w-full p-2 bg-[#2a2a36] rounded"
              onChange={handlerChange}
              name="Nombre"
              required
            />
            <input
              type="tel"
              placeholder="Numero *"
              className="w-full p-2 bg-[#2a2a36] rounded"
              onChange={handlerChange}
              name="Numero"
              required
            />
            <input
              type="email"
              placeholder="Correo *"
              className="w-full p-2 bg-[#2a2a36] rounded"
              onChange={handlerChange}
              name="Correo"
              required
            />
            <Button
              type="submit"
              disaabled={isSubmitting}
              className="w-full p-2 bg-[#eab308] uppercase text-xl font-bold text-white rounded transition-colors"
            >
              Contacto
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="w-full md:w-1/4">
          <h2 className="text-2xl font-bold mb-4 text-[#eab308]">Contacto</h2>
          <p className="mb-2">Katya ALva Correa</p>
          <div className="flex items-center mb-2">
            <MapPin size={18} className="mr-2 tex" />
            <p>Calle Los Olivos 402 Huanchaco , Trujillo</p>
          </div>
          <div className="flex items-center mb-2">
            <MapPin size={18} className="mr-2" />
            <p>Av. Central 1131 Álamos de Monterrico, Lima.</p>
          </div>
          <div className="flex items-center mb-2">
            <Mail size={18} className="mr-2" />
            <a href="mailto:katya@alvainmobiliarios.com">
              katya@alvainmobiliarios.com
            </a>
          </div>
          <div className="flex items-center">
            <Phone size={18} className="mr-2" />
            <a href="tel:+51998454761">(+51) 998 454 761</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center relative z-10 text-[#eab308]">
        <p>&copy; {new Date().getFullYear()} by Alva Negocios Inmobiliarios</p>
      </div>
    </footer>
  );
}
