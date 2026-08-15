import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('BUYER');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/auth/register', { name, email, password, role });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === 'object' && !data.message) {
        const firstError = Object.values(data)[0];
        setError(firstError || 'Registration failed');
      } else {
        setError(data?.message || 'Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Register</h1>

        {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
        {success && <p className="text-green-500 dark:text-green-400 mb-4">Account created! Redirecting to login...</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-2 rounded mb-4"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-2 rounded mb-4"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 p-2 rounded mb-4"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded mb-4"
        >
          <option value="BUYER">Buyer</option>
          <option value="SELLER">Seller</option>
          <option value="AGENT">Agent</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Register
        </button>

        <p className="text-sm text-center mt-4 text-gray-700 dark:text-gray-300">
          Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;