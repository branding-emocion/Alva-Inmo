import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";

import { db, storage } from "@/firebase/firebaseClient";
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
import FileUploader from "../Blog/FileUploader";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

const ModalPodcast = ({ OpenModal, setOpenModal }) => {
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
        const imageRef = ref(storage, `Podcast/${name}/image-${index}.jpg`);
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
          const UpdateRef = doc(db, "Podcast", `${OpenModal?.InfoEditar?.id}`);

          // Set the "capital" field of the city 'DC'
          await updateDoc(UpdateRef, {
            ...InputValues,
          });
        }
        if (files?.length > 0) {
          // Borrar las imágenes antiguas
          const ImgRef = ref(
            storage,
            `Podcast/${OpenModal?.InfoEditar?.TituloPodcast?.replace(
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
            InputValues?.TituloPodcast?.replace(/\s+/g, "_") ||
            OpenModal?.InfoEditar?.TituloPodcast?.replace(/\s+/g, "_");

          // toca modificar la funcion y enviarle el values para que funcione mejor
          const ImagesUrl = await uploadImages(files, NombreCarpeta);

          const UpdateRef = doc(db, "Podcast", `${OpenModal?.InfoEditar?.id}`);
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

        const NombreCarpeta = InputValues?.TituloPodcast?.replace(/\s+/g, "_");

        const ImagesUrl = await uploadImages(files, NombreCarpeta); // Asegúrate de que la promesa se haya resuelto

        const docRef = await addDoc(collection(db, "Podcast"), {
          ...InputValues,
          Imagenes: ImagesUrl, // Ahora ImagesUrl es una matriz de cadenas de texto
          CreatAt: serverTimestamp(),
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
            Pódcast
          </DialogTitle>
          <DialogDescription>
            <form onSubmit={HandlerSubmit} className="space-y-4 w-full h-full">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="TituloPodcast" className="">
                    Titulo del Pódcast <span className="text-red-600">(*)</span>
                  </Label>
                  <Input
                    id="TituloPodcast"
                    name="TituloPodcast"
                    className="w-full text-gray-900"
                    onChange={HandlerChange}
                    defaultValue={OpenModal?.InfoEditar?.TituloPodcast}
                    required
                    autoComplete="off"
                    autoFocus
                  />
                </div>
                <div>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="LinkPodcast" className="">
                    Link de youtube <span className="text-red-600">(*)</span>
                  </Label>
                  <Input
                    id="LinkPodcast"
                    name="LinkPodcast"
                    className="w-full text-gray-900"
                    onChange={HandlerChange}
                    defaultValue={OpenModal?.InfoEditar?.LinkPodcast}
                    required
                    autoComplete="off"
                    autoFocus
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

export default ModalPodcast;
