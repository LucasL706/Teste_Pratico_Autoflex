import { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/rawMaterial")
      .then(res => setRawMaterials(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/product")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:8080/product")
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div className="App">
      <h1>Stock Control</h1>

      <ProductForm onProductAdded={fetchProducts} rawMaterials={rawMaterials}/>

      <ProductList products={products} />
    </div>
  );
}

export default App;