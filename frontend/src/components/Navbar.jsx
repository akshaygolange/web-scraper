import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Book Explorer
      </Link>

      <Link to="/" className="navbar-link">
        Go Back To Products
      </Link>
    </nav>
  );
};

export default Navbar;