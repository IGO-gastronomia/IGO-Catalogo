import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import categs from "../assets/categs.json";

export default function Products() {
  const { slug } = useParams(); // Obtenemos el slug desde la URL
  const [categoria, setCategoria] = useState(null);

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  useEffect(() => {
    // Buscar la categoría correspondiente al slug
    const foundCategoria = categs.find(
      (cat) => createSlug(cat.nombreCategoria) === slug
    );
    setCategoria(foundCategoria);
  }, [slug]);

  return (
    <section className="pt-24 text-center">
      {categoria ? (
        <h1>Productos de la categoría: {categoria.nombreCategoria}</h1>
      ) : (
        <p>Categoría no encontrada</p>
      )}
      <Link to="/" className="text-blue-600 cursor-pointer">
        Home
      </Link>
    </section>
  );
}
