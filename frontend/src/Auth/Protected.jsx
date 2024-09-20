import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function AdminProtect({ children }) {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"/admin/login"} />;
  }
}

// Validate the props
AdminProtect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminProtect;