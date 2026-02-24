import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";
import "../App.css"

export default function Home({ products }) {
  return (
    <div>
      <h1>Stock Control</h1>

      <Link to="/products/create">
        <button>New Product</button>
      </Link>

      <Link to="/raw-materials/create">
        <button>New Raw Material</button>
      </Link>

      <ProductList products={products} />
    </div>
  );
}