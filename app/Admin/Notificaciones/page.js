"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/firebase/firebaseClient";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { EyeIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalShowNotificacion from "./ModalShowNotificacion";

const Notificaciones = () => {
  const [Comentarios, setComentarios] = useState([]);
  const [Blogs, setBlogs] = useState([]);
  const [ModalSeeBlog, setModalSeeBlog] = useState({
    Visible: false,
    Info: {},
  });

  useEffect(() => {
    // .collection("Notificaciones").where("Show", "==", false)
    const qComentarios = query(
      collection(db, "Notificaciones"),
      where("Show", "==", true) // Asegúrate de usar el valor booleano false
    );

    const q = query(collection(db, "Blog"), orderBy("CreatAt", "desc"));

    const commentarios = onSnapshot(qComentarios, (snapshot) => {
      setComentarios(
        snapshot.docs.map((doc) => ({
          idComentarioNoti: doc.id,
          ...doc.data(),
        }))
      );
    });
    const Blog = onSnapshot(q, (snapshot) => {
      setBlogs(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => {
      commentarios(); // Esta función cancela la suscripción al snapshot
      Blog();
    };
  }, []);

  return (
    <>
      {ModalSeeBlog.Visible && (
        <ModalShowNotificacion
          ModalSeeBlog={ModalSeeBlog}
          setModalSeeBlog={setModalSeeBlog}
        />
      )}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Lista de Comentarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3  ">
            {Comentarios?.map((Comentario) => {
              const databloc = Blogs.find(
                (bloc) => bloc.id == Comentario?.idBlog
              );
              return (
                <Card key={Comentario.idComentarioNoti} className="shadow-sm">
                  <CardContent>
                    <div>
                      <div className="flex w-full h-full pt-2">
                        <div className="flex items-center justify-center gap-x-2 flex-shrink-0 w-full h-full">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <p className="w-full font-semibold text-wrap uppercase text-center">
                            {Comentario.Nombre}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h1 className="font-semibold">
                          Blog:{" "}
                          <span className="font-normal">
                            {databloc?.TituloBlog}
                          </span>
                        </h1>

                        <h2 className="font-semibold">
                          Fecha:{" "}
                          <span className="font-normal">
                            {new Date(
                              Comentario.CreatAt?.seconds * 1000
                            ).toLocaleDateString()}
                          </span>
                        </h2>

                        <h3 className="font-semibold">
                          Calificación:{" "}
                          <span className="font-normal">
                            {Comentario.Calificacion}
                          </span>
                          /5
                        </h3>

                        <h4 className="text-center font-semibold">
                          Comentario
                        </h4>
                        <div
                          className="line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: Comentario?.Comentario,
                          }}
                        />

                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            setModalSeeBlog({
                              Visible: true,
                              Info: { ...Comentario, ...databloc },
                            });
                          }}
                          variant="outline"
                          className="w-full mx-auto hover:bg-[#004f51] hover:text-white"
                        >
                          <EyeIcon />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Notificaciones;
