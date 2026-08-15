import useThemeStore from '../store/themeStore';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function Navbar() {
  const { email, role, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
        RealEstate
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-xl"
          title="Toggle theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <Link
          to="/emi-calculator"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
        >
          EMI Calculator
        </Link>

        {email ? (
          <>
            <span className="text-gray-700 dark:text-gray-300">
              Welcome, <span className="font-semibold">{email}</span> ({role})
            </span>
           {(role === 'SELLER' || role === 'AGENT') && (
  <>
    <Link to="/my-listings" className="text-blue-600 dark:text-blue-400">My Listings</Link>
    <Link
      to="/create-property"
      className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      + Add Property
    </Link>
  </>
)}
            <button
              onClick={handleLogout}
              className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 dark:text-blue-400">Login</Link>
            <Link to="/register" className="text-blue-600 dark:text-blue-400">Register</Link>
          </>
          
        )}
      </div>
    </nav>
  );
}

export default Navbar;