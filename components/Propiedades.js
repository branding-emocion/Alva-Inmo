"use client";
import Image from "next/image";
import { Coins } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import ShowPropidad from "./ShowPropidad";
import { Button } from "./ui/button";

export default function ComprarSection() {
  const [propiedades, setPropiedades] = useState([]);
  const [ModalPropiedad, setModalPropiedad] = useState({
    Visible: false,
    Propiedad: {},
  });

  console.log("propiedades", propiedades);

  useEffect(() => {
    const fetchPropiedades = async () => {
      const q = query(
        collection(db, "Propiedades"),
        orderBy("CreatAt", "desc")
      );

      try {
        const querySnapshot = await getDocs(q);
        const propiedadesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPropiedades(propiedadesData);
      } catch (error) {
        console.error("Error fetching propiedades: ", error);
      }
    };

    fetchPropiedades();
  }, []);

  return (
    <>
      {ModalPropiedad.Visible && (
        <ShowPropidad
          OpenModal={ModalPropiedad}
          setOpenModal={setModalPropiedad}
        />
      )}
      <section id="comprar" className="py-16 bg-gray-50 relative">
        <div
          className="absolute inset-0 bg-repeat opacity-10  "
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm13.312 0L47.142 11.485 45.728 12.9l-7.9-7.9h-2.172zM32.57 0L41.056 8.485 39.64 9.9l-7.9-7.9h.828zm-6.284 0L18.8 7.485 20.214 8.9l7.9-7.9h-1.828zm12.57 0L47.142 8.485 45.728 9.9l-7.9-7.9h1.828zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zM28 0l-1.414 1.414 3.828 3.828L32.828 3.83 28 0zM0 5.373l1.414 1.414L4.242 4.242 0 0v5.373zM58.586 1.414L54.758 5.242l3.828 3.828L60 5.373V0l-1.414 1.414zM0 60V54.627l1.414 1.414L5.242 60H0zm0-7.071l6.485 6.485L8.9 58.586 0 49.687v3.242zm0-3.242l8.485 8.485L10.9 60H8.072L0 51.928v-2.242zM54.627 60L60 54.627v5.373h-5.373zM60 49.687L51.515 58.172l2.415 2.414L60 54.627v-4.94zm0-3.242L51.515 54.93l2.415 2.414L60 51.385v-4.94zM39.414 60l5.657-5.657L43.657 52.93 36.172 60h3.242zm-3.242 0l8.485-8.485L42.243 49.1l-7.9 7.9 1.828 3zM60 36.172L52.93 43.243l2.414 2.414L60 40.7v-4.53zm0-3.244L52.93 40.413l2.414 2.414L60 37.456v-4.528zM54.627 60L60 54.627v5.373h-5.373zM60 49.687L51.515 58.172l2.415 2.414L60 54.627v-4.94zm0-3.242L51.515 54.93l2.415 2.414L60 51.385v-4.94zM39.414 60l5.657-5.657L43.657 52.93 36.172 60h3.242zm-3.242 0l8.485-8.485L42.243 49.1l-7.9 7.9 1.828 3zM60 36.172L52.93 43.243l2.414 2.414L60 40.7v-4.53zm0-3.244L52.93 40.413l2.414 2.414L60 37.456v-4.528zM54.627 60L60 54.627v5.373h-5.373zM60 49.687L51.515 58.172l2.415 2.414L60 54.627v-4.94zm0-3.242L51.515 54.93l2.415 2.414L60 51.385v-4.94zM39.414 60l5.657-5.657L43.657 52.93 36.172 60h3.242zm-3.242 0l8.485-8.485L42.243 49.1l-7.9 7.9 1.828 3zM60 36.172L52.93 43.243l2.414 2.414L60 40.7v-4.53zm0-3.244L52.93 40.413l2.414 2.414L60 37.456v-4.528z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 uppercase">
            Propiedades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propiedades?.map((property) => (
              <div
                key={property?.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setModalPropiedad({
                    Visible: true,
                    Propiedad: property,
                  });
                }}
              >
                <div className="relative">
                  <img
                    src={property.Imagenes[0] || ""}
                    alt={property.TituloPropiedad}
                    className="w-full max-h-52 object-fill"
                  />
                  <div className="absolute -bottom-6 left-4">
                    <div className="bg-yellow-400 rounded-full p-3">
                      <Coins className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-8">
                  <h3 className="text-xl font-semibold mb-2">
                    {property?.TituloPropiedad}
                  </h3>

                  <div
                    className="  line-clamp-3    text-justify"
                    dangerouslySetInnerHTML={{
                      __html: property?.ContenidoPropiedad,
                    }}
                  />
                  <p className="text-gray-600 mb-4">{property.description}</p>
                  <Button className="w-full bg-[#f7b500] text-xl uppercase font-bold">
                    Más información
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
