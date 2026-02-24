import RawMaterialList from "../components/RawMaterialList";
import { Link } from "react-router-dom";

export default function RawMaterialPage({ rawMaterials }) {
  return (
    <div className="container">
      <h1>Raw Materials</h1>

      <Link to="/raw-materials/create">
        <button>Add New Raw Material</button>
      </Link>

      <RawMaterialList rawMaterials={rawMaterials} />
    </div>
  );
}