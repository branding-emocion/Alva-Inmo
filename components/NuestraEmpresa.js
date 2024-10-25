import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";

export default function NuestraEmpresa() {
  return (
    <section id="quienes-somos" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          NUESTRA EMPRESA
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/alvaimg.jpeg"
              alt="Representante de Alva Negocios Inmobiliarios"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Somos Alva Negocios Inmobiliarios, una organización en permanente
              proceso de mejora continua de calidad de los servicios que venimos
              ofreciendo día a día, siendo competitivos a través de la eficacia
              y el profesionalismo y la permanente capacitación de nuestros
              agentes inmobiliarios y el equipo de soporte administrativo.
            </p>
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 flex items-start space-x-4">
                <Target className="w-8 h-8 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Nos especializamos en convertir tus sueños de propiedad en
                    realidad.
                  </h3>
                  <p className="text-sm opacity-90">
                    Nuestro enfoque es la Persona, y respondemos de manera
                    pronta en sus necesidades y requerimientos inmobiliarios,
                    brindándole su espacio y el tiempo que requieren.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
