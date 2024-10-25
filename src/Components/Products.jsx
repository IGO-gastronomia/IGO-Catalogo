import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import categs from "../assets/categs.json";
import productos from "../assets/productos.json";

export default function Products() {
  const { slug } = useParams(); // Obtenemos el slug desde la URL
  const [categoria, setCategoria] = useState(null);
  const [productsByCateg, setProductsByCateg] = useState(null);

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  useEffect(() => {
    if (!slug) {
      // Si no hay slug, mostramos todos los productos
      setProductsByCateg(productos);
      setCategoria({ nombreCategoria: "Todos los productos" });
    } else {
      setCategoria(null);
      // Buscar la categoría correspondiente al slug
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
  /*  useEffect(() => {
    setCategoria(null);
    // Buscar la categoría correspondiente al slug
    const foundCategoria = categs.find(
      (cat) => createSlug(cat.nombreCategoria) === slug
    );
    setCategoria(foundCategoria);

    const productsByCat = productos.filter(
      (prod) => prod.idCategoria === foundCategoria.idCategoria
    );
    setProductsByCateg(productsByCat);
    console.log(productsByCat.length);
  }, [slug]); */

  return (
    <section className="pt-24 text-center px-3 ">
      {categoria ? (
        <>
          <div className=" h-32 bg-black rounded-3xl flex justify-center items-center">
            <h1 className="text-white text-2xl">{categoria.nombreCategoria}</h1>
          </div>

          <section className="flex justify-center flex-wrap gap-4 pt-4 p-2 ">
            {productsByCateg && productsByCateg.length ? (
              productsByCateg.map((prod) => {
                return (
                  <article
                    key={prod.idProducto}
                    className=" h-48 w-40 bg-black rounded-3xl flex justify-center items-center"
                  >
                    <h1 className="text-white text-2xl">
                      {prod.idProducto}
                      {prod.nombreProducto}
                    </h1>
                  </article>
                );
              })
            ) : (
              <>
                <h1>No hay productos registrados</h1>
              </>
            )}
          </section>
        </>
      ) : (
        <p>Categoría no encontrada</p>
      )}
    </section>
  );
}
