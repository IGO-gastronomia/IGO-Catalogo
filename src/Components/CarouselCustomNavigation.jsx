import { IconButton } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

export function CarouselCustomNavigation() {
  const imagesDesktop = [
    "https://res.cloudinary.com/dwkyq6kut/image/upload/v1730483828/fotos%20igo%20catalogo/zgdxl3zqy6cua8g48b0o.jpg",
    "https://res.cloudinary.com/dwkyq6kut/image/upload/v1730483828/fotos%20igo%20catalogo/xqbkdnlvks9o0vwjr1fo.png",
  ];

  const imagesMobile = [
    "https://res.cloudinary.com/dwkyq6kut/image/upload/v1730483827/fotos%20igo%20catalogo/midzfmajpzcxf3zflnlf.jpg",
    "https://res.cloudinary.com/dwkyq6kut/image/upload/v1730483828/fotos%20igo%20catalogo/e1qtoz5yvubfgtwthqza.jpg",
  ];

  const [activeIndex, setActiveIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const timeoutRef = useRef(null);

  const images = isMobile ? imagesMobile : imagesDesktop;
  const length = images.length;

  // Debounce para optimizar el resize
  const debounce = (func, delay) => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(func, delay);
    };
  };

  const handleResize = debounce(() => {
    setIsMobile(window.innerWidth <= 768);
  }, 250);

  const handleSlide = (direction) => {
    setTransitioning(true);
    setActiveIndex((prevIndex) => prevIndex + direction);
    resetAutoplay();
  };

  const resetAutoplay = () => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    timeoutRef.current = setInterval(() => {
      handleSlide(1);
    }, 8000);
  };

  // Efecto de ciclo infinito
  useEffect(() => {
    if (activeIndex === 0) {
      setTimeout(() => {
        setTransitioning(false);
        setActiveIndex(length);
      }, 500);
    } else if (activeIndex === length + 1) {
      setTimeout(() => {
        setTransitioning(false);
        setActiveIndex(1);
      }, 500);
    }
  }, [activeIndex, length]);

  // Reactivar transición
  useEffect(() => {
    if (!transitioning) {
      setTimeout(() => setTransitioning(true), 50);
    }
  }, [transitioning]);

  // Configurar autoplay y resize
  useEffect(() => {
    resetAutoplay();
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(timeoutRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <>
      {/* SEO con Helmet */}
      <Helmet>
        <title>IGO - Catalogo</title>
        <meta
          name="description"
          content="Descubre nuestras imágenes en el carrusel que se adapta a dispositivos móviles y de escritorio."
        />
      </Helmet>

      <div className="relative w-full md:h-[70vh] max-h-[75vh] mx-auto overflow-hidden">
        <div className="w-full h-full">
          <div
            className={`flex ${
              transitioning
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {/* Renderizado de imágenes con loading="lazy" */}
            {[images[length - 1], ...images, images[0]].map((image, index) => (
              <div
                key={index}
                className="min-w-full flex items-center justify-center h-[65vh] md:h-[70vh]"
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Puntos de Navegación */}
          <div className="absolute bottom-8 left-2/4 transform -translate-x-2/4 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-1 cursor-pointer rounded-full transition-all ${
                  index + 1 === activeIndex ||
                  (index === 0 && activeIndex === length + 1)
                    ? "w-12 bg-white hover:w-14 hover:bg-gray-100"
                    : "w-6 bg-blue-gray-200 hover:scale-125 hover:bg-white"
                }`}
                onClick={() => setActiveIndex(index + 1)}
                aria-label={`Ir a la imagen ${index + 1}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Flechas de Navegación */}
        <div
          onClick={() => handleSlide(-1)}
          className="absolute w-10 h-10 top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white ml-2 rounded-full hover:scale-110"
          aria-label="Ir a la imagen anterior"
        >
          <IconButton className="bg-transparent shadow-none hover:rounded-full">
            <i className="fa-solid text-white text-lg fa-chevron-left"></i>
          </IconButton>
        </div>

        <div
          onClick={() => handleSlide(1)}
          className="absolute w-10 h-10 top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white mr-2 rounded-full hover:scale-110"
          aria-label="Ir a la imagen siguiente"
        >
          <IconButton className="bg-transparent shadow-none hover:rounded-full">
            <i className="fa-solid text-white text-lg fa-chevron-right"></i>
          </IconButton>
        </div>
      </div>
    </>
  );
}
