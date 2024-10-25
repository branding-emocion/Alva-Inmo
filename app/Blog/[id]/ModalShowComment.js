"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const ModalShowComment = ({ ModalSeeBlog, setModalSeeBlog, SeeBlog }) => {
  const closeModal = () => {
    setModalSeeBlog({
      Visible: false,
      Info: {},
    });
  };
  return (
    <div>
      <Dialog open={ModalSeeBlog?.Visible} onOpenChange={closeModal}>
        <DialogContent className="h-auto  w-[90%] md:w-full max-h-[95vh] overflow-auto   sm:max-w-4xl">
          <DialogHeader className="w-full h-full">
            {/* <DialogTitle>{ModalSeeBlog?.Info?.Nombre}</DialogTitle> */}
          </DialogHeader>

          <DialogDescription>
            <div className="flex items-center pb-2  gap-x-2 flex-shrink-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="uppercase font-semibold text-black">
                {ModalSeeBlog?.Info?.Nombre}
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-semibold">
                Blog: <span className="font-normal">{SeeBlog.TituloBlog}</span>
              </p>

              <p className="font-semibold">
                Fecha:{" "}
                <span className="font-normal">
                  {/* fecha de firebase ${ModalSeeBlog?.Info.CreatAt} visuazar de forma local ten en cuenta que es un timestapm*/}
                  {new Date(
                    ModalSeeBlog?.Info.CreatAt?.seconds * 1000
                  ).toLocaleDateString()}
                </span>
              </p>

              <p className="font-semibold">
                Calificación:{" "}
                <span className="flex gap-x-2">
                  {[1, 2, 3, 4, 5].map((value, key) => (
                    <div
                      key={key}
                      className={`${
                        ModalSeeBlog?.Info.Calificacion >= value
                          ? "text-orange-700"
                          : ""
                      }   `}
                    >
                      <Star />
                    </div>
                  ))}
                </span>
              </p>

              <p className="font-semibold ">Comentario:</p>
              <div
                className=" w-full h-full  text-justify  "
                dangerouslySetInnerHTML={{
                  __html: ModalSeeBlog?.Info?.Comentario,
                }}
              />
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalShowComment;
