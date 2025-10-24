import React from 'react'
import { Loader } from 'react-feather';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const loading = useSelector(state => state.user.loading)

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="animate-spin text-gray-600" size={30} />
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace />
  }

  return children
}

export default UserProtectedRoute
