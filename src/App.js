import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss"; // Import the SCSS file
import "./common.scss"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Masters from "./pages/Masters";
import Items from "./pages/Items";
import TablesPage from "./pages/Tables";
import EmployeesPage from "./pages/Employees";
import VendorsPage from "./pages/Vendors";
import OrdersPage from "./pages/Orders";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import { useSelector, useDispatch } from 'react-redux'
import { updateBusiness } from './features/business/businessSlice'
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import data from './data.json'
function App() {
  const businessData = useSelector((state) => state.business.value)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   const bundle = localStorage.getItem("bundle")
  //   if (bundle) {
  //     const decodedraw = atob(bundle);
  //     const decoded = JSON.parse(decodedraw)
  //     console.log(decoded, "decoded")
  //     if (decoded?.bundle[0]) {
  //       dispatch(updateBusiness(decoded.bundle[0]))
  //     }
  //   }
  //   // dispatch(updateBusiness(data))
  // }, [])
  useEffect(() => {
    try {
      // const bundle = localStorage.getItem("bundle");
      // if (bundle) {
      //   const decodedraw = atob(bundle);
      //   const decoded = JSON.parse(decodedraw);
      //   console.log(decoded, "decoded");
      //   if (decoded?.bundle && decoded.bundle[0]) {
      //     dispatch(updateBusiness(decoded.bundle[0]));
      //   }
      // }
      dispatch(updateBusiness(data))
    } catch (error) {
      console.error("Error decoding the string:", error);
    }
  }, []);


  // useEffect(() => {
  //   const jsonObject = { bundle: [businessData] };
  //   const jsonString = JSON.stringify(jsonObject);
  //   const encodedString = btoa(jsonString);
  //   localStorage.setItem("bundle", encodedString)
  //   console.log("data changed")
  // }, [businessData])
  useEffect(() => {
    try {
      const jsonObject = { bundle: [businessData] };
      const jsonString = JSON.stringify(jsonObject);

      // Check for non-ASCII characters before encoding
      const isASCII = /^[\x00-\x7F]*$/.test(jsonString);
      if (!isASCII) {
        throw new Error("The data contains non-ASCII characters that can't be encoded using btoa.");
      }
      const encodedString = btoa(jsonString);
      localStorage.setItem("bundle", encodedString);
      console.log("Data changed and stored in localStorage");
    } catch (error) {
      console.error("Error while updating localStorage:", error);
      // Handle the error gracefully or log additional debugging information
    }
  }, [businessData]);

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
