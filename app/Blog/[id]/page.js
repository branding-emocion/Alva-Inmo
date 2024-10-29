"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase/firebaseClient";
import {
  query,
  onSnapshot,
  collection,
  orderBy,
  where,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // Para el tema 'snow'
import ModalAddComent from "./ModalAddComment";
import ModalShowComment from "./ModalShowComment";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

const ItemBlog = ({ params: { id } }) => {
  const [Blogs, setBlogs] = useState([]);
  const [Isloading, setIsloading] = useState(true);
  const [SeeBlog, setSeeBlog] = useState({});
  const [Comentarios, setComentarios] = useState([]);
  const [ModalSeeBlog, setModalSeeBlog] = useState({
    Visible: false,
    Info: {},
  });
  const [OpenModal, setOpenModal] = useState({
    Visible: false,
    idBlog: null,
  });

  useEffect(() => {
    if (id) {
      const q = query(collection(db, "Blog"), orderBy("CreatAt", "desc"));
      const qComentarios = query(
        collection(db, "Blog", `${id}`, "Comentarios"),
        where("Show", "==", true)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setBlogs(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        const FilterBlog = snapshot.docs.find((bloc) => bloc.id == id);
        setSeeBlog(FilterBlog?.data() || {});
        setIsloading(false);
      });
      const commentarios = onSnapshot(qComentarios, (snapshot) => {
        setComentarios(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setIsloading(false);
      });

      return () => {
        unsubscribe();
        // commentarios();
      };
    }
  }, [id]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      {OpenModal.Visible && (
        <ModalAddComent OpenModal={OpenModal} setOpenModal={setOpenModal} />
      )}
      {ModalSeeBlog.Visible && (
        <ModalShowComment
          ModalSeeBlog={ModalSeeBlog}
          setModalSeeBlog={setModalSeeBlog}
          SeeBlog={SeeBlog}
        />
      )}

      <section className="mt-[120px] bg-center bg-no-repeat bg-[url('/banner/Blog.webp')] bg-cover bg-black/20 bg-blend-multiply">
        <div className=" mx-auto max-w-screen-xl text-center py-24 lg:py-[10.5rem]">
          <div className="rounded-xl bg-black/50 px-1 py-8 max-w-sm mx-auto">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl ">
              Blog
            </h1>
          </div>
        </div>
      </section>
      <div className=" mx-auto">
        <main className="mt-12">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="mb-4 lg:mb-0 p-4 block lg:col-span-2 text-justify bg-white shadow-lg rounded-md">
              <div className="p-5 ">
                <div>
                  <h1 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 text-center">
                    {SeeBlog?.TituloBlog}
                  </h1>
                  <h2 className="text-center pb-3 text-lg uppercase">
                    <span className="font-semibold capitalize">By. </span>{" "}
                    {SeeBlog?.NombreAutor || "Miryam Roncal"}
                  </h2>
                  {SeeBlog?.Imagenes?.length > 0 && (
                    <img
                      className="rounded-t-lg"
                      src={SeeBlog?.Imagenes[0] || ""}
                      alt="imageBlog"
                    />
                  )}
                </div>
                <div
                  className="quill-content text-justify"
                  dangerouslySetInnerHTML={{ __html: SeeBlog?.ContenidoBLog }}
                />
                <div className="flex justify-center space-x-2 mt-4">
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <WhatsappShareButton url={shareUrl}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <LinkedinShareButton url={shareUrl}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
              </div>
            </div>
            <div className="space-y-3 px-2 sm:px-0 w-full py-2 sm:col-span-1 rounded-2xl bg-white shadow-md">
              <div className="w-full">
                <h1 className="text-center text-xl font-semibold leading-tight lg:text-2xl text-grey-900 uppercase">
                  Más Lectura
                </h1>
                <div className="max-h-[700px] overflow-auto shadow-md rounded-md space-y-2">
                  {Blogs?.filter((item) => item.id != id)?.map((blog) => (
                    <Link key={blog.id} href={`/Blog/${blog.id}`}>
                      <div className="py-2 mx-auto max-w-md px-4 sm:w-full flex flex-col md:flex-row mb-2">
                        <figure className="relative mx-auto min-w-[167px] w-[280px] h-40 lg:w-[167px] lg:h-32 m-4 md:m-0">
                          <Image
                            src={blog.Imagenes[0]}
                            alt="IMG blog"
                            fill
                            className="rounded-md object-cover"
                          />
                        </figure>
                        <div className="bg-white rounded pl-3">
                          <p className="text-gray-900 font-semibold text-base mb-2">
                            {blog.TituloBlog}
                          </p>
                          <div
                            className="quill-content text-justify line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: blog?.ContenidoBLog,
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              {/* <div className="max-h-[700px] overflow-auto shadow-md rounded-md">
                <div>
                  <h1 className="text-center text-xl font-semibold leading-tight lg:text-2xl text-grey-900 uppercase">
                    Comentarios
                  </h1>
                  <div>
                    <div className="w-full bg-white px-4 py-4 shadow rounded-sm">
                      <div className="max-h-[700px]">
                        <div className="flex flex-col gap-y-3">
                          {Comentarios.sort(
                            (a, b) => b.Calificacion - a.Calificacion
                          )?.map((comment) => (
                            <div
                              onClick={(e) => {
                                e.preventDefault();
                                setModalSeeBlog({
                                  Visible: true,
                                  Info: comment,
                                });
                              }}
                              className="flex gap-2 cursor-pointer hover:-translate-y-1 border-b py-2"
                              key={comment.id}
                            >
                              <div className="flex flex-shrink-0">
                                <Avatar className="h-20 w-20">
                                  <AvatarImage src="https://github.com/shadcn.png" />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex flex-col space-y-2">
                                <div className="font-semibold">
                                  <p className="uppercase">{comment?.Nombre}</p>
                                  <span className="flex gap-x-2">
                                    {[1, 2, 3, 4, 5].map((value, key) => (
                                      <div
                                        key={key}
                                        className={`${
                                          comment.Calificacion >= value
                                            ? "text-orange-700"
                                            : ""
                                        }`}
                                      >
                                        <Star />
                                      </div>
                                    ))}
                                  </span>
                                </div>
                                <div className="flex justify-start items-center space-x-2">
                                  <div className="w-auto text-sm leading-none">
                                    <div className="max-h-[400px] h-full w-full overflow-auto">
                                      <div
                                        className="line-clamp-2 text-justify"
                                        dangerouslySetInnerHTML={{
                                          __html: comment?.Comentario,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setOpenModal({
                          Visible: true,
                          idBlog: id,
                        });
                      }}
                      className="w-full h-full bg-[#004f51]"
                    >
                      Agregar Comentario
                    </Button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </main>
        {/* main ends here */}
        {/* footer */}
      </div>
    </>
  );
};

export default ItemBlog;
