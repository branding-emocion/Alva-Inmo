"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, Facebook, Youtube, Linkedin } from "lucide-react";

const menuItems = [
  { name: "INICIO", href: "/" },
  { name: "QUIENES SOMOS", href: "/#quienes-somos" },
  { name: "COMPRAR", href: "/#comprar" },
  { name: "VENDE CON NOSOTROS", href: "/#vender" },
  { name: "CONTÁCTANOS", href: "/#contacto" },
  { name: "BLOG", href: "/#blog" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const headerVariants = {
    top: { backgroundColor: "rgba(255, 255, 255, 0)", boxShadow: "none" }, // Sin fondo ni sombra al inicio
    scrolled: {
      backgroundColor: "#fff",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    }, // Fondo blanco con sombra al hacer scroll
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all w-full h-[120px]"
      initial="top"
      animate={isScrolled ? "scrolled" : "top"}
      variants={headerVariants}
      transition={{ duration: 0.3 }} // Duración suave para la transición
    >
      {" "}
      <div className="bg-gray-800 text-white py-2 px-4 md:px-8">
        {" "}
        <div className="w-full flex justify-between items-center">
          {" "}
          <div className=" flex items-center space-x-4">
            {" "}
            <a href="tel:+51998454761" className="hidden md:flex items-center">
              {" "}
              <Phone className="w-4 h-4 mr-2" />{" "}
              <span className="text-sm">+51-998-454-761</span>{" "}
            </a>{" "}
            <a
              href="mailto:katya@alvainmobiliarios.com"
              className="flex items-center"
            >
              {" "}
              <Mail className="w-4 h-4 mr-2" />{" "}
              <span className="text-sm">katya@alvainmobiliarios.com</span>{" "}
            </a>{" "}
          </div>{" "}
          <div className="hidden md:flex items-center space-x-4">
            {" "}
            <a href="#" aria-label="Facebook">
              {" "}
              <Facebook className="w-4 h-4" />{" "}
            </a>{" "}
            <a href="#" aria-label="YouTube">
              {" "}
              <Youtube className="w-4 h-4" />{" "}
            </a>{" "}
            <a href="#" aria-label="LinkedIn">
              {" "}
              <Linkedin className="w-4 h-4" />{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <nav className="w-full  bg-opacity-50">
        {" "}
        <div className="flex justify-between items-center h-full">
          {" "}
          <Link href="/">
            {" "}
            <img
              src="/Logo.png"
              alt="Alva Negocios Inmobiliarios"
              className="h-12 md:h-16"
            />{" "}
          </Link>{" "}
          <div className="hidden md:flex items-center space-x-6">
            {" "}
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-black hover:text-yellow-500 transition-colors text-shadow"
              >
                {" "}
                {item.name}{" "}
              </Link>
            ))}{" "}
            <a
              href="tel:+51998454761"
              className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors font-bold text-shadow"
            >
              {" "}
              +51-998-454-761{" "}
            </a>{" "}
          </div>{" "}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {" "}
            {isMobileMenuOpen ? "✕" : "☰"}{" "}
          </button>{" "}
        </div>{" "}
      </nav>{" "}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg"
        >
          {" "}
          <div className="container mx-auto px-4 py-4">
            {" "}
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-800 hover:text-yellow-500 transition-colors"
              >
                {" "}
                {item.name}{" "}
              </Link>
            ))}{" "}
            <a
              href="tel:+51998454761"
              className="block py-2 text-yellow-500 font-bold"
            >
              {" "}
              +51-998-454-761{" "}
            </a>{" "}
          </div>{" "}
        </motion.div>
      )}{" "}
    </motion.header>
  );
}
