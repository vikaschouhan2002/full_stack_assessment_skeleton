import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Users from "./components/Users";
import Userhomes from "./components/Userhomes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Userhomes />} />
          <Route path="users" element={<Users />} />
          <Route path="user-homes" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
