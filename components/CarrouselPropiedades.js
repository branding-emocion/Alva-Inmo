"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ImagenZoom from "./ImagenZoom";

const CarrouselProductosImagenes = ({ Variantes, product, name }) => {
  return (
    <>
      <Carousel infiniteLoop autoPlay showThumbs={false} showStatus={false}>
        {Variantes.map((img, index) => (
          <div key={index} className="   ">
            <ImagenZoom src={img} Info={product} CategoriaState={name || ""} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default CarrouselProductosImagenes;
