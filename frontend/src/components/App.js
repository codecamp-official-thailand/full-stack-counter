import React from "react";
import "./App.css";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import { useState, useEffect } from "react";

function App() {
  const [role, setRole] = useState("guest");

  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      setRole("user");
    }
  }, []);

  return (
    <div>
      <PrivateRoutes setRole={setRole} role={role} />
    </div>
  );
}

export default App;
