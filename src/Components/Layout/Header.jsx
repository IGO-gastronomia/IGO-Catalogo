import { Navbar, IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categs from "../../assets/categs.json";

const NavbarWithMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setCategorias(categs);
  }, []);

  // Función para convertir el nombre de una categoría en un slug (amigable para la URL)
  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar className="mx-auto mt-2 lg:mt-5 w-[95%] min-h-14 max-w-screen-xl px-3 py-3 shadow-[0px_10px_30px_rgba(0,0,0,0.5)] bg-gray-400 bg-opacity-85 text-black flex items-center text-center border-none fixed left-1/2 transform -translate-x-1/2 z-[1000]">
        <div className="flex justify-between w-full items-center">
          {/* Botón del menú a la izquierda */}
          <IconButton variant="text" size="md" onClick={toggleMenu}>
            <i className="fa fa-bars text-black text-xl" aria-hidden="true"></i>
          </IconButton>

          {/* Imagen centrada */}
          <Link to="/">
            <img
              className="w-8 mx-auto bg-black rounded-lg shadow-sm shadow-blue-gray-900/50"
              src="/img/IGO-logo.png"
              alt="logo de igo"
            />
          </Link>
          <div className="w-8"></div>
        </div>
      </Navbar>

      {/* Menú desplegable */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-800 text-white transform transition-transform duration-500 ease-in-out z-[99999] bg-opacity-85 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          {/* Botón de cerrar */}
          <IconButton variant="text" size="md" onClick={toggleMenu}>
            <i
              className="fa fa-times text-white text-xl"
              aria-hidden="true"
            ></i>
          </IconButton>
        </div>

        {/* Contenido del menú */}
        <div className="flex flex-col items-center justify-start mt-10 h-full">
          {categorias.map((cat) => {
            const slug = createSlug(cat.nombreCategoria);
            return (
              <Link
                key={cat.idCategoria}
                to={`/products/${slug}`}
                onClick={toggleMenu}
                className="leading-[2.5] flex flex-col justify-start"
              >
                {cat.nombreCategoria}
              </Link>
            );
          })}
          <Link
            to={`/products`}
            onClick={toggleMenu}
            className="leading-[2.5] flex flex-col justify-start"
          >
            Todos los productos
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavbarWithMenu;
