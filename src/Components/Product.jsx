import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productos from "../assets/productos.json";
import { Typography } from "@material-tailwind/react";
import { Helmet } from "react-helmet";

export default function Product() {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Encuentra el producto que coincide con el idProducto
    const prod = productos.find((p) => p.idProducto.toString() === idProducto);
    if (prod) {
      setProducto(prod); // Guarda el producto encontrado en el estado
    } else {
      setProducto(null); // Si no se encuentra, establece null
    }
  }, [idProducto]);

  return (
    <>
      {/* Meta Tags para SEO */}
      <Helmet>
        <title>
          {producto
            ? `${producto.nombreProducto} - Mi Tienda`
            : "Producto no encontrado - Mi Tienda"}
        </title>
        <meta
          name="description"
          content={
            producto
              ? `${producto.descripcion} - Disponible por solo $${producto.precio}. ¡Consulta disponibilidad ahora!`
              : "Producto no encontrado en Mi Tienda"
          }
        />
      </Helmet>

      <div className="pt-24 md:pt-36 h-screen">
        {producto ? (
          <div className="flex flex-col md:flex-row items-center w-full h-full ">
            <div className="p-5 w-96 lg:w-[60%] h-1/2 md:h-full flex flex-col justify-center items-center">
              {!producto.imgProducto ? (
                <img
                  src="/img/IGO-logo.png"
                  className="object-cover w-48 md:w-auto bg-black border-black opacity-60"
                  alt="Imagen de producto por defecto"
                  loading="lazy"
                />
              ) : (
                <img
                  src={producto.imgProducto}
                  className="object-cover w-72 h-72 md:w-[450px] md:h-[450px] bg-gray-400"
                  alt={`Imagen del producto ${producto.nombreProducto}`}
                  loading="lazy"
                />
              )}
            </div>
            <div className="w-full md:w-1/2 lg:w-[40%] h-[50%] md:h-full bg-gradient-to-br from-black via-gray-800 to-black rounded-t-[40px] md:rounded-t-[80px] py-10 px-8 md:py-24 md:px-14 flex flex-col justify-between ">
              <div className="flex flex-col items-start gap-5 w-full h-full text-white">
                <h1 className="text-xl lg:text-3xl font-extrabold uppercase ">
                  {producto.nombreProducto}
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
                  href="https://api.whatsapp.com/send/?phone=5492284620662&text=Hola, estoy interesado en el producto ${producto.nombreProducto}. ¿Está disponible?"
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
            <p className="text-lg font-semibold text-gray-700">
              Producto no encontrado. Verifica el enlace o explora nuestra
              tienda.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
