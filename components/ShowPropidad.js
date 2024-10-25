import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import CarrouselProductosImagenes from "./CarrouselPropiedades";

const ShowPropidad = ({ OpenModal, setOpenModal }) => {
  console.log("OpenModal", OpenModal);

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
              <h1 className="text-Secundario text-5xl uppercase">
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
                className="  line-clamp-4 text-gray-600  text-justify"
                dangerouslySetInnerHTML={{
                  __html: OpenModal?.Propiedad?.ContenidoPropiedad,
                }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowPropidad;
