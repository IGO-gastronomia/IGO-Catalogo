import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Stock({ onLogout }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [urlImagen, setUrlImagen] = useState("");

  const [errors, setErrors] = useState({}); // Manejo de errores

  const API_URL = "https://igo-catalogo-back.onrender.com/productos";
  const TABLE_HEAD = [
    "ID",
    "Nombre",
    "Descripcion",
    "Categoria",
    "Precio",
    "Stock",
    "Imagen",
    "Acciones",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    const fetchCategories = () => {
      const categoryData = [
        { idCategoria: 1, nombreCategoria: "cocina" },
        { idCategoria: 2, nombreCategoria: "pasteleria" },
        { idCategoria: 3, nombreCategoria: "decoracion" },
      ];
      setCategories(categoryData);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setNombre(selectedProduct?.nombre || "");
      setDescripcion(selectedProduct?.descripcion || "");
      setCategoria(selectedProduct?.id_categoria?.toString() || "");
      setPrecio(selectedProduct?.precio?.toString() || "");
      setStock(selectedProduct?.stock?.toString() || "");
      setUrlImagen(selectedProduct?.url_imagen || "");
      setErrors({}); // Reiniciar errores
    }
  }, [isModalOpen, selectedProduct]);

  const validateFields = () => {
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!descripcion.trim())
      newErrors.descripcion = "La descripción es obligatoria";
    if (!categoria.trim()) newErrors.categoria = "La categoría es obligatoria";
    if (!precio || parseFloat(precio) < 0)
      newErrors.precio = "El precio debe ser mayor a 0";
    if (!stock || parseInt(stock, 10) < 0)
      newErrors.stock = "El stock debe ser 0 o mayor";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddClick = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = async () => {
    if (!validateFields()) return;

    const productData = {
      nombre,
      descripcion,
      id_categoria: parseInt(categoria, 10) || null,
      precio: parseFloat(precio) || 0,
      stock: parseInt(stock, 10) || 0,
      url_imagen: urlImagen || null,
    };

    try {
      const options = {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      };

      const url = isEditing
        ? `${API_URL}/${selectedProduct.id_producto}`
        : API_URL;

      const response = await fetch(url, options);

      if (response.ok) {
        const result = await response.json();
        if (isEditing) {
          setProducts((prev) =>
            prev.map((product) =>
              product.id_producto === selectedProduct.id_producto
                ? result
                : product
            )
          );
          toast.success("Producto actualizado correctamente");
        } else {
          setProducts((prev) => [...prev, result]);
          toast.success("Producto agregado correctamente");
        }
      } else {
        const errorResponse = await response.json();
        console.error("Error del servidor:", errorResponse);
        toast.error("Error al procesar el producto");
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      toast.error(
        "Error al guardar el producto. Verifica tu conexión o datos."
      );
    } finally {
      handleModalClose();
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = products.filter(
      (product) =>
        product.nombre.toLowerCase().includes(value) ||
        product.descripcion.toLowerCase().includes(value) ||
        categories.find(
          (category) =>
            category.idCategoria === product.id_categoria &&
            category.nombreCategoria.toLowerCase().includes(value)
        )
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="flex flex-col mx-auto w-[70%] pb-10">
      <ToastContainer />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Cargando productos...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full">
            <div className="fixed top-10 right-4 z-[999999]">
              <Button
                color="red"
                onClick={onLogout}
                className="bg-transparent shadow-none hover:text-red-700 hover:scale-105 hover:shadow-none text-red-400 font-medium py-2 px-4 "
              >
                logout
              </Button>
            </div>
            <div className="flex justify-between p-4">
              <Button
                color="green"
                onClick={handleAddClick}
                className="flex items-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Agregar Producto
              </Button>
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearch}
                className="border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>
          <Card className="overflow-scroll min-h-36 max-h-[700px] rounded-2xl">
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-90"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr
                    key={product.id_producto || index}
                    className="even:bg-blue-gray-50/50"
                  >
                    <td className="p-4">{product.id_producto || "N/A"}</td>
                    <td className="p-4">{product.nombre || "N/A"}</td>
                    <td className="p-4">
                      {product.descripcion
                        ? product.descripcion.split(" ").slice(0, 5).join(" ") +
                          " ..."
                        : "N/A"}
                    </td>
                    <td className="p-4">
                      {categories.find(
                        (category) =>
                          category.idCategoria === product.id_categoria
                      )?.nombreCategoria || "N/A"}
                    </td>
                    <td className="p-4">${product.precio || "N/A"}</td>
                    <td className="p-4">{product.stock || "N/A"}</td>
                    <td className="p-4">
                      {product.url_imagen ? (
                        <img
                          src={product.url_imagen}
                          alt={product.nombre}
                          className="w-16 h-16 object-contain rounded"
                        />
                      ) : (
                        <Typography variant="small" color="blue-gray">
                          No Image
                        </Typography>
                      )}
                    </td>
                    <td className="p-4">
                      <Button
                        variant="text"
                        color="blue"
                        onClick={() => handleEditClick(product)}
                      >
                        <PencilIcon className="h-5 w-5 text-blue-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}

      <Dialog
        open={isModalOpen}
        handler={handleModalClose}
        size="xs"
        animate={{
          mount: { opacity: 1 },
          unmount: { opacity: 0 },
        }}
      >
        <DialogBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="text-center mb-4"
          >
            {isEditing ? "Editar Producto" : "Agregar Producto"}
          </Typography>
          <form className="space-y-4">
            {[
              {
                label: "Nombre",
                value: nombre,
                onChange: setNombre,
                field: "nombre",
              },
              {
                label: "Descripción",
                value: descripcion,
                onChange: setDescripcion,
                field: "descripcion",
              },
              {
                label: "Precio",
                value: precio,
                onChange: setPrecio,
                field: "precio",
              },
              {
                label: "Stock",
                value: stock,
                onChange: setStock,
                field: "stock",
              },
            ].map(({ label, value, onChange, field }) => (
              <div key={field}>
                <label
                  className={`block text-sm font-medium  ${
                    errors[field] ? "text-red-500 " : "text-gray-700"
                  } `}
                >
                  {label}
                </label>
                <input
                  type={
                    field === "precio" || field === "stock" ? "number" : "text"
                  }
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className={`mt-1 block w-full p-2 border ${
                    errors[field] ? "border-red-500 " : "border-gray-300"
                  } rounded`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Categoria
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required={true}
              >
                <option value="" disabled>
                  Seleccionar categoría
                </option>
                {categories.map((category) => (
                  <option
                    key={category.idCategoria}
                    value={category.idCategoria}
                  >
                    {category.nombreCategoria}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL de Imagen
              </label>
              <input
                type="text"
                value={urlImagen}
                onChange={(e) => setUrlImagen(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleModalClose} className="mr-2">
            Cancelar
          </Button>
          <Button
            color={isEditing ? "blue" : "green"}
            onClick={handleSaveProduct}
          >
            {isEditing ? "Guardar" : "Agregar"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
