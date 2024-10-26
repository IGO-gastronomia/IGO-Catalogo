import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productos from "../assets/productos.json";

export default function Product() {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Encuentra el producto que coincide con el idProducto
    const prod = productos.find((p) => p.idProducto.toString() === idProducto);
    if (prod) {
      // Guarda el producto encontrado en el estado
      setProducto(prod);
    }
  }, [idProducto]);

  return (
    <div className="pt-24 h-screen">
      {producto ? (
        <div>
          <h1>Producto con ID: {producto.idProducto}</h1>
          <p>Nombre: {producto.nombreProducto}</p>
          <p>Precio: ${producto.precio}</p>
          <p>Descripción: {producto.descripcion}</p>
        </div>
      ) : (
        <p>Producto no encontrado</p>
      )}
    </div>
  );
}
