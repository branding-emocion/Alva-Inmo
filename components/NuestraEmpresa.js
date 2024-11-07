import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";

export default function NuestraEmpresa() {
  return (
    <section id="quienes-somos" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 uppercase">
          ¿Quiénes Somos?
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
              Alva negocios inmobiliarios, somos más que una inmobiliaria; somos
              un equipo comprometido en ayudarte a encontrar el lugar ideal para
              vivir o invertir. Nos especializamos en ofrecer soluciones
              inmobiliarias personalizadas que se ajustan a tus necesidades y
              expectativas, ya sea en la compra, venta o alquiler de
              propiedades.
            </p>
            <p className="text-lg text-gray-700">
              Nuestro objetivo es acompañarte en cada paso del proceso,
              proporcionandote herramientas que te permitan tomar decisiones
              informadas y seguras.
            </p>
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 flex items-start space-x-4">
                <Target className="w-8 h-8 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Estamos convencidos que cada cliente es único, por eso
                    dedicamos tiempo a entender tus deseos y necesidades y nos
                    asegurarnos de que cada experiencia con nosotros sea
                    positiva y satisfactoria.
                  </h3>
                  <p className="text-sm opacity-90">
                    En Alva Negocios Inmobiliarios ; Tu felicidad es el éxito de
                    nuestro trabajo.
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
