import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import CarrouselProductosImagenes from "./CarrouselPropiedades";
import { PhoneCall, PhoneIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const ShowPropidad = ({ OpenModal, setOpenModal }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [InputValues, setInputValues] = useState({
    Interesado_En: OpenModal?.Propiedad?.TituloPropiedad,
  });
  const [IsSubmitting, setIsSubmitting] = useState(false);

  console.log(InputValues);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/SendMailForm", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(InputValues),
      });

      const responseData = await response.json();

      alert(responseData?.message || "Error al enviar el formulario");
      setIsContactOpen(false);
      e.target.reset();
    } catch (error) {
      alert("Error al enviar el formulario");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={OpenModal?.Visible}
      onOpenChange={() => {
        setOpenModal({
          Visible: false,
          Propiedad: {},
        });
      }}
    >
      <DialogContent className="h-auto w-[90%] md:w-full max-h-[95vh] overflow-auto sm:max-w-7xl">
        <DialogHeader className="w-full h-full">
          <DialogTitle>Descripción de la Propiedad</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div>
            <CarrouselProductosImagenes
              Variantes={OpenModal?.Propiedad?.Imagenes || []}
              product={OpenModal?.Propiedad}
              name={OpenModal?.Propiedad?.Destino}
            />
          </div>
          <div>
            <div className="md:flex-1 px-4 space-y-3 pb-4">
              <h1 className="text-Secundario text-2xl font-bold uppercase">
                {OpenModal?.Propiedad?.TituloPropiedad || ""}
              </h1>

              {/* {OpenModal?.Propiedad?.Produc?.Precio && (
                  <div className="flex items-center space-x-4 my-4">
                    <div className="flex gap-x-2">
                      <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                        <span className="font-bold text-Secundario text-3xl">
                          {Number(OpenModal?.Propiedad.Produc.Precio).toLocaleString(
                            "es-CO",
                            {
                              style: "currency",
                              currency: "COP",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )} */}

              <div
                className="  text-gray-600  text-justify"
                dangerouslySetInnerHTML={{
                  __html: OpenModal?.Propiedad?.ContenidoPropiedad,
                }}
              />

              <div className="flex flex-wrap gap-2   pt-4">
                <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-green-800  uppercase">
                      <PhoneCall className="h-6 w-6  " />
                      Contáctanos
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Formulario de Contacto</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input
                          id="name"
                          placeholder="Ingrese su nombre"
                          type="text"
                          onChange={(e) => {
                            setInputValues({
                              ...InputValues,
                              Nombre: e.target.value,
                            });
                          }}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="correo@ejemplo.com"
                          onChange={(e) => {
                            setInputValues({
                              ...InputValues,
                              Correo: e.target.value,
                            });
                          }}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="999999999"
                          onChange={(e) => {
                            setInputValues({
                              ...InputValues,
                              Telefono: e.target.value,
                            });
                          }}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Mensaje</Label>
                        <Textarea
                          id="message"
                          placeholder="Me interesa esta propiedad, quisiera más información..."
                          className="min-h-[100px]"
                          onChange={(e) => {
                            setInputValues({
                              ...InputValues,
                              Comentario: e.target.value,
                            });
                          }}
                          required
                        />
                      </div>
                      <Button
                        disabled={IsSubmitting}
                        className="w-full bg-green-800  uppercase"
                      >
                        Enviar Mensaje
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                {/* <a
                  href={``}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex place-items-center h-12 px-3 py-2 font-semibold rounded-xl bg-[#175e33] hover:opacity-50 text-white"
                >
                  <PhoneCall className=" h-6 w-6" />

                  <span className="ml-2">Contáctanos</span>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowPropidad;
