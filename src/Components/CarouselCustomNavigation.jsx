import { IconButton } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";

export function CarouselCustomNavigation() {
  const imagesDesktop = [
    "https://drive.google.com/thumbnail?id=1w27OcJF8K55cFB-h5q1-ZbCtAag-cOKm&sz=w1000",
    "https://drive.google.com/thumbnail?id=10jpkiVA7LHjof9ucE7KA5IOomnaokEGu&sz=w1000",
    "https://drive.google.com/thumbnail?id=1G_vTnKsfazPvxd4Q1EC4-zn6ArOJRX2P&sz=w1000",
  ];

  const imagesMobile = [
    "https://drive.google.com/thumbnail?id=18JSiNk80JAecpzMsIbSI4wEenocpIuwB&sz=w1000",
    "https://drive.google.com/thumbnail?id=12s4n5Ja029TndsPJjMWunCJx6327sJK5&sz=w1000",
    "https://drive.google.com/thumbnail?id=1eOExopclUcgzuaRBXK9OgrwDCHezSA4c&sz=w1000",
  ];

  const [activeIndex, setActiveIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const timeoutRef = useRef(null);

  const images = isMobile ? imagesMobile : imagesDesktop;
  const length = images.length;

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const handleSlide = (direction) => {
    setTransitioning(true); // Asegurarse de que la transición esté activa en desplazamientos normales
    setActiveIndex((prevIndex) => prevIndex + direction);
    resetAutoplay();
  };

  const resetAutoplay = () => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    timeoutRef.current = setInterval(() => {
      handleSlide(1); // Avanza automáticamente a la siguiente diapositiva
    }, 8000);
  };

  // Efecto para manejar el ciclo infinito sin transición visual
  useEffect(() => {
    if (activeIndex === 0) {
      // Desactiva la transición para saltar al último slide real sin efecto visual
      setTimeout(() => {
        setTransitioning(false); // Desactivar transición
        setActiveIndex(length); // Ir al último slide
      }, 500);
    } else if (activeIndex === length + 1) {
      // Desactiva la transición para saltar al primer slide real sin efecto visual
      setTimeout(() => {
        setTransitioning(false); // Desactivar transición
        setActiveIndex(1); // Ir al primer slide
      }, 500);
    }
  }, [activeIndex, length]);

  // Reactivar la transición después del "salto"
  useEffect(() => {
    if (!transitioning) {
      setTimeout(() => {
        setTransitioning(true); // Reactivar la transición
      }, 50); // Breve demora para evitar la transición en el salto
    }
  }, [transitioning]);

  // Autoplay y manejo del resize
  useEffect(() => {
    resetAutoplay();
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(timeoutRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <div className="relative w-full md:h-[70vh] max-h-[75vh] mx-auto overflow-hidden ">
      <div className="w-full h-full">
        <div
          className={`flex ${
            transitioning ? "transition-transform duration-700 ease-in-out" : ""
          }`} // Aplicar transición solo cuando transitioning sea true
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {/* Mapeo dinámico de imágenes */}
          {[images[length - 1], ...images, images[0]].map((image, index) => (
            <div
              key={index}
              className="min-w-full flex items-center justify-center h-[65vh] md:h-[70vh]"
            >
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Puntos de Navegación */}
        <div className="absolute bottom-8 left-2/4 transform -translate-x-2/4 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1 cursor-pointer rounded-full transition-all  ${
                index + 1 === activeIndex ||
                (index === 0 && activeIndex === length + 1)
                  ? "w-12 bg-white hover:w-14 hover:bg-gray-100"
                  : "w-6 bg-blue-gray-200 hover:scale-125 hover:bg-white"
              }`}
              onClick={() => setActiveIndex(index + 1)}
            ></div>
          ))}
        </div>
      </div>

      {/* Flechas de Navegación */}
      <div
        onClick={() => handleSlide(-1)}
        className="absolute w-10 h-10 top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white ml-2 rounded-full hover:scale-110"
      >
        <IconButton className="bg-transparent shadow-none hover:rounded-full">
          <i className="fa-solid  text-white text-lg fa-chevron-left"></i>
        </IconButton>
      </div>

      <div
        onClick={() => handleSlide(1)}
        className="absolute w-10 h-10 top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white mr-2 rounded-full hover:scale-110"
      >
        <IconButton className="bg-transparent shadow-none hover:rounded-full ">
          <i className="fa-solid  text-white text-lg fa-chevron-right"></i>
        </IconButton>
      </div>
    </div>
  );
}
