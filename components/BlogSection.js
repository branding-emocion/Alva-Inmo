"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import Link from "next/link";

export default function BlogSection() {
  const [hoveredId, setHoveredId] = useState(null);

  const [Blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchPropiedades = async () => {
      const q = query(collection(db, "Blog"), orderBy("CreatAt", "desc"));

      try {
        const querySnapshot = await getDocs(q);
        const propiedadesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlog(propiedadesData);
      } catch (error) {
        console.error("Error fetching propiedades: ", error);
      }
    };

    fetchPropiedades();
  }, []);

  return (
    <section id="blog" className="py-12  bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 uppercase ">
          Blog Inmobiliario
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Blog?.map((post) => (
            <Link href={`/Blog/${post.id}`} key={post.id}>
              <motion.div
                className="bg-card rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onHoverStart={() => setHoveredId(post.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <div className="relative">
                  <img
                    src={post.Imagenes[0]}
                    alt={post.TituloBlog}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="text-white w-10 h-10" />
                  </div>
                </div>
                <div className="p-2 py-3">
                  <h3 className="font-semibold text-base mb-2">
                    {post.TituloBlog}
                  </h3>
                  <div
                    className="quill-content line-clamp-3 text-justify text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: post?.ContenidoBLog,
                    }}
                  />
                </div>
                <motion.div
                  className="h-1 bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: hoveredId === post.id ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
