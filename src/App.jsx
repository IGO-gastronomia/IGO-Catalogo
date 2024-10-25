import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import Products from "./Components/Products";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:slug" element={<Products />}></Route>
        {/*  <Route path="*" element={<h1>Not found</h1>}></Route>
        <Route path="/products/*" element={<h1>Product Not found</h1>}></Route> */}
      </Routes>
      <Footer />
    </>
  );
}
