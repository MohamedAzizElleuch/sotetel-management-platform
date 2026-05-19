import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'sonner'; // ✅ Add Sonner
import 'react-toastify/dist/ReactToastify.css';

import ClientLogin from './pages/auth/ClientLogin';
import ClientRegister from './pages/auth/ClientRegister';
import AdminLogin from './pages/auth/AdminLogin';
import AdminRegister from './pages/auth/AdminRegister';

import AdminDashboard from './pages/admin/AdminDashboard';
import InventoryDashboard from './pages/admin/InventoryDashboard';
import AddInventoryItem from './pages/admin/AddInventoryItem';
import EditInventoryItem from './pages/admin/EditInventoryItem';
import LowStockInventory from './pages/admin/LowStockInventory';
import InventoryLogs from './pages/admin/InventoryLogs';
import AssignTasks from './pages/admin/AssignTasks';
import AdminInvoices from './pages/admin/AdminInvoices';
import AdminInvoiceEdit from './pages/admin/AdminInvoiceEdit';
import MarkPaidInvoices from './pages/admin/MarkPaidInvoices';
import OffresDePrix from './pages/admin/OffresDePrix';
import AdminMessages from './pages/admin/AdminMessages';
import AdminMessageDetail from './pages/admin/AdminMessageDetail'; // ✅ NEW
import ManageActualites from './pages/admin/ManageActualites';


import ClientDashboard from './pages/client/ClientDashboard';
import CreateTask from './pages/client/DemandeOffreDePrix';
import ClientTasks from './pages/client/ClientTasks';
import ClientSeeInvoices from './pages/client/ClientSeeInvoices';
import ClientQuoteResponses from './pages/client/ClientQuoteResponses';
import ServicesPageClient from './pages/ServicesPageClient';

import TechnicianDashboard from './pages/technician/TechnicianDashboard';
import TechnicianCompletedTasks from './pages/technician/TechnicianCompletedTasks';
import TechnicianTaskUpdate from './pages/technician/TechnicianTaskUpdate';

import Profile from './pages/Profile';
import APropos from './pages/APropos';
import IndexPageClient from './pages/IndexPageClient';
import IndexPageAdmin from './pages/IndexPageAdmin';
import Contact from './pages/Contact';
import DateEtHistorique from './pages/DateEtHistorique';
import PartenaireEtCertification from './pages/PartenaireEtCertification'; // ✅ ADDED
import MissionVisionsValeurs from './pages/MissionVisionsValeurs'; // ✅ NEW
import SotetelALInternational from './pages/sotetelalinternation'; // ✅ NEW
import EngagementEthiqueEtQualite from './pages/EngagementEthiqueEtQualite'; // ✅ NEW
import Actualite from './pages/Actualite';
import ActualiteDetail from './pages/ActualiteDetail'; // ✅ NEW



import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Chargement...</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Toaster richColors position="top-right" /> {/* ✅ Add Sonner Toaster */}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/client" />} />
        <Route path="/client" element={<IndexPageClient />} />
        <Route path="/admin" element={<IndexPageAdmin />} />
        <Route path="/auth/clientlogin" element={<ClientLogin />} />
        <Route path="/auth/clientregister" element={<ClientRegister />} />
        <Route path="/auth/adminlogin" element={<AdminLogin />} />
        <Route path="/auth/adminregister" element={<AdminRegister />} />
        <Route path="/APropos" element={<APropos />} />
        <Route path="/DateEtHistorique" element={<DateEtHistorique />} />
        <Route path="/PartenaireEtCertification" element={<PartenaireEtCertification />} /> {/* ✅ ADDED */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/missions-valeurs" element={<MissionVisionsValeurs />} /> {/* ✅ NEW */}
        <Route path="/sotetelalinternation" element={<SotetelALInternational showUI={true} />} /> {/* ✅ NEW */}
        <Route path="/engagement-ethique-et-qualite" element={<EngagementEthiqueEtQualite showUI={true} />} /> {/* ✅ NEW */}
        <Route path="/actualites" element={<Actualite />} />
        <Route path="/actualites/:id" element={<ActualiteDetail />} /> {/* ✅ NEW */}


        {/* Admin routes */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/inventory" element={<InventoryDashboard />} />
          <Route path="/admin/inventory/add" element={<AddInventoryItem />} />
          <Route path="/admin/inventory/edit/:id" element={<EditInventoryItem />} />
          <Route path="/admin/inventory/low-stock" element={<LowStockInventory />} />
          <Route path="/admin/inventory/logs" element={<InventoryLogs />} />
          <Route path="/admin/assign-tasks" element={<AssignTasks />} />
          <Route path="/admin/invoices" element={<AdminInvoices />} />
          <Route path="/admin/invoices/edit/:id" element={<AdminInvoiceEdit />} />
          <Route path="/admin/invoices/unpaid" element={<MarkPaidInvoices />} />
          <Route path="/admin/offres-de-prix" element={<OffresDePrix />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/messages/:id" element={<AdminMessageDetail />} />
          <Route path="/admin/actualites" element={<ManageActualites />} />

        </Route>

        {/* Client routes */}
        <Route element={<PrivateRoute allowedRoles={['client']} />}>
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/task/create" element={<CreateTask />} />
          <Route path="/client/tasks" element={<ClientTasks />} />
          <Route path="/client/invoices" element={<ClientSeeInvoices />} />
          <Route path="/client/quotes" element={<ClientQuoteResponses />} />
          <Route path="/client/services" element={<ServicesPageClient />} />
        </Route>

        {/* Technician routes */}
        <Route element={<PrivateRoute allowedRoles={['technician']} />}>
          <Route path="/technician/dashboard" element={<TechnicianDashboard />} />
          <Route path="/technician/completed" element={<TechnicianCompletedTasks />} />
          <Route path="/technician/task/:id" element={<TechnicianTaskUpdate />} />
        </Route>

        {/* Shared route */}
        <Route element={<PrivateRoute allowedRoles={['admin', 'client', 'technician']} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;