"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/banner/banner-1.jpeg",
    title: "Tu Felicidad es el éxito de nuestro trabajo",
    subtitle: "Compra, vende o alquila",
    buttonText: "Contáctanos",
  },
  {
    id: 2,
    image: "/banner/banner-2.jpeg",
    title: "Haz realidad tus sueños inmobiliarios",
    subtitle: "Compra, vende o alquila",
    buttonText: "Contáctanos",
  },
  // {
  //   id: 3,
  //   image: "/banner/banner-3.jpeg",
  //   title: "Haz realidad tus sueños inmobiliarios",
  //   subtitle: "Compra, vende o alquila",
  //   buttonText: "Contáctanos",
  // },
];

export default function RealEstateCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Cambia de slide cada 5 segundos
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel-container relative w-full h-[90vh] overflow-hidden mt-[120px]">
      <style jsx>{`
        @keyframes zoomIn {
          0% {
            transform: scale(1); /* Empieza en tamaño normal */
          }
          100% {
            transform: scale(1.1); /* Zoom al finalizar */
          }
        }

        .animate-zoom {
          animation: zoomIn 5000ms ease-in-out forwards;
        }
      `}</style>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${
            currentSlide === index ? "opacity-100" : "opacity-0"
          } absolute inset-0 transition-opacity duration-1000 ease-in-out`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-in-out transform ${
              currentSlide === index ? "scale-100 animate-zoom" : "scale-100"
            }`}
          />

          {/* Contenedor de texto */}
          <div className="absolute inset-0  flex items-center justify-start bg-gradient-to-r from-black/70 to-transparent">
            <div
              className={`max-w-lg p-8 lg:ml-28 bg-white/80 rounded-lg shadow-lg text-center transition-transform duration-1000 ease-in-out transform ${
                currentSlide === index ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <h3 className="text-yellow-500 font-semibold text-lg mb-2">
                {slide.subtitle}
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {slide.title}
              </h2>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-3 rounded-lg">
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Flecha izquierda */}
      <button
        onClick={previousSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:scale-110 transition-transform"
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>

      {/* Flecha derecha */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:scale-110 transition-transform"
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>
    </div>
  );
}
