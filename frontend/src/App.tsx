import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CategoriesPage from "./pages/CategoriesPage";
import DealsPage from "./pages/DealsPage";
import ProfilePage from "./pages/ProfilePage";
import WishlistPage from "./pages/WishlistPage";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex min-h-screen flex-col bg-white text-ink">
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <Toast />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
