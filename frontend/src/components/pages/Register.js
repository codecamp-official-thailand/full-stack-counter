import React, { useState } from "react";
import axios from "../../config/axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const register = async () => {
    const body = {
      username,
      password,
      name,
    };
    await axios.post("/users/register", body);
    setName("");
    setPassword("");
    setUsername("");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Register</h1>
      <br />
      <br />
      <div>
        <label>username: </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
      </div>
      <div>
        <label>password: </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </div>
      <div>
        <label>name: </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </div>
      <button onDoubleClick={register}>Register</button>
    </div>
  );
}

export default Register;
