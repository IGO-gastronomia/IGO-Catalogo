// Products.js
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import categs from "../assets/categs.json";
import productos from "../assets/productos.json";
import { DefaultPagination } from "./DefaultPagination.jsx";
import { useSearch } from "../SearchContext";
import { Helmet } from "react-helmet";

export default function Products() {
  const { slug } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [productsByCateg, setProductsByCateg] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const productsPerPage = 20;
  const { searchQuery } = useSearch();

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  useEffect(() => {
    if (!slug) {
      setProductsByCateg(productos);
      setCategoria({ nombreCategoria: "Todos los productos" });
    } else {
      const foundCategoria = categs.find(
        (cat) => createSlug(cat.nombreCategoria) === slug
      );
      setCategoria(
        foundCategoria || { nombreCategoria: "Categoría no encontrada" }
      );
      const productsByCat = productos.filter(
        (prod) => prod.idCategoria === foundCategoria?.idCategoria
      );
      setProductsByCateg(productsByCat);
    }
  }, [slug]);

  // Filtrar productos en función de la búsqueda
  const filteredProducts = useMemo(() => {
    return productsByCateg.filter(
      (prod) =>
        prod.nombreProducto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.precio.toString().includes(searchQuery) ||
        prod.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [productsByCateg, searchQuery]);

  // Actualizar productos visibles para la paginación
  useEffect(() => {
    const startIndex = (activePage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setVisibleProducts(filteredProducts.slice(startIndex, endIndex));
  }, [activePage, filteredProducts]);

  const handlePageChange = (page) => setActivePage(page);

  return (
    <>
      {/* Meta Tags para SEO */}
      <Helmet>
        <title>
          {"IGO - " + categoria?.nombreCategoria || "IGO - Productos"}{" "}
        </title>
        <meta
          name="description"
          content={`Explora nuestra colección de productos de ${
            categoria?.nombreCategoria || "productos"
          }.`}
        />
      </Helmet>

      <section className="pt-24 md:pt-26 flex min-h-screen flex-col items-center justify-start lg:pt-28 text-center px-3">
        {categoria ? (
          <>
            <div className="h-32 w-full md:w-[95%] bg-black rounded-3xl flex justify-center items-center">
              <h1 className="text-white text-2xl">
                {categoria.nombreCategoria.split(" ").slice(0, 1).join(" ")}
              </h1>
            </div>

            {/* Descripción de la categoría */}
            {categoria.nombreCategoria !== "Categoría no encontrada" &&
              visibleProducts > 0 && (
                <p className="text-gray-400 text-base mt-4">
                  Explora nuestros productos de{" "}
                  {categoria.nombreCategoria.toLowerCase()}.
                </p>
              )}

            {/* Listado de productos filtrados */}
            <section className="flex justify-center flex-wrap gap-3 md:gap-8 pt-4 lg:max-w-[90%]">
              {visibleProducts && visibleProducts.length ? (
                visibleProducts.map((prod) => (
                  <Link to={`${prod.idProducto}`} key={prod.idProducto}>
                    <article className="relative h-56 w-44 md:h-72 md:w-64 rounded-3xl flex justify-center items-center transform transition-transform duration-300 ease-in-out border-0 border-transparent hover:scale-105 hover:border-[1px] hover:border-white hover:shadow-2xl bg-gray-300">
                      {/* Imagen con opacidad condicional */}
                      <div className="relative h-full w-full rounded-3xl overflow-hidden">
                        <img
                          src={
                            prod.imgProducto
                              ? prod.imgProducto
                              : "/img/IGO-logo.png"
                          }
                          alt={prod.nombreProducto}
                          className={`h-full w-full object-cover ${
                            !prod.imgProducto ? "opacity-80" : ""
                          }`}
                          loading="lazy"
                        />
                      </div>

                      {/* Información del producto */}
                      <div className="absolute bottom-0 left-0 p-2 min-h-20 flex flex-col justify-center bg-black bg-opacity-85 text-white w-full rounded-b-3xl">
                        <h1 className="text-sm md:text-[16px] text-start md:text-center mb-3 font-semibold first-letter:uppercase lowercase">
                          {prod.nombreProducto}
                        </h1>
                      </div>
                    </article>
                  </Link>
                ))
              ) : (
                <p role="alert" className="text-gray-400">
                  No se encontraron productos para la búsqueda{" "}
                  {`${searchQuery}`}
                  en {categoria.nombreCategoria}.
                </p>
              )}
            </section>

            {/* Paginación */}
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
