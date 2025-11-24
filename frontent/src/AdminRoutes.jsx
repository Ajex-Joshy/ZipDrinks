import { Navigate, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import AdminLogin from "./pages/Admin/AdminLogin"
import AdminDash from "./pages/Admin/AdminDash"
import AdminCustomers from "./pages/Admin/AdminCustomers"
import AdminOrders from "./pages/Admin/Orders/AdminOrders.jsx"
import AdminProducts from "./pages/Admin/Products/AdminProducts.jsx"
import { fetchAdminData } from "./Store/Admin/AdminSlice.js"
import AdminProtectedRoute from "./Components/Admin/AdminProtectedRoute.jsx"
import AdminCategory from "./pages/Admin/AdminCategory.jsx"
import AdminCategoryAdd from "./pages/Admin/AdminCategoryAdd.jsx"
import AdminCategoryEdit from "./pages/Admin/AdminCategoryEdit.jsx"
import AdminAddProducts from "./pages/Admin/Products/AdminAddProducts.jsx"
import AdminEditProduct from "./pages/Admin/Products/AdminEditProduct.jsx"
import NotFound from "./pages/Home/NotFound.jsx"
import AdminOrderDetail from "./pages/Admin/Orders/AdminOrderDetail.jsx"
import AdminCoupon from "./pages/Admin/Coupons/AdminCoupon.jsx"
import AdminCouponAdd from "./pages/Admin/Coupons/AdminCouponAdd.jsx"
import AdminCouponEdit from "./pages/Admin/Coupons/AdminCouponEdit.jsx"
import AdminSales from "./pages/Admin/AdminSales.jsx"
import AdminBanner from "./pages/Admin/Banner/AdminBanner.jsx"
import AdminBannerAdd from "./pages/Admin/Banner/AdminBannerAdd.jsx"
import AdminBannerEdit from "./pages/Admin/Banner/AdminBannerEdit.jsx"

function AdminRoutes() {

    const admin = useSelector(state => state.admin?.adminData?.isAdmin)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!admin) {
      dispatch(fetchAdminData())
    }
  }, [])


  return (
    <>
        <Routes>
          <Route path="login" element={admin ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />} />
          <Route path="dashboard" element={
            <AdminProtectedRoute>
              <AdminDash />
            </AdminProtectedRoute>
          } />
          <Route path="customers" element={
            <AdminProtectedRoute>
              <AdminCustomers />
            </AdminProtectedRoute>
          } />
          <Route path="orders" element={
            <AdminProtectedRoute>
              <AdminOrders />
            </AdminProtectedRoute>
          } />
          <Route path="products" element={
            <AdminProtectedRoute>
              <AdminProducts />
            </AdminProtectedRoute>
          } />
          <Route path="categories" element={
            <AdminProtectedRoute>
              <AdminCategory />
            </AdminProtectedRoute>
          } />
          <Route path="categories/add-category" element={
            <AdminProtectedRoute>
              <AdminCategoryAdd />
            </AdminProtectedRoute>
          } />
          <Route path="categories/:id/edit-category" element={
            <AdminProtectedRoute>
              <AdminCategoryEdit />
            </AdminProtectedRoute>
          } />
          <Route path="products/add-product" element={
            <AdminProtectedRoute>
              <AdminAddProducts />
            </AdminProtectedRoute>
          } />
          <Route path="products/:id/edit-product" element={
            <AdminProtectedRoute>
              <AdminEditProduct />
            </AdminProtectedRoute>
          } />
          <Route path="orders/:orderId" element={
            <AdminProtectedRoute>
              <AdminOrderDetail />
            </AdminProtectedRoute>
          } />
          <Route path="coupons" element={
            <AdminProtectedRoute>
              <AdminCoupon />
            </AdminProtectedRoute>
          } />
          <Route path="coupons/add-coupon" element={
            <AdminProtectedRoute>
              <AdminCouponAdd />
            </AdminProtectedRoute>
          } />
          <Route path="coupons/:couponId" element={
            <AdminProtectedRoute>
              <AdminCouponEdit />
            </AdminProtectedRoute>
          } />
          <Route path="sales" element={
            <AdminProtectedRoute>
              <AdminSales />
            </AdminProtectedRoute>
          } />
          <Route path="banner" element={
            <AdminProtectedRoute>
              <AdminBanner />
            </AdminProtectedRoute>
          } />
          <Route path="banner/add-banner" element={
            <AdminProtectedRoute>
              <AdminBannerAdd />
            </AdminProtectedRoute>
          } />
          <Route path="banner/:bannerId/edit" element={
            <AdminProtectedRoute>
              <AdminBannerEdit />
            </AdminProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />

        </Routes>
    </>
  )
}

export default AdminRoutes
