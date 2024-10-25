"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formats, modules } from "@/lib/QuillConfig";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import FileUploader from "./FileUploader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { auth, db, storage } from "@/firebase/firebaseClient";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import useAuthState from "@/lib/useAuthState";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const ModalPropiedades = ({ OpenModal, setOpenModal }) => {
  const [{ user }, loading, error] = useAuthState(auth);

  const [InputValues, setInputValues] = useState({});
  const [files, setFiles] = useState([]);
  const [Loading, setLoading] = useState(false);
  const { toast } = useToast();
  const closeModal = () => {
    setOpenModal({
      Visible: false,
      InfoEditar: {},
    });
    setInputValues({});
  };

  const uploadImages = async (images, name) => {
    const urlLinks = await Promise.all(
      images.map(async (image, index) => {
        const imageRef = ref(
          storage,
          `ImagenesPropiedad/${name}/image-${index}.jpg`
        );
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        return url;
      })
    );
    return urlLinks;
  };

  const HandlerSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (Object.keys(OpenModal?.InfoEditar).length > 0) {
        if (Object.keys(InputValues).length > 0) {
          const UpdateRef = doc(
            db,
            "Propiedades",
            `${OpenModal?.InfoEditar?.id}`
          );

          // Set the "capital" field of the city 'DC'
          await updateDoc(UpdateRef, {
            ...InputValues,
          });
        }
        if (files?.length > 0) {
          // Borrar las imágenes antiguas
          const ImgRef = ref(
            storage,
            `ImagenesPropiedad/${OpenModal?.InfoEditar?.TituloPropiedad?.replace(
              /\s+/g,
              "_"
            )}/`
          );
          listAll(ImgRef)
            .then((res) => {
              res.items.forEach((itemRef) => {
                // Ahora debes borrar cada objeto (archivo)
                deleteObject(itemRef).catch((error) => {
                  // Maneja cualquier error
                  alert(` Error al eliminar ${itemRef.fullPath}`);
                  console.log(`Error al eliminar ${itemRef.fullPath}`, error);
                });
              });
            })
            .catch((error) => {
              // Maneja cualquier error
              console.error("Error al listar los objetos", error);
            });

          const NombreCarpeta =
            InputValues?.TituloPropiedad?.replace(/\s+/g, "_") ||
            OpenModal?.InfoEditar?.TituloPropiedad?.replace(/\s+/g, "_");

          // toca modificar la funcion y enviarle el values para que funcione mejor
          const ImagesUrl = await uploadImages(files, NombreCarpeta);

          const UpdateRef = doc(
            db,
            "Propiedades",
            `${OpenModal?.InfoEditar?.id}`
          );
          await updateDoc(UpdateRef, {
            Imagenes: ImagesUrl,
          });
        }
      } else {
        if (!files?.length > 0) {
          setLoading(false);
          alert("Por favor seleccione una imágen");

          return;
        }

        const NombreCarpeta = InputValues?.TituloPropiedad?.replace(
          /\s+/g,
          "_"
        );

        const ImagesUrl = await uploadImages(files, NombreCarpeta); // Asegúrate de que la promesa se haya resuelto

        const docRef = await addDoc(collection(db, "Propiedades"), {
          ...InputValues,
          Imagenes: ImagesUrl, // Ahora ImagesUrl es una matriz de cadenas de texto
          CreatAt: serverTimestamp(),
          NombreAutor: user?.displayName || "Miryam Roncal",
        });
      }
      setLoading(false);

      closeModal();
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description:
          "Ocurrió un error al intentar guardar, Por favor contacte con soporte",
      });

      console.log("err", error);
    }
  };

  const HandlerChange = (e) => {
    setInputValues({
      ...InputValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Dialog open={OpenModal?.Visible} onOpenChange={closeModal}>
      <DialogContent className="h-auto  w-[90%] md:w-full max-h-[95vh] overflow-auto   sm:max-w-4xl">
        <DialogHeader className="w-full h-full">
          <DialogTitle>
            {Object.keys(OpenModal?.InfoEditar).length > 0
              ? "Editar"
              : "Agregar"}{" "}
            Propiedad
          </DialogTitle>
          <DialogDescription>
            <form onSubmit={HandlerSubmit} className="space-y-4 w-full h-full">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="TituloPropiedad" className="">
                    Nombre de la Propiedad{" "}
                    <span className="text-red-600">(*)</span>
                  </Label>
                  <Input
                    id="TituloPropiedad"
                    name="TituloPropiedad"
                    className="w-full text-gray-900"
                    onChange={HandlerChange}
                    defaultValue={OpenModal?.InfoEditar?.TituloPropiedad}
                    required
                    autoComplete="off"
                    autoFocus
                  />
                </div>

                <div>
                  <Label htmlFor="Destino" className="">
                    Propiedad para ?
                  </Label>
                  <Select
                    id="Destino"
                    onValueChange={(e) => {
                      setInputValues({
                        ...InputValues,
                        Destino: e,
                      });
                    }}
                    defaultValue={OpenModal?.InfoEditar?.Destino}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vender">Vender</SelectItem>
                      <SelectItem value="Alquilar">Alquilar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ImagenPrincipal" className="">
                    Imagen Principal <span className="text-red-600">(*)</span>
                  </Label>
                  <FileUploader
                    setFiles={setFiles}
                    files={files}
                    Modal={OpenModal}
                  />
                </div>

                <div className="">
                  <Label htmlFor="ContenidoPropiedad" className="">
                    Contenido <span className="text-red-600">(*)</span>
                  </Label>
                  <QuillNoSSRWrapper
                    id="ContenidoPropiedad"
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    placeholder="Escriba aqui..."
                    onChange={(e) => {
                      setInputValues({
                        ...InputValues,
                        ContenidoPropiedad: e,
                      });
                    }}
                    className="text-black  overflow-auto"
                    defaultValue={OpenModal?.InfoEditar?.ContenidoPropiedad}
                  />
                </div>
              </div>

              <Button
                disabled={Loading}
                className="   disabled:cursor-not-allowed disabled:opacity-50"
                type="submit"
              >
                Guardar{" "}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPropiedades;
