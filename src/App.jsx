import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import Products from "./Components/Products";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Product from "./Components/Product";
import Admin from "./Components/Admin";

export default function App() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:slug" element={<Products />}></Route>
        <Route path="/products/:slug/:idProducto" element={<Product />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="*" element={<h1>Not found</h1>}></Route>
        <Route path="/products/*" element={<h1>Category Not found</h1>}></Route>
        <Route
          path="/products/:slug/*"
          element={<h1>Product Not found</h1>}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}
