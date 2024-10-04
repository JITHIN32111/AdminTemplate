import React, { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null;
  }
};

const isTokenExpired = (token) => {
  const decodedToken = parseJwt(token);
  if (decodedToken) {
    const now = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp < now;
  }
  return true;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      if (isTokenExpired(token)) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        setIsAuthenticated(false);
        setAccessToken(null);
      } else {
        setIsAuthenticated(true);
        setAccessToken(token);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (token, id,name,email) => {
    setIsAuthenticated(true);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);

    setAccessToken(token);
  };


  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoading,

      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
