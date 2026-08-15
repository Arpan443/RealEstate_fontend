import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmiCalculator from './pages/EmiCalculator';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateProperty from './pages/CreateProperty';
import PropertyDetail from './pages/PropertyDetail';
import MyListings from './pages/MyListings';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create-property"
          element={
            <ProtectedRoute>
              <CreateProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-listings"
          element={
            <ProtectedRoute>
              <MyListings />
            </ProtectedRoute>
          }
        />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/emi-calculator" element={<EmiCalculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;