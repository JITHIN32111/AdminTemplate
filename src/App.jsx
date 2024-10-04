import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import AuthLayout from './layout/AuthLayout';
import Loader from './layout/Loader';
import { PublicRoute, ProtectedRoute } from "./routes/routes";
// Lazy load components
const AdminDashboard = lazy(() => import('./components/adminPannel/AdminDashboard'));
const Table2 = lazy(() => import('./components/adminPannel/Table2'));
const Table = lazy(() => import('./components/adminPannel/Table'));
const Table3 = lazy(() => import('./components/adminPannel/Table3'));
const Wallet = lazy(() => import('./components/adminPannel/Wallet'));
const Login = lazy(() => import('./pages/AdminLogin')); // Assuming you have a Login component
const AllMembersTable = lazy(() => import('./components/adminPannel/AllMembersTable'));
const EditProfile = lazy(() => import('./components/adminPannel/EditProfile'));

function App() {
  return (
    
      <Suspense fallback={<Loader/>}>
        <Routes>
          {/* Routes that require sidebar and header */}
          <Route path="/admin"  element={<ProtectedRoute component={MainLayout} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/members" element={<Table2 />} />
            <Route path="/admin/direct-team" element={<Table />} />
            <Route path="/admin/genealogy" element={<Table3 />} />
            <Route path="/admin/withdraw-history" element={<Table />} />
            <Route path="/admin/history" element={<Table />} />
            <Route path="/admin/all-members" element={<AllMembersTable />} />
            <Route path="/admin/rejoining-balance" element={<Wallet />} />
            <Route path="/admin/auto-pool" element={<Table />} />
            <Route path="/admin/edit-profile" element={<EditProfile />} />
          </Route>

          {/* Routes that don't require sidebar and header */}
          <Route path="/" element={<PublicRoute component={AuthLayout} />}>
            <Route path="/" element={<Login />} />
          </Route>
        </Routes>
      </Suspense>
   
  );
}

export default App;
