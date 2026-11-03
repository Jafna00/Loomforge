import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import { SocketProvider } from './context/SocketContext.jsx';

import LandingPage from './features/landingPage/pages/LandingPage.jsx';
import Login from './features/auth/pages/Login.jsx';
import Register from './features/auth/pages/Register.jsx';
import DesignerDashboard from './features/designerDashboard/pages/DesignerDashboard.jsx';
import ManufacturerDashboard from './features/manufacturerDashboard/pages/ManufacturerDashboard.jsx';


//project
import CreateProject from './features/project/pages/CreateProject.jsx';
import ProjectList from './features/project/pages/ProjectList.jsx';
import ProjectDetail from './features/project/pages/ProjectDetail.jsx';

//profile
import DesignerProfile from './features/profile/pages/DesignerProfile.jsx';
import ManufacturerProfile from './features/profile/pages/ManufacturerProfile.jsx';
//manufacturer
import ManufacturerDirectory from './features/manufacturer/pages/ManufacturerDirectory.jsx';
import ManufacturerPublicProfile from './features/manufacturer/pages/ManufacturerPublicProfile.jsx';

//rfq
import ManufacturerRfqInbox from './features/rfq/pages/ManufacturerRfqInbox.jsx';
import RfqDetail from './features/rfq/pages/RfqDetail.jsx';
import DesignerSentRfqs from './features/rfq/pages/DesignerSentRfqs.jsx';

//quotation
import ProjectQuotations from './features/quotation/pages/ProjectQuotations.jsx';
import DesignerQuotations from './features/quotation/pages/DesignerQuotations.jsx';

//order
import OrderDetail from './features/order/pages/OrderDetail.jsx';
import DesignerOrders from './features/order/pages/DesignerOrders.jsx';
import ManufacturerOrders from './features/order/pages/ManufacturerOrders.jsx';

//chat
import ChatRoom from './features/chat/pages/ChatRoom.jsx';
import ConversationList from './features/chat/pages/ConversationList.jsx';



function App() {
  return (
    <AuthProvider>
      <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/designer/dashboard"
            element={
              <ProtectedRoute allowedRoles={['designer']}>
                <DesignerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manufacturer/dashboard"
            element={
              <ProtectedRoute allowedRoles={['manufacturer']}>
                <ManufacturerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
  path="/designer/projects"
  element={
    <ProtectedRoute allowedRoles={['designer']}>
      <ProjectList />
    </ProtectedRoute>
  }
/>
<Route
  path="/designer/projects/new"
  element={
    <ProtectedRoute allowedRoles={['designer']}>
      <CreateProject />
    </ProtectedRoute>
  }
/>
<Route
  path="/designer/projects/:id"
  element={
    <ProtectedRoute allowedRoles={['designer']}>
      <ProjectDetail />
    </ProtectedRoute>
  }
/>
<Route
  path="/designer/profile"
  element={
    <ProtectedRoute allowedRoles={['designer']}>
      <DesignerProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/manufacturer/profile"
  element={
    <ProtectedRoute allowedRoles={['manufacturer']}>
      <ManufacturerProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/designer/manufacturers"
  element={
    <ProtectedRoute allowedRoles={['designer']}>
      <ManufacturerDirectory />
    </ProtectedRoute>
  }
/>
<Route
  path="/designer/manufacturers/:id"
  element={
    <ProtectedRoute allowedRoles={['designer']}>
      <ManufacturerPublicProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/manufacturer/rfqs"
  element={
    <ProtectedRoute allowedRoles={['manufacturer']}>
      <ManufacturerRfqInbox />
    </ProtectedRoute>
  }
/>
<Route
  path="/manufacturer/rfqs/:id"
  element={
    <ProtectedRoute allowedRoles={['manufacturer']}>
      <RfqDetail />
    </ProtectedRoute>
  }
/>
<Route
  path="/designer/rfqs/:id"
  element={
    <ProtectedRoute allowedRoles={['designer']}>
      <RfqDetail />
    </ProtectedRoute>
  }
/>
<Route
  path="/designer/rfqs"
  element={
    <ProtectedRoute allowedRoles={['designer']}>
      <DesignerSentRfqs />
    </ProtectedRoute>
  }
/>
<Route
  path="/designer/projects/:projectId/quotations"
  element={
    <ProtectedRoute allowedRoles={['designer']}>
      <ProjectQuotations />
    </ProtectedRoute>
  }
/>
<Route
  path="/designer/quotations"
  element={
    <ProtectedRoute allowedRoles={['designer']}>
      <DesignerQuotations />
    </ProtectedRoute>
  }
/>
<Route
  path="/designer/orders"
  element={
    <ProtectedRoute allowedRoles={['designer']}>
      <DesignerOrders />
    </ProtectedRoute>
  }
/>
<Route
  path="/designer/orders/:id"
  element={
    <ProtectedRoute allowedRoles={['designer']}>
      <OrderDetail />
    </ProtectedRoute>
  }
/>
<Route
  path="/manufacturer/orders"
  element={
    <ProtectedRoute allowedRoles={['manufacturer']}>
      <ManufacturerOrders />
    </ProtectedRoute>
  }
/>
<Route
  path="/manufacturer/orders/:id"
  element={
    <ProtectedRoute allowedRoles={['manufacturer']}>
      <OrderDetail />
    </ProtectedRoute>
  }
/>
<Route
  path="/designer/messages"
  element={
    <ProtectedRoute allowedRoles={['designer']}>
      <ConversationList />
    </ProtectedRoute>
  }
/>
<Route
  path="/designer/chat/:rfqId"
  element={
    <ProtectedRoute allowedRoles={['designer']}>
      <ChatRoom />
    </ProtectedRoute>
  }
/>
<Route
  path="/manufacturer/messages"
  element={
    <ProtectedRoute allowedRoles={['manufacturer']}>
      <ConversationList />
    </ProtectedRoute>
  }
/>
<Route
  path="/manufacturer/chat/:rfqId"
  element={
    <ProtectedRoute allowedRoles={['manufacturer']}>
      <ChatRoom />
    </ProtectedRoute>
  }
/>
        </Routes>
      </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;