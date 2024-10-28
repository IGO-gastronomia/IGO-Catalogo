import { Navbar, IconButton } from "@material-tailwind/react";
import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import categs from "../../assets/categs.json";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearch } from "../../SearchContext";
import { Helmet } from "react-helmet";

const NavbarWithMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchWidth, setSearchWidth] = useState("40px");
  const { searchQuery, setSearchQuery } = useSearch();
  const location = useLocation();
  const showSearch = location.pathname.includes("/products");

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // Ajuste del ancho de búsqueda según el estado y la ventana
  useEffect(() => {
    const updateSearchWidth = () => {
      setSearchWidth(
        isSearchOpen ? (window.innerWidth >= 768 ? "200px" : "150px") : "40px"
      );
    };
    updateSearchWidth();
    window.addEventListener("resize", updateSearchWidth);
    return () => window.removeEventListener("resize", updateSearchWidth);
  }, [isSearchOpen]);

  // Debounce para reducir la frecuencia de actualizaciones de búsqueda
  const handleSearchChange = useCallback(
    (e) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <>
      <Helmet>
        <title>IGO - Catalogo</title>
        <meta
          name="description"
          content="Explora categorías de productos y busca artículos en IGO (Instituto Gastronómico Olavarría)."
        />
      </Helmet>

      <Navbar
        aria-label="barra de navegación principal"
        className="mx-auto mt-2 lg:mt-5 w-[95%] min-h-14 max-w-screen-xl px-3 py-3 shadow-[0px_10px_30px_rgba(0,0,0,0.5)] bg-gray-300 bg-opacity-85 text-black flex items-center text-center border-none fixed left-1/2 transform -translate-x-1/2 z-[1000]"
      >
        <div className="flex justify-between w-full items-center">
          <IconButton
            aria-label="Abrir menú de navegación"
            variant="text"
            size="md"
            onClick={toggleMenu}
            className="text-black"
          >
            <i className="fa fa-bars text-black text-xl" aria-hidden="true"></i>
          </IconButton>

          <Link to="/" className="flex items-center mx-auto md:mx-0 ">
            <img className="w-10 " src="/img/IGO-logo.png" alt="logo de igo" />
          </Link>

          <div className="w-10"></div>

          {showSearch && (
            <div className="absolute right-3 flex items-center space-x-2">
              <div
                className="relative flex items-center border border-gray-500 rounded-full transition-all duration-300 overflow-hidden"
                style={{ width: searchWidth }}
              >
                <IconButton
                  aria-label="Abrir barra de búsqueda"
                  variant="text"
                  size="md"
                  onClick={toggleSearch}
                  className="text-black rounded-full hover:bg-transparent focus:bg-transparent"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </IconButton>
                {isSearchOpen && (
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="bg-transparent outline-none text-black w-full pr-8 placeholder-gray-600"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </Navbar>

      {/* Menú desplegable */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-800 text-white transform transition-transform duration-500 ease-in-out z-[99999] bg-opacity-95 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <IconButton
            aria-label="Cerrar menú de navegación"
            variant="text"
            size="md"
            onClick={toggleMenu}
          >
            <i
              className="fa fa-times text-white text-xl"
              aria-hidden="true"
            ></i>
          </IconButton>
        </div>

        <div className="flex flex-col items-center justify-start mt-10 h-full">
          {categs.map((cat) => {
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
            to="/products"
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
