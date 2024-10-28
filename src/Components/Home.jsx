import { CarouselCustomNavigation } from "./CarouselCustomNavigation";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import categs from "../assets/categs.json";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

export default function Home() {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/videos/video-igo-mobile.mp4");

  const handleVideoToggle = () => {
    setIsVideoVisible((prev) => !prev);
  };

  // Actualización de video en función del tamaño de la pantalla con debounce
  useEffect(() => {
    const debounce = (func, delay) => {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
      };
    };

    const updateVideoSource = debounce(() => {
      setVideoSrc(
        window.innerWidth >= 1024
          ? "/videos/video-igo-desktop.mp4"
          : "/videos/video-igo-mobile.mp4"
      );
    }, 250);

    updateVideoSource();
    window.addEventListener("resize", updateVideoSource);

    return () => window.removeEventListener("resize", updateVideoSource);
  }, []);

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <>
      {/* Helmet para SEO */}
      <Helmet>
        <title>IGO - Catalogo</title>
        <meta
          name="description"
          content="Explora nuestro bazar con una amplia variedad de productos para todas tus necesidades."
        />
      </Helmet>

      <div className="pt-20 md:pt-24 flex flex-col justify-center items-center md:h-full">
        <CarouselCustomNavigation />
        <div className="relative w-screen px-3 md:px-10">
          {/* Card con video o imagen de fondo */}
          <Card
            className={`relative mx-auto flex flex-col justify-center overflow-hidden rounded-lg shadow-lg w-full transition-all duration-500 ${
              isVideoVisible
                ? "h-[368px] md:h-[468px] md:w-[70%] hover:cursor-pointer duration-200 hover:scale-[1.01] hover:border-[1px] hover:border-gray-500 shadow-2xl"
                : "h-48 md:h-96 md:w-[75%]"
            } mt-8 mb-12 md:mt-10 md:mb-14`}
            style={{
              backgroundImage: isVideoVisible
                ? "none"
                : "url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80') ",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!isVideoVisible && (
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/50 z-0" />
            )}
            {!isVideoVisible && (
              <CardBody className="relative z-10 h-full w-full flex flex-col justify-center items-center gap-3 lg:items-start lg:ml-4 lg:mt-4 lg:justify-start">
                <Typography className="text-xl md:text-3xl font-semibold md:font-bold uppercase leading-tight text-white">
                  Conocé nuestro bazar
                </Typography>
                <button
                  onClick={handleVideoToggle}
                  aria-label="Ver video de presentación"
                >
                  <div className="flex items-center justify-center w-32 mt-2 px-4 py-2 bg-black bg-opacity-85 hover:bg-opacity-90 text-white rounded-full shadow-lg gap-3 transition-transform duration-300 hover:scale-105">
                    <Typography className="text-md font-medium leading-[1.5] tracking-wide text-white">
                      Ver
                    </Typography>
                    <i className="fa-solid fa-chevron-right text-white text-sm"></i>
                  </div>
                </button>
              </CardBody>
            )}

            {/* Video overlay */}
            {isVideoVisible && (
              <video
                src={videoSrc}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover rounded-lg"
                onClick={handleVideoToggle}
                aria-label="Video de presentación"
              />
            )}
          </Card>
        </div>

        {/* Cards de categorías con carga diferida */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-10 w-screen md:max-w-[80%] 2xl:max-w-[70%] px-5 mb-10">
          {categs.map((category) => {
            const slug = createSlug(category.nombreCategoria);
            return (
              <Link
                key={category.idCategoria}
                to={`/products/${slug}`}
                className="flex flex-col justify-start relative bg-white w-full md:flex-grow md:basis-[300px] h-[250px] rounded-lg overflow-hidden shadow-lg bg-cover bg-center transform transition-transform duration-300 ease-in-out border-0 border-transparent hover:scale-105 hover:border-[1px] hover:border-white hover:shadow-gray-800"
                style={{ backgroundImage: `url(${category.img})` }}
              >
                <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-55 text-white w-full rounded-b-lg">
                  <h3 className="text-lg lg:text-xl font-semibold">
                    {category.nombreCategoria}
                  </h3>
                </div>
                <img
                  src={category.img}
                  alt={`Categoría ${category.nombreCategoria}`}
                  className="opacity-0" // solo se muestra en el fondo de div
                  loading="lazy"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
