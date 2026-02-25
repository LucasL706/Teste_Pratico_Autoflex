import RawMaterialForm from "../components/RawMaterialForm";
import { Link, useNavigate } from "react-router-dom";

export default function CreateRawMaterial({ onRawMaterialAdded }) {

  const navigate = useNavigate();

  const handleSuccess = () => {
    onRawMaterialAdded();
    navigate("/rawMaterial");
  };

  return (
    <div className="container">
      <h1>New Raw Material</h1>

      <Link to="/rawMaterial">
        <button>Back</button>
      </Link>

      <RawMaterialForm onSuccess={handleSuccess} />
    </div>
  );
}