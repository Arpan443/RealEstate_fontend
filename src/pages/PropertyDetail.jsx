import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { email, role } = useAuthStore();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api.get(`/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch(() => setError('Property not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    setDeleting(true);
    try {
      await api.delete(`/properties/${id}`);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete property');
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-center mt-20 text-gray-700 dark:text-gray-300">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500 dark:text-red-400">{error}</p>;
  if (!property) return null;

 
  const images = property.mediaUrls || [];

  return (
    <div className="max-w-4xl mx-auto p-6 dark:bg-gray-950 min-h-screen">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
        {images.length > 0 ? (
          <>
            <img
              src={images[activeImage]}
              alt={property.title}
              className="w-full h-96 object-cover"
            />
            {images.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {images.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt=""
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                      idx === activeImage ? 'border-blue-600 dark:border-blue-400' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-96 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
            No Image
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{property.title}</h1>
              <p className="text-gray-500 dark:text-gray-400">{property.address}, {property.city}</p>
            </div>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
              {property.status}
            </span>
          </div>

          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Rs. {property.price.toLocaleString()}
          </p>

          <div className="flex gap-6 text-gray-700 dark:text-gray-300 mb-6 border-y dark:border-gray-700 py-4">
            {property.bedrooms != null && <span>🛏 {property.bedrooms} Bedrooms</span>}
{property.bathrooms != null && <span>🚿 {property.bathrooms} Bathrooms</span>}
<span>📐 {property.area} sqft</span>
<span>🏠 {property.type}</span>
          </div>

          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Description</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{property.description}</p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Listed by {property.ownerName}</p>

          {property.ownerEmail === email && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-red-300 dark:disabled:bg-red-800"
            >
              {deleting ? 'Deleting...' : 'Delete Listing'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;