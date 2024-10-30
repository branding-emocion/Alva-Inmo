"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ImagenZoom from "./ImagenZoom";

const CarrouselProductosImagenes = ({ Variantes, product, name }) => {
  return (
    <>
      <Carousel
        infiniteLoop
        autoPlay={false} // Desactiva el autoplay
        showThumbs={false}
        showStatus={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
              aria-label={label}
            >
              {"<"}
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
              aria-label={label}
            >
              {">"}
            </button>
          )
        }
      >
        {Variantes.map((img, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={img}
              alt={`Imagen ${index + 1}`}
              className="w-full h-[500px]  object-contain "
            />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default CarrouselProductosImagenes;
