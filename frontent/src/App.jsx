
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./pages/Home/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

function App() {

  return (
    <ErrorBoundary>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />

        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
