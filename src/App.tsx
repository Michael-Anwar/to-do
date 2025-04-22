import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Todo from "./pages/Todo";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Layout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<Home />} />
        <Route path="/todo/:id" element={<Todo />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
