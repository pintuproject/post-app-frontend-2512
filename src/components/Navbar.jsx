 
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between ml-3 items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          PostApp
        </Link>
        <Link
          to="/create"
          className="bg-blue-500 text-white py-2 px-4 mr-5 rounded hover:bg-blue-600"
        >
          Create Post
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
