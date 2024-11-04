import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import categs from "../assets/categs.json";
import { DefaultPagination } from "./DefaultPagination.jsx";
import { useSearch } from "../SearchContext";
import { Helmet } from "react-helmet";

export default function Products() {
  const { slug } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [productsByCateg, setProductsByCateg] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 20;
  const { searchQuery } = useSearch();

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let apiUrl = "https://igo-catalogo-back.onrender.com/productos/";

        if (slug) {
          const foundCategoria = categs.find(
            (cat) => createSlug(cat.nombreCategoria) === slug
          );

          if (foundCategoria) {
            setCategoria(foundCategoria);
            apiUrl = `https://igo-catalogo-back.onrender.com/productos/categoria/${foundCategoria.idCategoria}`;
          } else {
            setCategoria({ nombreCategoria: "Categoría no encontrada" });
            setProductsByCateg([]);
            setIsLoading(false);
            return; // Sale si no se encuentra la categoría
          }
        } else {
          setCategoria({
            nombreCategoria: "Todos los productos",
            img: "https://res.cloudinary.com/dwkyq6kut/image/upload/v1730483827/fotos%20igo%20catalogo/tuzebizepjsybu6qil2k.jpg",
          });
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        setProductsByCateg(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  const filteredProducts = useMemo(() => {
    return productsByCateg.filter(
      (prod) =>
        (prod.nombre &&
          prod.nombre.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (prod.precio && prod.precio.toString().includes(searchQuery)) ||
        (prod.descripcion &&
          prod.descripcion.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [productsByCateg, searchQuery]);

  useEffect(() => {
    const startIndex = (activePage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setVisibleProducts(filteredProducts.slice(startIndex, endIndex));
  }, [activePage, filteredProducts]);

  useEffect(() => {
    console.log(productsByCateg);
  }, [productsByCateg]);

  const handlePageChange = (page) => setActivePage(page);

  return (
    <>
      <Helmet>
        <title>
          {"IGO - " + categoria?.nombreCategoria || "IGO - Productos"}
        </title>
        <meta
          name="description"
          content={`Explora nuestra colección de productos de ${
            categoria?.nombreCategoria || "productos"
          }.`}
        />
      </Helmet>

      <section className="pt-24 md:pt-26 flex min-h-screen flex-col items-center justify-start lg:pt-28 text-center px-3">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
          </div>
        ) : categoria ? (
          <>
            <div
              className="h-44 w-full md:h-60 md:w-[75%] bg-cover bg-center rounded-3xl flex justify-center items-center relative"
              style={{ backgroundImage: `url(${categoria.img})` }}
            >
              {/* Overlay semitransparente */}
              <div className="absolute inset-0 bg-black/35 rounded-3xl"></div>

              {/* Texto */}
              <h1 className="text-white text-3xl font-bold uppercase relative z-10">
                {categoria.nombreCategoria.split(" ").slice(0, 1).join(" ")}
              </h1>
            </div>

            {categoria.nombreCategoria !== "Categoría no encontrada" &&
              visibleProducts.length > 0 && (
                <p className="text-gray-400 text-base mt-4">
                  Explora nuestros productos de{" "}
                  {categoria.nombreCategoria.toLowerCase()}.
                </p>
              )}

            <section className="flex justify-center flex-wrap gap-3 md:gap-8 pt-4 lg:max-w-[90%]">
              {visibleProducts.length ? (
                visibleProducts.map((prod) => (
                  <Link to={`${prod.id_producto}`} key={prod.id_producto}>
                    <article className="h-72 w-44 md:h-80 md:w-64 rounded-3xl flex flex-col transform transition-transform duration-300 ease-in-out border-0 border-transparent hover:scale-105 hover:border-[1px] hover:border-white hover:shadow-2xl bg-gray-300">
                      {/* Imagen del producto */}
                      <div className="h-3/4 w-full rounded-t-3xl overflow-hidden">
                        <img
                          src={
                            prod.url_imagen
                              ? prod.url_imagen
                              : "/img/IGO-logo.png"
                          }
                          alt={"imagen del producto: " + prod.nombre}
                          className={`h-full w-full object-contain py-3 ${
                            !prod.url_imagen ? "opacity-80" : ""
                          }`}
                          loading="lazy"
                        />
                      </div>

                      {/* Nombre del producto */}
                      <div className="h-1/4 p-2 flex items-center bg-black bg-opacity-85 text-white w-full rounded-b-3xl">
                        <h1 className="text-sm md:text-[16px] text-center font-semibold first-letter:uppercase lowercase w-full">
                          {prod.nombre}
                        </h1>
                      </div>
                    </article>
                  </Link>
                ))
              ) : (
                <p role="alert" className="text-gray-400">
                  No se encontraron productos para la búsqueda{" "}
                  {`${searchQuery}`} en {categoria.nombreCategoria}.
                </p>
              )}
            </section>

            {filteredProducts.length > productsPerPage && (
              <DefaultPagination
                activePage={activePage}
                onPageChange={handlePageChange}
                totalItems={filteredProducts.length}
                itemsPerPage={productsPerPage}
              />
            )}
          </>
        ) : (
          <p>Categoría no encontrada</p>
        )}
      </section>
    </>
  );
}
