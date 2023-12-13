import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss"; // Import the SCSS file
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Masters from "./pages/Masters";
import Items from "./pages/Items";
import TablesPage from "./pages/Tables";
import EmployeesPage from "./pages/Employees";
import VendorsPage from "./pages/Vendors";
import OrdersPage from "./pages/Orders";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/masters" element={<Masters />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/items" element={<Items />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/vendors" element={<VendorsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
