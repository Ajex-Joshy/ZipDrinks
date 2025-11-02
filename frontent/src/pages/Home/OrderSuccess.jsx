import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (!location.state?.fromCheckout) {
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <CheckCircle size={80} className="text-green-500 mb-4" />
      <h1 className="text-3xl font-semibold mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-6">Thank you for shopping with us 😊</p>

      <div className="flex gap-4">
        <Link to="/orders" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          View Orders
        </Link>
        <Link to="/" className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
          Home
        </Link>
      </div>
    </div>
  );
}
