import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';

function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    city: '',
    type: '',
    minPrice: '',
    maxPrice: '',
  });

  const fetchProperties = () => {
    setLoading(true);
    const params = {};
    if (filters.city) params.city = filters.city;
    if (filters.type) params.type = filters.type;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;

    api.get('/properties', { params })
      .then((res) => setProperties(res.data))
      .catch(() => setError('Failed to load properties'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const handleReset = () => {
    setFilters({ city: '', type: '', minPrice: '', maxPrice: '' });
    setTimeout(fetchProperties, 0);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 dark:bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Available Properties</h1>

      <form onSubmit={handleSearch} className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleFilterChange}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-2 rounded"
        />

        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded"
        >
          <option value="">Any Type</option>
          <option value="APARTMENT">Apartment</option>
          <option value="HOUSE">House</option>
          <option value="LAND">Land</option>
          <option value="OFFICE">Office</option>
          <option value="RETAIL">Retail Shop</option>
          <option value="RESTAURANT">Restaurant</option>
          <option value="WAREHOUSE">Warehouse</option>
          <option value="OTHER_COMMERCIAL">Other Commercial</option>
        </select>

        <input
          name="minPrice"
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-2 rounded"
        />

        <input
          name="maxPrice"
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-2 rounded"
        />

        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Search
          </button>
          <button type="button" onClick={handleReset} className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
            Reset
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-center mt-20 text-gray-700 dark:text-gray-300">Loading properties...</p>
      ) : error ? (
        <p className="text-center mt-20 text-red-500 dark:text-red-400">{error}</p>
      ) : properties.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No properties found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              to={`/properties/${property.id}`}
              key={property.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg dark:hover:shadow-gray-800 transition-shadow"
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
                <div className="flex gap-3 text-sm text-gray-600 dark:text-gray-300">
                  {property.bedrooms != null && <span>{property.bedrooms} bed</span>}
                  {property.bathrooms != null && <span>{property.bathrooms} bath</span>}
                  <span>{property.area} sqft</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;