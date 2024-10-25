"use client";
import React, { useEffect, useState } from "react";
import ModalPodcast from "./ModalPodcast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgePlus, PencilIcon, TrashIcon, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, storage } from "@/firebase/firebaseClient";
import { deleteObject, listAll, ref } from "firebase/storage";

const Podcats = () => {
  const [OpenModal, setOpenModal] = useState({
    Visible: false,
    InfoEditar: {},
  });

  const [Podcast, setPodcast] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Podcast"), orderBy("CreatAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPodcast(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      {OpenModal.Visible && (
        <ModalPodcast OpenModal={OpenModal} setOpenModal={setOpenModal} />
      )}
      <div className="space-y-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Bienvenido al Podcast</CardTitle>

            <CardDescription>
              En esta sección, puedes ver y modificar los podcast de la página.
            </CardDescription>
            <div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(e);
                  setOpenModal({
                    Visible: true,
                    InfoEditar: {},
                  });
                }}
                className="space-x-2"
              >
                <BadgePlus />
                <p>Agregar nuevo </p>
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Lista de podcasts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3  ">
              {Podcast?.map((podcast) => (
                <div
                  key={podcast.id}
                  className="  w-full mx-auto cursor-pointer"
                >
                  <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
                    <section className="relative w-full h-[205px]">
                      <Image
                        className="rounded-t-lg "
                        fill
                        src={podcast?.Imagenes[0] || ""}
                        alt="imagepodcast"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </section>

                    <div className="p-5">
                      <div>
                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                          {podcast?.TituloPodcast}
                        </h5>
                      </div>

                      {/* <a
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
                    href="#"
                  >
                    Read more
                  </a> */}
                    </div>

                    <div className="flex items-center justify-center gap-x-2 pb-2">
                      <a
                        href={podcast?.LinkPodcast}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-700 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-green-500"
                      >
                        <YoutubeIcon className="w-4 h-4" />
                      </a>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenModal({
                            Visible: true,
                            InfoEditar: podcast,
                          });
                        }}
                        className="bg-blue-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async (e) => {
                          e.preventDefault();

                          const Confirm = confirm(
                            `Esta Seguro de eliminar el podcast: ${podcast.TituloPodcast}`
                          );
                          if (Confirm) {
                            const ImgRef = ref(
                              storage,
                              `Podcast/${podcast?.TituloPodcast?.replace(
                                /\s+/g,
                                "_"
                              )}/`
                            );

                            await deleteDoc(
                              doc(db, "Podcast", `${podcast.id}`)
                            );

                            // Lista todos los objetos (archivos) en el directorio
                            listAll(ImgRef)
                              .then((res) => {
                                res.items.forEach((itemRef) => {
                                  // Ahora debes borrar cada objeto (archivo)
                                  deleteObject(itemRef).catch((error) => {
                                    // Maneja cualquier error
                                    alert(
                                      ` Error al eliminar ${itemRef.fullPath}`
                                    );
                                    console.log(
                                      `Error al eliminar ${itemRef.fullPath}`,
                                      error
                                    );
                                  });
                                });
                              })
                              .catch((error) => {
                                // Maneja cualquier error
                                console.error(
                                  "Error al listar los objetos",
                                  error
                                );
                              });
                          }
                        }}
                        className="bg-red-500 space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 hover:bg-red-600"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Podcats;
