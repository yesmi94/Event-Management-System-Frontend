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
import EventDeleteDisplayPage from "./features/events/pages/eventDeleteDisplayPage";
import EventUpdateDisplayPage from "./features/events/pages/eventUpdateDisplayPage";
import { ToastContainer } from "react-toastify";
import { EventUpdatePage } from "./features/events/pages/eventUpdatePage";
import MyRegistrationsPage from "./features/users/publicUsers/pages/myRegistrationsPage";
import Footer from "./features/common/components/footer";
import ProfilePage from "./features/common/pages/profilePage";
import RegistrationsForEventDisplayPage from "./features/events/pages/eventRegistrationsListPage";
import PrivateRoute from "./shared/utils/privateRoute";

function App() {
  const { hasRole } = useRole();

  return (
    <Router>
      {hasRole("Admin") ? <AdminNavbar /> : <UserNavbar />}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />

        <Route
          path="/event-actions"
          element={
            <PrivateRoute>
              <EventActionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/event-creation"
          element={
            <PrivateRoute>
              <CreateEventPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <EventsDisplayPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/events-delete"
          element={
            <PrivateRoute>
              <EventDeleteDisplayPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/events-update"
          element={
            <PrivateRoute>
              <EventUpdateDisplayPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <PrivateRoute>
              <EventDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/events-update/:id"
          element={
            <PrivateRoute>
              <EventUpdatePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/registrations"
          element={
            <PrivateRoute>
              <MyRegistrationsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/:eventId/registrations"
          element={
            <PrivateRoute>
              <RegistrationsForEventDisplayPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
