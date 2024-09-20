import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function AdminPublic({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to={"/admin/dashboard"} />;
  } else {
    return children;
  }
}

// Validate the props
AdminPublic.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminPublic;
