import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { dbAdmin } from "@/firebase/firebaseAdmin";
import getBriefDescription from "@/lib/convertHtml";

export const metadata = {};

const LayoutBlog = async ({ children, params: { id } }) => {
  const blogRef = dbAdmin.collection("Blog").doc(`${id}`);
  const doc = await blogRef.get();
  const blog = doc.data();

  //TitleBlog en el metadata
  //authors   authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
  metadata.title = blog?.TituloBlog || "";
  metadata.description = getBriefDescription(blog?.ContenidoBLog);
  metadata.authors = [{ name: `${blog?.NombreAutor || "Miryam Roncal"}` }];
  metadata.openGraph = {
    title: blog.TituloBlog,
    description: getBriefDescription(blog?.ContenidoBLog),
    siteName: "alvainmobiliarios.com",
    images: [
      {
        url: blog.Imagenes[0], // Asegúrate de que `ImagenBlog` sea la URL de la imagen
        width: 800, // Ajusta el tamaño según sea necesario
        height: 600, // Ajusta el tamaño según sea necesario
        alt: blog.TituloBlog, // Descripción alternativa para la imagen
      },
    ],
    locale: "es_PE",
    type: "article",
  };
  metadata.twitter = {
    title: blog.TituloBlog,
    description: getBriefDescription(blog?.ContenidoBLog),
    creator: `@${blog?.NombreAutor || "Alva Negocios Inmobiliarios"}`,
    images: blog?.Imagenes,
  };
  return (
    <div>
      <Header />

      {children}
      <Footer />
    </div>
  );
};

export default LayoutBlog;
