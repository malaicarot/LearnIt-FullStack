import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Layout/Landing.js";
import Auth from "./components/View/Auth.js";
import AuthContextProvider from "./contexts/AuthContext.js";
import DashBoard from "./components/View/DashBoard.js";
import ProtectedRoute from "./components/routing/ProtectedRoute.js";
import About from "./components/View/About.js";
import PostContextProvider from "./contexts/PostContext.js";
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth authRoute="login" />} />
            <Route path="/register" element={<Auth authRoute="register" />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
