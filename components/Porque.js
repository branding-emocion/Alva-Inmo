import Image from "next/image";
import { ClipboardList, Coins, Users } from "lucide-react";

export default function Porque2() {
  return (
    <section className="w-full py-12 bg-white relative ">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12">
          ¿Por qué elegirnos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            image="/feature-1.jpeg"
            icon={<ClipboardList className="h-6 w-6 text-gray-800" />}
            title="Experiencia comprobada"
            description="Conocemos el mercado y tenemos un historial de éxito en la compra, venta y alquiler de propiedades."
          />
          <Card
            image="/feature-2.jpeg"
            icon={<Coins className="h-6 w-6 text-gray-800" />}
            title="Asesoramiento personalizado"
            description="Adaptamos nuestros servicios a las necesidades específicas de cada cliente."
          />
          <Card
            image="/feature-3.jpeg"
            icon={<Users className="h-6 w-6 text-gray-800" />}
            title="Amplia red de contactos"
            description="Tenemos relaciones sólidas con desarrolladores, propietarios y otros agentes inmobiliarios."
          />
        </div>
      </div>
    </section>
  );
}

function Card({ image, icon, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        {/* <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          style={{
            objectFit: "cover",
          }}
        /> */}
        <img src={image} alt={title} className="object-cover" />
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-yellow-400 rounded-full p-4">{icon}</div>
        </div>
      </div>
      <div className="p-6 pt-10 text-center">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
