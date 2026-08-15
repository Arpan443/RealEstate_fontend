import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

function MyListings() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/properties/my-listings')
      .then((res) => setProperties(res.data))
      .catch(() => setError('Failed to load your listings'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Delete this listing?')) return;

    try {
      await api.delete(`/properties/${id}`);
      setProperties(properties.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete');
    }
  };

  if (loading) return <p className="text-center mt-20 text-gray-700 dark:text-gray-300">Loading your listings...</p>;
  if (error) return <p className="text-center mt-20 text-red-500 dark:text-red-400">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 dark:bg-gray-950 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Listings</h1>
        <Link
          to="/create-property"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">You haven't listed any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              to={`/properties/${property.id}`}
              key={property.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg dark:hover:shadow-gray-800 transition-shadow relative"
            >
              {property.mediaUrls?.length > 0 ? (
                <img
                  src={property.mediaUrls[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{property.title}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{property.city}</p>
                <p className="text-blue-600 dark:text-blue-400 font-bold text-xl mb-2">
                  Rs. {property.price.toLocaleString()}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">
                    {property.status}
                  </span>
                  <button
                    onClick={(e) => handleDelete(property.id, e)}
                    className="text-red-500 dark:text-red-400 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListings;