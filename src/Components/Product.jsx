import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { Helmet } from "react-helmet";

export default function Product() {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(
          `http://app-16cf71d0-fd8d-4063-8de4-f49ee1f528d7.cleverapps.io/productos/${idProducto}`
        );
        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setProducto(null);
      }
    };

    fetchProducto();
  }, [idProducto]);

  return (
    <>
      {/* Meta Tags para SEO */}
      <Helmet>
        <title>
          {producto
            ? `${producto.nombre} - IGO`
            : "Producto no encontrado - IGO"}
        </title>
        <meta
          name="description"
          content={
            producto
              ? `${producto.descripcion} - Disponible por solo $${producto.precio}. ¡Consulta disponibilidad ahora!`
              : "Producto no encontrado en IGO"
          }
        />
      </Helmet>

      <div className="pt-24 md:pt-36 h-screen">
        {producto ? (
          <div className="flex flex-col md:flex-row items-center w-full h-full ">
            <div className="p-5 w-96 lg:w-[60%] h-1/2 md:h-full flex flex-col justify-center items-center">
              {!producto.url_imagen ? (
                <img
                  src="/img/IGO-logo.png"
                  className="object-cover w-48 md:w-auto bg-black border-black opacity-60"
                  alt="Imagen de producto por defecto"
                  loading="lazy"
                />
              ) : (
                <img
                  src={producto.url_imagen}
                  className="object-cover w-72 h-72 md:w-[450px] md:h-[450px] bg-gray-400"
                  alt={`Imagen del producto ${producto.nombre}`}
                  loading="lazy"
                />
              )}
            </div>
            <div className="w-full md:w-1/2 lg:w-[40%] h-[50%] md:h-full bg-gradient-to-br from-black via-gray-800 to-black rounded-t-[40px] md:rounded-t-[80px] py-10 px-8 md:py-24 md:px-14 flex flex-col justify-between ">
              <div className="flex flex-col items-start gap-5 w-full h-full text-white">
                <h1 className="text-xl lg:text-3xl font-extrabold uppercase ">
                  {producto.nombre}
                </h1>
                <p className="md:text-md lg:text-xl max-w-[80%]">
                  {producto.descripcion}
                </p>
                <p className="md:text-md lg:text-xl max-w-[80%]">
                  Precio: ${producto.precio}
                </p>
              </div>
              <div className="flex justify-center items-end">
                <Typography
                  as="a"
                  href={`https://api.whatsapp.com/send/?phone=5492284620662&text=Hola, estoy interesado en el producto ${producto.nombre}. ¿Está disponible?`}
                  target="_blank"
                  className="bg-gradient-to-r rounded-full w-72 h-12 md:w-96 lg:h-16 lg:text-xl xl:text-2xl font-semibold border-2 border-white from-gray-500 to-gray-200 text-black flex justify-center items-center transform transition-transform duration-300 hover:scale-105"
                >
                  Consultar disponibilidad
                </Typography>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg font-semibold text-gray-50">
              Producto no encontrado. Verifica el enlace o explora nuestra
              tienda.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
