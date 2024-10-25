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
import { formats, modules } from "@/lib/QuillConfig";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

import { db } from "@/firebase/firebaseClient";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const ModalAddComent = ({ OpenModal, setOpenModal }) => {
  const [InputValues, setInputValues] = useState({});
  const [Loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);

  console.log("OpenModal", OpenModal);
  const closeModal = () => {
    setOpenModal({
      Visible: false,
      idBlog: null,
    });
    setInputValues({});
  };

  const handleClick = (Calificacion) => {
    setIsActive({
      click: true,
      Calificacion: Calificacion,
    });
    setInputValues({
      ...InputValues,
      Calificacion: Calificacion,
    });
  };

  const HandlerSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!InputValues?.Calificacion) {
        toast({
          title: "Notificación",
          description: "Por favor Agrega una calificación",
        });
        setLoading(false);

        return;
      }

      if (!InputValues?.Comentario) {
        toast({
          title: "Notificación",
          description: "Por favor Agrega un Comentario",
        });
        setLoading(false);

        return;
      }

      const ResComment = await addDoc(
        collection(db, "Blog", `${OpenModal?.idBlog}`, "Comentarios"),
        {
          ...InputValues,
          CreatAt: serverTimestamp(),
          Show: false,
        }
      );

      await addDoc(collection(db, "Notificaciones"), {
        ...InputValues,
        idBlog: OpenModal?.idBlog,
        CreatAt: serverTimestamp(),
        Show: true,
        idComentario: ResComment.id,
      });
      setLoading(false);

      toast({
        title: "Notificación",
        description:
          "Se ha guardado correctamente, se notificará al administrador para su aprobación",
      });

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
          <DialogTitle>Agrega un comentario blog</DialogTitle>
          <DialogDescription>
            <form onSubmit={HandlerSubmit} className="space-y-4 w-full h-full">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="Nombre" className="">
                    Nombre completo
                  </Label>
                  <Input
                    id="Nombre"
                    name="Nombre"
                    className="w-full text-gray-900"
                    onChange={HandlerChange}
                    defaultValue={OpenModal?.InfoEditar?.Nombre}
                    required
                    autoComplete="off"
                    autoFocus
                  />
                </div>
                <div>
                  <Label htmlFor="Calificacion" className="">
                    Calificación
                  </Label>
                  <div className="flex gap-2 items-center justify-center">
                    {[1, 2, 3, 4, 5].map((value, key) => (
                      <div
                        key={key}
                        onClick={() => handleClick(value)}
                        className={`${
                          isActive.click && isActive.Calificacion >= value
                            ? "text-orange-700"
                            : ""
                        } hover:text-orange-700 `}
                      >
                        <Star />
                      </div>
                    ))}
                    <div>Tu calificación: estrellas</div>
                  </div>
                </div>

                <div className="">
                  <Label htmlFor="Comentario" className="">
                    Comentario
                  </Label>
                  <QuillNoSSRWrapper
                    id="Comentario"
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    placeholder="Escriba aqui..."
                    onChange={(e) => {
                      setInputValues({
                        ...InputValues,
                        Comentario: e,
                      });
                    }}
                    className="text-black  overflow-auto"
                    defaultValue={OpenModal?.InfoEditar?.ContenidoBLog}
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

export default ModalAddComent;
