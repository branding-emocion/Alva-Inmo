"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import Image from "next/image";
import { db } from "@/firebase/firebaseClient";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import getBriefDescription from "@/lib/convertHtml";
const Blog = () => {
  const [Blog, setBlog] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "Blog"), orderBy("CreatAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBlog(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <section className="bg-center bg-no-repeat bg-[url('/Banners/Blog.webp')] bg-cover bg-[#004f51]/80 bg-blend-multiply">
        <div className=" mx-auto max-w-screen-xl text-center py-24 lg:py-[10.5rem]">
          <div className="rounded-xl bg-[#004f51]/50 px-1 py-8     max-w-sm mx-auto">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl ">
              Blogs
            </h1>
          </div>
        </div>
      </section>
      {IsLoading ? (
        <div className="mx-auto grid max-w-6xl  grid-cols-1 md:gap-4 lg:gap-6 pt-7 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="max-w-lg mx-auto cursor-pointer h-full  w-full shadow-lg space"
            >
              <Skeleton className="w-full h-64 rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* blog */}
          <div className="mx-auto grid max-w-6xl  grid-cols-1 md:gap-4 lg:gap-6 pt-7 sm:grid-cols-2 md:grid-cols-3  ">
            {Blog?.map((blog) => {
              const briefDescription = getBriefDescription(blog.ContenidoBLog);

              return (
                <Link
                  href={`/Blog/${blog.id}`}
                  key={blog.id}
                  className="max-w-lg mx-auto cursor-pointer h-full  w-full shadow-lg"
                  title={`LEER ${blog?.TituloBlog}`}
                >
                  <div className=" h-full  bg-white shadow-md hover:shadow-xl border border-gray-200  rounded-lg max-w-sm ">
                    <figure className="w-full h-64 relative ">
                      <Image
                        className="rounded-t-lg"
                        src={blog?.Imagenes[0] || ""}
                        alt="imageBlog"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </figure>

                    <div className="p-5  text-center flex flex-col justify-between items-center">
                      <div className="">
                        <h5 className="text-gray-900 font-bold text-xl tracking-tight mb-2">
                          {blog?.TituloBlog}
                        </h5>
                      </div>
                      <div
                        className="quill-content line-clamp-3 text-justify"
                        dangerouslySetInnerHTML={{
                          __html: blog?.ContenidoBLog,
                        }}
                      />

                      {/* <button className="text-white mt-2 bg-[#004f51] hover:opacity-75 focus:ring-4 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center ">
                        Leer más
                      </button> */}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
