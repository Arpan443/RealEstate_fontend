import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const NEPAL_DISTRICTS = [
  "Achham", "Arghakhanchi", "Baglung", "Baitadi", "Bajhang", "Bajura", "Banke", "Bara",
  "Bardiya", "Bhaktapur", "Bhojpur", "Chitwan", "Dadeldhura", "Dailekh", "Dang", "Darchula",
  "Dhading", "Dhankuta", "Dhanusha", "Dolakha", "Dolpa", "Doti", "Gorkha", "Gulmi", "Humla",
  "Ilam", "Jajarkot", "Jhapa", "Jumla", "Kailali", "Kalikot", "Kanchanpur", "Kapilvastu",
  "Kaski", "Kathmandu", "Kavrepalanchok", "Khotang", "Lalitpur", "Lamjung", "Mahottari",
  "Makwanpur", "Manang", "Morang", "Mugu", "Mustang", "Myagdi", "Nawalpur", "Nuwakot",
  "Okhaldhunga", "Palpa", "Panchthar", "Parasi", "Parbat", "Parsa", "Pyuthan", "Ramechhap",
  "Rasuwa", "Rautahat", "Rolpa", "Rukum East", "Rukum West", "Rupandehi", "Salyan",
  "Sankhuwasabha", "Saptari", "Sarlahi", "Sindhuli", "Sindhupalchok", "Siraha", "Solukhumbu",
  "Sunsari", "Surkhet", "Syangja", "Tanahun", "Taplejung", "Terhathum", "Udayapur"
];

function CreateProperty() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    type: 'APARTMENT',
    bedrooms: '',
    bathrooms: '',
    area: '',
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUploading(true);

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        area: parseFloat(formData.area),
      };
      const propertyResponse = await api.post('/properties', payload);
      const propertyId = propertyResponse.data.id;

      for (const image of images) {
        const imageForm = new FormData();
        imageForm.append('file', image);
        await api.post(`/properties/${propertyId}/media`, imageForm, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create property');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 dark:bg-gray-950 min-h-screen">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">List a New Property</h1>

        {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-2 rounded"
            rows="3"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="price"
              type="number"
              placeholder="Price (Rs.)"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-2 rounded"
              required
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded"
            >
              <option value="APARTMENT">Apartment</option>
              <option value="HOUSE">House</option>
              <option value="LAND">Land</option>
              <option value="OFFICE">Office</option>
              <option value="RETAIL">Retail Shop</option>
              <option value="RESTAURANT">Restaurant</option>
              <option value="WAREHOUSE">Warehouse</option>
              <option value="OTHER_COMMERCIAL">Other Commercial</option>
            </select>
          </div>

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-2 rounded"
            required
          />

          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded"
            required
          >
            <option value="">Select District</option>
            {NEPAL_DISTRICTS.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>

          {(formData.type === 'APARTMENT' || formData.type === 'HOUSE') ? (
            <div className="grid grid-cols-3 gap-4">
              <input
                name="bedrooms"
                type="number"
                placeholder="Bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-2 rounded"
                required
              />
              <input
                name="bathrooms"
                type="number"
                placeholder="Bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-2 rounded"
                required
              />
              <input
                name="area"
                type="number"
                placeholder="Area (sqft)"
                value={formData.area}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-2 rounded"
                required
              />
            </div>
          ) : (
            <input
              name="area"
              type="number"
              placeholder="Area (sqft)"
              value={formData.area}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-2 rounded"
              required
            />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Property Photos
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded"
            />
            {images.length > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {images.length} image{images.length > 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800"
          >
            {uploading ? 'Creating...' : 'Create Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProperty;