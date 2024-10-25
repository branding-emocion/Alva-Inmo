import {
  Briefcase,
  CheckSquare,
  ShieldCheck,
  TrendingUp,
  Umbrella,
  Users,
} from "lucide-react";

export default function Valores() {
  const valores = [
    {
      titulo: "Transparencia",
      descripcion:
        "Creemos en la comunicación clara y abierta con nuestros clientes.",
      icono: <CheckSquare className="h-10 w-10 text-yellow-500" />,
    },
    {
      titulo: "Integridad",
      descripcion:
        "Actuamos con honestidad y responsabilidad en todas nuestras transacciones.",
      icono: <ShieldCheck className="h-10 w-10 text-yellow-500" />,
    },
    {
      titulo: "Compromiso",
      descripcion:
        "Estamos dedicados a satisfacer las necesidades de nuestros clientes.",
      icono: <Briefcase className="h-10 w-10 text-yellow-500" />,
    },
    {
      titulo: "Innovación",
      descripcion: "Nos mantenemos a la vanguardia del mercado inmobiliario.",
      icono: <TrendingUp className="h-10 w-10 text-yellow-500" />,
    },
    {
      titulo: "Responsabilidad",
      descripcion: "Cumplimos con nuestros compromisos en todos los proyectos.",
      icono: <Users className="h-10 w-10 text-yellow-500" />,
    },
    {
      titulo: "Profesionalismo",
      descripcion:
        "Nos aseguramos de actuar con el máximo nivel de profesionalismo.",
      icono: <Umbrella className="h-10 w-10 text-yellow-500" />,
    },
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Nuestros Valores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valores.map((valor, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-6">{valor.icono}</div>
              <h3 className="text-xl font-semibold mb-4">{valor.titulo}</h3>
              <p className="text-gray-600">{valor.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
