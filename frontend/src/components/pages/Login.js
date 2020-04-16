import React, { useState } from "react";
import axios from "../../config/axios";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const body = {
      username,
      password,
    };

    const response = await axios.post("/users/login", body);
    localStorage.setItem("ACCESS_TOKEN", response.data.token);
    props.setRole("user");
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
      <h1>Login</h1>
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
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
