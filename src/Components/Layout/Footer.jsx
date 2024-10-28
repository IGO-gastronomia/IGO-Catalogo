import { Typography } from "@material-tailwind/react";
import { Helmet } from "react-helmet";

export default function Footer() {
  return (
    <>
      {/* SEO para el Footer */}
      <Helmet>
        <title>IGO - Catologo</title>
        <meta
          name="description"
          content="Contacto y redes sociales del Instituto Gastronómico Olavarría. Encuéntranos en Vicente López 2471, Olavarría, Buenos Aires."
        />
      </Helmet>

      <footer className="mx-auto px-1 md:px-6 py-3 bg-black w-full ">
        <div className="flex flex-row flex-wrap items-center justify-evenly xl:justify-between gap-y-6 gap-x-4 md:gap-x-12 bg-black text-center">
          {/* Información de la Sede */}
          <div className="flex flex-col h-100 border-r-2 pr-5 md:pr-20 ">
            <Typography
              color="blue-gray"
              className="text-gris-claro flex items-center font-semibold"
            >
              Sede
            </Typography>
            <Typography
              color="blue-gray"
              className="text-gris-claro font-norma flex items-center"
            >
              Vicente López 2471
            </Typography>
            <Typography
              color="blue-gray"
              className="text-gris-claro font-norma flex items-center"
            >
              Olavarría, Buenos Aires
            </Typography>
          </div>

          {/* Enlaces a Redes Sociales y Contacto */}
          <ul className="flex items-start flex-row gap-x-2">
            <div className="flex flex-col gap-x-2 gap-y-2">
              {/* Facebook */}
              <li>
                <div className="flex items-center">
                  <a
                    href="https://www.facebook.com/InstitutoGastronomicoOlavarria"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instituto Gastronómico Olavarría en Facebook"
                  >
                    <img
                      className="h-7 w-7 rounded-full object-cover object-center mr-2 mb-1"
                      src="./iconos/icono-facebook.png?v=1"
                      alt="Facebook icono"
                      loading="lazy"
                    />
                  </a>
                  <Typography
                    as="a"
                    href="https://www.facebook.com/InstitutoGastronomicoOlavarria"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="blue-gray"
                    className="hidden xl:block font-normal transition-colors text-gris-claro hover:text-blue-500 focus:text-blue-500"
                  >
                    Instituto Gastronómico Olavarría
                  </Typography>
                </div>
              </li>

              {/* Instagram */}
              <li>
                <div className="flex items-center">
                  <a
                    href="https://www.instagram.com/igo.gastronomia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instituto Gastronómico Olavarría en Instagram"
                  >
                    <img
                      className="h-7 w-7 rounded-full object-cover object-center mr-2 mb-1"
                      src="./iconos/icono-instagram.png?v=1"
                      alt="Instagram icono"
                      loading="lazy"
                    />
                  </a>
                  <Typography
                    as="a"
                    href="https://www.instagram.com/igo.gastronomia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="blue-gray"
                    className="hidden xl:block font-normal transition-colors text-gris-claro hover:text-blue-500 focus:text-blue-500"
                  >
                    igo.gastronomia
                  </Typography>
                </div>
              </li>
            </div>

            <div className="flex flex-col gap-x-2 gap-y-2">
              {/* Email */}
              <li>
                <div className="flex items-center">
                  <img
                    className="h-7 w-7 rounded-full object-cover object-center mr-2 mb-1"
                    src="./iconos/icono-mail.png?v=1"
                    alt="Email icono"
                    loading="lazy"
                  />
                  <Typography
                    as="p"
                    color="blue-gray"
                    className="hidden xl:block font-normal transition-colors text-gris-claro hover:text-blue-500 focus:text-blue-500"
                  >
                    institutogastronomicoolavarria@gmail.com
                  </Typography>
                </div>
              </li>

              {/* WhatsApp */}
              <li>
                <div className="flex items-center">
                  <a
                    href="https://api.whatsapp.com/send/?phone=5492284620662&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Enviar mensaje por WhatsApp"
                  >
                    <img
                      className="h-7 w-7 rounded-full object-cover object-center mr-2 mb-1"
                      src="./iconos/icono-wsp.png?v=1"
                      alt="WhatsApp icono"
                      loading="lazy"
                    />
                  </a>
                  <Typography
                    as="a"
                    href="https://api.whatsapp.com/send/?phone=5492284620662&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="blue-gray"
                    className="hidden xl:block font-normal transition-colors text-gris-claro hover:text-blue-500 focus:text-blue-500"
                  >
                    +54 9 2284 62 0662
                  </Typography>
                </div>
              </li>
            </div>
          </ul>

          {/* Logo */}
          <img
            src="./img/IGO-logo.png?v=1"
            alt="Logo Instituto Gastronómico Olavarría"
            className="w-10"
            loading="lazy"
          />
        </div>
      </footer>
    </>
  );
}
