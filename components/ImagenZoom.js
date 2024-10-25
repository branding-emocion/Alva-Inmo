import { HomeIcon } from "lucide-react";
import React, { useState } from "react";

function ImagenZoom({ src, Info, CategoriaState }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <div
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
      className="relative    max-w-[500px] max-h-[500px]  mx-auto  "
    >
      <div className=" absolute top-1 right-2 rounded-full bg-white">
        {/* <p className="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase  text-white sm:py-1 sm:px-3">
          {Marca || "No Marca"}
        </p> */}
        <div className="flex bg-white px-4 py-1 space-x-5 rounded-lg overflow-hidden shadow">
          <p className="flex items-center font-medium gap-x-1 capitalize text-gray-800">
            <HomeIcon className="w-5 h-5 " />
            {CategoriaState || "No Categoria"}
          </p>
        </div>
      </div>

      <img
        src={src}
        alt="Producto con zoom"
        className="  w-full h-full  object-contain"
      />
      {showZoom && (
        <div
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `-${coords.x}px -${coords.y}px`,
            backgroundSize: "200%",
            top: 0,
            left: 0,
            clipPath: `circle(50px at ${coords.x}px ${coords.y}px)`,
          }}
          className="absolute top-0 left-0 w-full h-full"
        ></div>
      )}
    </div>
  );
}

export default ImagenZoom;
