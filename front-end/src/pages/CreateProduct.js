import ProductForm from "../components/ProductForm";
import { Link, useNavigate } from "react-router-dom";

export default function CreateProduct({ rawMaterials, onProductAdded }) {

  const navigate = useNavigate();

  const handleSuccess = () => {
    onProductAdded();
    navigate("/product");
  };

  return (
    <div className="container">
      <h1>New Product</h1>

      <Link to="/product">
        <button>Back</button>
      </Link>

      <ProductForm
        rawMaterials={rawMaterials}
        onProductAdded={onProductAdded}
      />
    </div>
  );
}