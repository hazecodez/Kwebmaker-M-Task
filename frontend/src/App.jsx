import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import PageCMS from "./Components/PageCMS";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/cms" element={<PageCMS />} />
        </Routes>
      </Router>
    </>
  );
}
