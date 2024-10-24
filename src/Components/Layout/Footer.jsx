import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="mx-auto px-1 md:px-6 py-3 bg-black w-full ">
        <div className="flex flex-row flex-wrap items-center  justify-evenly xl:justify-between gap-y-6 gap-x-4 md:gap-x-12 bg-black text-center">
          <div className="flex flex-col h-100 border-r-2 pr-5 md:pr-20 ">
            <Typography
              color="blue-gray"
              className=" text-gris-claro flex items-center font-semibold"
            >
              Sede
            </Typography>
            <Typography
              color="blue-gray"
              className=" text-gris-claro font-norma flex items-center"
            >
              Vicente López 2471
            </Typography>
            <Typography
              color="blue-gray"
              className=" text-gris-claro font-norma flex items-center"
            >
              Olavarría, Buenos Aires
            </Typography>
          </div>

          <ul className="flex items-start flex-row  gap-x-2 ">
            <div className="flex flex-col gap-x-2 gap-y-2">
              <li>
                <div className="flex items-center">
                  <a
                    href="https://www.facebook.com/InstitutoGastronomicoOlavarria"
                    target="_blank"
                  >
                    <img
                      className="h-7 w-7 rounded-full object-cover object-center mr-2 mb-1"
                      src="./iconos/icono-facebook.png"
                      alt="Facebook icono"
                    />
                  </a>
                  <Typography
                    as="a"
                    href="https://www.facebook.com/InstitutoGastronomicoOlavarria"
                    target="_blank"
                    color="blue-gray"
                    className="hidden xl:block font-normal transition-colors text-gris-claro hover:text-blue-500 focus:text-blue-500"
                  >
                    instituto Gastronómico Olavarría
                  </Typography>
                </div>
              </li>

              <li>
                <div className="flex items-center">
                  <a
                    href="https://www.instagram.com/igo.gastronomia/"
                    target="_blank"
                  >
                    <img
                      className="h-7 w-7 rounded-full object-cover object-center mr-2 mb-1"
                      src="./iconos/icono-instagram.png"
                      alt="Instagram icono"
                    />
                  </a>
                  <Typography
                    as="a"
                    href="https://www.instagram.com/igo.gastronomia/"
                    target="_blank"
                    color="blue-gray"
                    className="hidden xl:block font-normal transition-colors text-gris-claro hover:text-blue-500 focus:text-blue-500"
                  >
                    igo.gastronomia
                  </Typography>
                </div>
              </li>
            </div>

            <div className="flex flex-col gap-x-2 gap-y-2">
              <Link to="form-consulta">
                <li>
                  <div className="flex items-center">
                    <img
                      className="h-7 w-7 rounded-full object-cover object-center mr-2 mb-1"
                      src="./iconos/icono-mail.png"
                      alt="Facebook icono"
                    />
                    <Typography
                      as="a"
                      color="blue-gray"
                      className="hidden xl:block font-normal transition-colors text-gris-claro hover:text-blue-500 focus:text-blue-500"
                    >
                      institutogastronomicoolavarria@gmail.com
                    </Typography>
                  </div>
                </li>
              </Link>
              <li>
                <div className="flex items-center">
                  <a
                    href="https://api.whatsapp.com/send/?phone=5492284620662&text&type=phone_number&app_absent=0"
                    target="_blank"
                  >
                    <img
                      className="h-7 w-7 rounded-full object-cover object-center mr-2 mb-1"
                      src="./iconos/icono-wsp.png"
                      alt="Facebook icono"
                    />
                  </a>
                  <Typography
                    as="a"
                    href="https://api.whatsapp.com/send/?phone=5492284620662&text&type=phone_number&app_absent=0"
                    target="_blank"
                    color="blue-gray"
                    className="hidden xl:block font-normal transition-colors text-gris-claro hover:text-blue-500 focus:text-blue-500"
                  >
                    +54 9 2284 62 0662
                  </Typography>
                </div>
              </li>
            </div>
          </ul>
          <img src="./img/IGO-logo.png" alt="logo-ct" className="w-10" />
        </div>
      </footer>
    </>
  );
}
