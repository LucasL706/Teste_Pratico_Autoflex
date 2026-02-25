import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";

export default function ProductPage({ products, fetchProducts }) {

  const handleDeleteProduct = async (id) => {
    await fetch(`http://localhost:8080/product/${id}`, {
      method: "DELETE"
    });

    fetchProducts();
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Products</h2>

        <Link to="/product/create">
          <button>New Product</button>
        </Link>
        </div>

      <ProductList products={products} onDelete={handleDeleteProduct}/>
    </div>
  );
}