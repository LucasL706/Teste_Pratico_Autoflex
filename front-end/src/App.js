import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css"
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import RawMaterialPage from "./pages/RawMaterialPage";
import CreateRawMaterial from "./pages/CreateRawMaterial";
import UpdateRawMaterial from "./pages/UpdateRawMaterial";
import Navbar from "./components/Navbar";

function App() {

  const [products, setProducts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/product");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error to find products:", error);
    }
  };

  const fetchRawMaterials = async () => {
    try {
      const response = await fetch("http://localhost:8080/rawMaterial");
      const data = await response.json();
      setRawMaterials(data);
    } catch (error) {
      console.error("Error to find raw materials:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchRawMaterials();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>

        <Route
          path="/"
          element={<Home products={products} rawMaterials={rawMaterials} />}
        />

        <Route
          path="/product"
          element={<ProductPage products={products} />}
        />

        <Route
          path="/product/create"
          element={
            <CreateProduct
              rawMaterials={rawMaterials}
              onProductAdded={fetchProducts}
            />
          }
        />

        <Route
          path="/product/update/:id"
          element={<UpdateProduct onSuccess={fetchProducts} />}
        />

        <Route
          path="/rawMaterial"
          element={
            <RawMaterialPage
              rawMaterials={rawMaterials}
              fetchRawMaterials={fetchRawMaterials}
            />
          }
        />

        <Route
          path="/rawMaterial/create"
          element={
            <CreateRawMaterial
              onRawMaterialAdded={fetchRawMaterials}
            />
          }
        />

        <Route
            path="/rawMaterial/update/:id"
            element={<UpdateRawMaterial onSuccess={fetchRawMaterials} />} />
      </Routes>
    </Router>
  );
}

export default App;