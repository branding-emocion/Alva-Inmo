"use client";
import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", { name, number, email });
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
          <h2 className="text-2xl font-bold mb-4">Escribenos</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nombre *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-[#2a2a36] rounded"
              required
            />
            <input
              type="tel"
              placeholder="Numero *"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full p-2 bg-[#2a2a36] rounded"
              required
            />
            <input
              type="email"
              placeholder="Correo *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-[#2a2a36] rounded"
              required
            />
            <button
              type="submit"
              className="w-full p-2 bg-[#ff5722] text-white rounded hover:bg-[#e64a19] transition-colors"
            >
              Contacto
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="w-full md:w-1/4">
          <h2 className="text-2xl font-bold mb-4">Contacto</h2>
          <p className="mb-2">Katya ALva Correa</p>
          <div className="flex items-center mb-2">
            <MapPin size={18} className="mr-2" />
            <p>Calle Los Olivos 402 Huanchaco</p>
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
      <div className="mt-12 text-center relative z-10">
        <p>&copy; {new Date().getFullYear()} by Alva Negocios Inmobiliarios</p>
      </div>
    </footer>
  );
}
