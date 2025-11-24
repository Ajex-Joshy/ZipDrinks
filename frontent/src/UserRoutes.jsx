import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/authentication/Login"
import Signup from "./pages/authentication/Signup"
import EmailVerify from "./pages/authentication/EmailVerify"
import Navbar from "./Components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import ForgotPassword from "./pages/authentication/ForgotPassword"
import About from "./pages/About/About"
import GoogleCallback from "./pages/authentication/GoogleCallback"
import ProductDetail from "./pages/Home/ProductDetail.jsx"
import Shop from "./pages/Home/Shop.jsx"
import NotFound from "./pages/Home/NotFound.jsx"
import Profile from "./pages/UserProfile/Profile.jsx"
import ProfileEdit from "./pages/UserProfile/ProfileEdit.jsx"
import VerifyEditEmail from "./pages/UserProfile/VerifyEditEmail.jsx"
import UserProtectedRoute from "./Components/UserProtectedRoute.jsx"
import ChangePassword from "./pages/UserProfile/ChangePassword.jsx"
import Address from "./pages/UserProfile/Address.jsx"
import AddAddress from "./pages/UserProfile/AddAddress.jsx"
import EditAddress from "./pages/UserProfile/EditAddress.jsx"
import Wishlist from "./pages/Home/Wishlist.jsx"
import Cart from "./pages/Home/Cart.jsx"
import { fetchCart } from "./Store/user/cartSlice.js"
import Checkout from "./pages/Home/Checkout.jsx"
import MyOrders from "./pages/Home/MyOrders.jsx"
import OrderDetail from "./pages/Home/OrderDetail.jsx"
import OrderSuccess from "./pages/Home/OrderSuccess.jsx"
import Contact from "./pages/Home/Contact.jsx"
import ReferralCode from "./pages/UserProfile/ReferralCode.jsx"
import Wallet from "./pages/UserProfile/Wallet.jsx"

function UserRoutes() {

    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const isVerified = useSelector(state => state.user.isVerified)
  const cart = useSelector(state => state.cart.cartData)
  const cartLoading = useSelector(state => state.cart.loading)
  const dispatch = useDispatch()


  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart())
    }
  }, [isLoggedIn, dispatch])

  return (
    <>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={isLoggedIn ? <Navigate to={"/"} /> : <Login />} />
          <Route path="signup" element={isLoggedIn ? <Navigate to={"/"} /> : <Signup />} />
          <Route path="email-verify" element={!isVerified ? <EmailVerify /> : <Navigate to={"/"} />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="about" element={<About />} />
          <Route path="google-callback" element={!isVerified ? <GoogleCallback /> : <Navigate to={"/"} />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="profile" element={
            <UserProtectedRoute>
              <Profile />
            </UserProtectedRoute>
          } />
          <Route path="profile/edit" element={
            <UserProtectedRoute>
              <ProfileEdit />
            </UserProtectedRoute>
          } />
          <Route path="profile/edit/verify" element={
            <UserProtectedRoute>
              <VerifyEditEmail />
            </UserProtectedRoute>
          } />
          <Route path="profile/change-password" element={
            <UserProtectedRoute>
              <ChangePassword />
            </UserProtectedRoute>
          } />
          <Route path="profile/address" element={
            <UserProtectedRoute>
              <Address />
            </UserProtectedRoute>
          } />
          <Route path="profile/address/add-address" element={
            <UserProtectedRoute>
              <AddAddress />
            </UserProtectedRoute>
          } />
          <Route path="profile/address/:id/edit" element={
            <UserProtectedRoute>
              <EditAddress />
            </UserProtectedRoute>
          } />
          <Route path="wishlist" element={
            <UserProtectedRoute>
              <Wishlist />
            </UserProtectedRoute>
          } />
          <Route path="cart" element={
            <UserProtectedRoute>
              <Cart />
            </UserProtectedRoute>
          } />
          <Route
            path="checkout"
            element={
              <UserProtectedRoute>
                {cartLoading ? (
                  <div className="flex items-center justify-center h-screen">Loading...</div>
                ) : !cart || cart.items.length === 0 ? (
                  <Navigate to="/cart" />
                ) : (
                  <Checkout />
                )}
              </UserProtectedRoute>
            }
          />
          <Route path="orders" element={
            <UserProtectedRoute>
              <MyOrders />
            </UserProtectedRoute>
          } />
          <Route path="orders/:orderId" element={
            <UserProtectedRoute>
              <OrderDetail />
            </UserProtectedRoute>
          } />
          <Route path="order-success" element={
            <UserProtectedRoute>
              <OrderSuccess />
            </UserProtectedRoute>
          } />
          <Route path="profile/referral" element={
            <UserProtectedRoute>
              <ReferralCode />
            </UserProtectedRoute>
          } />
          <Route path="profile/wallet" element={
            <UserProtectedRoute>
              <Wallet />
            </UserProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />

        </Routes>
    </>
  )
}

export default UserRoutes

