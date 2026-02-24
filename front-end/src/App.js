import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css"
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import RawMaterialPage from "./pages/RawMaterialPage";
import CreateRawMaterial from "./pages/CreateRawMaterial";

function App() {

  const [products, setProducts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/product");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const fetchRawMaterials = async () => {
    try {
      const response = await fetch("http://localhost:8080/rawMaterial");
      const data = await response.json();
      setRawMaterials(data);
    } catch (error) {
      console.error("Erro ao buscar matérias-primas:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchRawMaterials();
  }, []);

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={<Home products={products} />}
        />

        <Route
          path="/products/create"
          element={
            <CreateProduct
              rawMaterials={rawMaterials}
              onProductAdded={fetchProducts}
            />
          }
        />

        <Route
          path="/raw-materials"
          element={
            <RawMaterialPage rawMaterials={rawMaterials} />
          }
        />

        <Route
          path="/raw-materials/create"
          element={
            <CreateRawMaterial
              onRawMaterialAdded={fetchRawMaterials}
            />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;