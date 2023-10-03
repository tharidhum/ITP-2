import LandingPage from "../pages/LandingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import UserTicketPage from "../pages/ticketPage/userTicketPage";


const AllRoutes = () => {
  const client = new QueryClient(); //config query client
  return (
    <div>
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/dashboard" element = {<AdminDashboard/>} />
            <Route path="/user/support" element={<UserTicketPage/>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
};

export default AllRoutes;