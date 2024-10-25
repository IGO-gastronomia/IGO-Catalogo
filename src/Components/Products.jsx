// Products.js
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import categs from "../assets/categs.json";
import productos from "../assets/productos.json";
import { DefaultPagination } from "./DefaultPagination.jsx";
import { useSearch } from "../SearchContext"; // Importa el contexto de búsqueda

export default function Products() {
  const { slug } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [productsByCateg, setProductsByCateg] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const productsPerPage = 20;
  const { searchQuery } = useSearch(); // Obtiene el término de búsqueda

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
      setCategoria(foundCategoria);
      const productsByCat = productos.filter(
        (prod) => prod.idCategoria === foundCategoria.idCategoria
      );
      setProductsByCateg(productsByCat);
    }
  }, [slug]);

  // Filtra los productos en función del término de búsqueda y paginación
  useEffect(() => {
    const filteredProducts = productsByCateg.filter(
      (prod) =>
        prod.nombreProducto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.precio.toString().includes(searchQuery) ||
        prod.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const startIndex = (activePage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setVisibleProducts(filteredProducts.slice(startIndex, endIndex));
  }, [activePage, productsByCateg, searchQuery]);

  const handlePageChange = (page) => setActivePage(page);

  return (
    <section className="pt-24 md:pt-26 flex min-h-screen flex-col items-center justify-start lg:pt-28 text-center px-3">
      {categoria ? (
        <>
          <div className="h-32 w-full md:w-[95%] bg-black rounded-3xl flex justify-center items-center">
            <h1 className="text-white text-2xl">
              {categoria.nombreCategoria.split(" ").slice(0, 1).join(" ")}
            </h1>
          </div>

          {/* Listado de productos filtrados */}
          <section className="flex justify-center flex-wrap gap-4 md:gap-8 pt-4 p-2 lg:max-w-[90%] ">
            {visibleProducts && visibleProducts.length ? (
              visibleProducts.map((prod) => (
                <article
                  key={prod.idProducto}
                  className="relative h-48 w-40 md:h-72 md:w-64 bg-gray-300 rounded-3xl flex justify-center items-center"
                >
                  <div className="absolute bottom-0 left-0 p-3 min-h-20 flex flex-col justify-center bg-black bg-opacity-55 text-black w-full rounded-b-3xl">
                    <h1 className="text-sm md:text-[16px] text-start text-wrap md:text-center mb-3 font-semibold first-letter:uppercase lowercase">
                      {prod.nombreProducto.split(" ").slice(0, 3).join(" ") +
                        " ..."}
                    </h1>
                    <h1 className="text-sm md:text-[16px]  text-start font-bold">
                      Precio: $
                      <span className="font-semibold">{prod.precio}</span>
                    </h1>
                    <h1 className="text-sm md:text-[16px]  text-start font-bold">
                      Stock: <span className="font-semibold">{prod.stock}</span>
                    </h1>
                  </div>
                </article>
              ))
            ) : (
              <h1>No hay productos registrados</h1>
            )}
          </section>

          {/* Paginación */}
          <DefaultPagination
            activePage={activePage}
            onPageChange={handlePageChange}
            totalItems={
              productsByCateg.filter((prod) =>
                prod.nombreProducto
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              ).length
            }
            itemsPerPage={productsPerPage}
          />
        </>
      ) : (
        <p>Categoría no encontrada</p>
      )}
    </section>
  );
}
