import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link
        to="/"
        className={location.pathname === "/" ? "active" : ""}
      >
        Dashboard
      </Link>

      <Link
        to="/product"
        className={location.pathname.startsWith("/product") ? "active" : ""}
      >
        Products
      </Link>

      <Link
        to="/rawMaterial"
        className={location.pathname.startsWith("/rawMaterial") ? "active" : ""}
      >
        Raw Materials
      </Link>
    </nav>
  );
}