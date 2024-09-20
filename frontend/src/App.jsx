import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import PageCMS from "./Components/PageCMS";
import AdminProtect from "./Auth/Protected";
import AdminPublic from "./Auth/Public";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/admin/login"
            element={
              <AdminPublic>
                <Login />
              </AdminPublic>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtect>
                <Dashboard />
              </AdminProtect>
            }
          />
          <Route
            path="/admin/cms"
            element={
              <AdminProtect>
                <PageCMS />
              </AdminProtect>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
