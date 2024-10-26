"use client";
import { motion } from "framer-motion";
import { ClipboardCheck, Shield, Briefcase, Award, Leaf } from "lucide-react";

const valores = [
  {
    icon: <ClipboardCheck className="h-8 w-8" />,
    title: "Transparencia",
    description:
      "Nos comprometemos a una comunicación clara y honesta en todas nuestras interacciones.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Integridad",
    description:
      "Actuamos con ética y responsabilidad en cada aspecto de nuestro negocio.",
  },
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: "Compromiso",
    description:
      "Nos dedicamos plenamente a satisfacer las necesidades de nuestros clientes y comunidad.",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Profesionalismo",
    description:
      "Mantenemos los más altos estándares de calidad y excelencia en nuestro trabajo.",
  },
  {
    icon: <Leaf className="h-8 w-8" />,
    title: "Responsabilidad social",
    description:
      "El 3% de los ingresos de Alva Negocios Inmobiliarios se destinan para proyectos y obras sociales en el Alto Trujillo.",
  },
];

export default function NuestrosValores() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Nuestros Valores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valores.map((valor, index) => (
            <motion.div
              key={valor.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-yellow-400 p-3 rounded-full mr-4">
                  {valor.icon}
                </div>
                <h3 className="text-xl font-semibold">{valor.title}</h3>
              </div>
              <p className="text-gray-600">{valor.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
