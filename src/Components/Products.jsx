import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import categs from "../assets/categs.json";
import productos from "../assets/productos.json";
import { DefaultPagination } from "./DefaultPagination.jsx"; // Asegúrate de importar tu componente de paginación

export default function Products() {
  const { slug } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [productsByCateg, setProductsByCateg] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const productsPerPage = 20; // Número de productos por página

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
      setCategoria(null);
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

  useEffect(() => {
    const startIndex = (activePage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setVisibleProducts(productsByCateg.slice(startIndex, endIndex));
  }, [activePage, productsByCateg]);

  const handlePageChange = (page) => setActivePage(page);

  return (
    <section className="pt-24 md:pt-26 flex min-h-screen flex-col items-center justify-center lg:pt-28 text-center px-3">
      {categoria ? (
        <>
          <div className="h-32 w-full md:w-[95%] bg-black rounded-3xl flex justify-center items-center">
            <h1 className="text-white text-2xl">
              {categoria.nombreCategoria.split(" ").slice(0, 1).join(" ")}
            </h1>
          </div>

          <section className="flex justify-center flex-wrap gap-4 md:gap-8 pt-4 p-2 lg:max-w-[90%] ">
            {visibleProducts && visibleProducts.length ? (
              visibleProducts.map((prod) => (
                <article
                  key={prod.idProducto}
                  className="relative h-48 w-40 md:h-72 md:w-64 bg-gray-300 rounded-3xl flex justify-center items-center"
                >
                  <div className="absolute bottom-0 left-0 p-3 min-h-20 flex flex-col justify-center bg-black bg-opacity-55 text-white w-full rounded-b-3xl">
                    <h1 className="text-sm md:text-[16px] lg:text-lg text-start font-semibold">
                      {prod.nombreProducto.split(" ").slice(0, 6).join(" ")}
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
            totalItems={productsByCateg.length}
            itemsPerPage={productsPerPage}
          />
        </>
      ) : (
        <p>Categoría no encontrada</p>
      )}
    </section>
  );
}
