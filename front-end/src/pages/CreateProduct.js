import ProductForm from "../components/ProductForm";
import { Link } from "react-router-dom";

export default function CreateProduct({ rawMaterials, onProductAdded }) {
  return (
    <div>
      <h1>New Product</h1>

      <Link to="/">
        <button>Back</button>
      </Link>

      <ProductForm
        rawMaterials={rawMaterials}
        onProductAdded={onProductAdded}
      />
    </div>
  );
}