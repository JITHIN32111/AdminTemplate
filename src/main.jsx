import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "./layout/Loader.jsx";
const AuthLoader = ({ children }) => {
  const { isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    navigate('/');
    return <Loader/>; // Display a loading spinner or some feedback
  }

  return children;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router> {/* Add the Router here */}
      <AuthProvider>
        <AuthLoader>
          <App />
        </AuthLoader>
      </AuthProvider>
    </Router>
  </StrictMode>
);
