import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";

export default function ProductPage({ products }) {
  return (
    <div className="container">
      <div className="page-header">
        <h2>Products</h2>

        <Link to="/products/create">
          <button>New Product</button>
        </Link>
        </div>

      <ProductList products={products} />
    </div>
  );
}