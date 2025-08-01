// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./features/common/pages/homepage";
import AdminNavbar from "./features/users/admins/components/AdminNavbar";
import { useRole } from "./shared/hooks/useRole";
import UserNavbar from "./features/users/publicUsers/components/UserNavbar";
import EventActionsPage from "./features/events/pages/eventActionsPage";
import CreateEventPage from "./features/events/pages/eventCreationPage";
import EventsDisplayPage from "./features/events/pages/eventsDisplayPage";
import EventDetailsPage from "./features/events/pages/eventDetailsPage";
import EventImageUploadPage from "./features/events/pages/eventImageUploadPage";
import EventDeleteDisplayPage from "./features/events/pages/eventDeleteDisplayPage";
import EventUpdateDisplayPage from "./features/events/pages/eventUpdateDisplayPage";
import { ToastContainer } from 'react-toastify';
import { EventUpdatePage } from "./features/events/pages/eventUpdatePage";
import MyRegistrationsPage from "./features/users/publicUsers/pages/myRegistrationsPage";
import Footer from "./features/common/components/footer";
import ProfilePage from "./features/common/pages/profilePage";

function App() {
  const { hasRole } = useRole();

  return (
    <Router>
      {/* Conditionally render navbar */}
      {hasRole("Admin") ? <AdminNavbar /> : <UserNavbar />}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/event-actions" element={<EventActionsPage/>}/>
        <Route path="/event-creation" element={<CreateEventPage/>}/>
        <Route path="/events" element={<EventsDisplayPage/>}/>
        <Route path="/events-delete" element={<EventDeleteDisplayPage />} />
        <Route path="/events-update" element={<EventUpdateDisplayPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/events-update/:id" element={<EventUpdatePage />} />
        <Route path="/events/:id/upload-image" element={<EventImageUploadPage />} />
        <Route path="/registrations" element={<MyRegistrationsPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        {/* You can add more routes here */}
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;


