import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const RegisterUser = ({ user, setUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setUser("");
  }, []);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const registerUser = () => {
    fetch("http://localhost:8080/api/v1/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: "1",
        username: user,
        email,
        password,
        prefferedname: "Anvita",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data["status"] === "User already exists") {
          setError(true);
        } else {
          navigate("/events");
        }
      });
  };
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          width: "660px",
          height: "400px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <div
          style={{ padding: "10px", paddingLeft: "40px", paddingRight: "50px" }}
        >
          <p style={{ color: "#1976d2", fontWeight: "bold" }}>REGISTER</p>
          {error && (
            <p style={{ color: "red" }}>User already exists. Please login</p>
          )}
          <TextField
            fullWidth
            id="username"
            label="Username"
            variant="filled"
            value={user}
            onChange={(event) => {
              setUser(event.target.value);
              setError(false);
            }}
          />
          <div style={{ margin: "20px" }}></div>
          <TextField
            fullWidth
            id="password"
            label="Password"
            variant="filled"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError(false);
            }}
          />
          <div style={{ margin: "20px" }}></div>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="filled"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError(false);
            }}
          />
          <div
            style={{
              margin: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {error ? (
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                variant="contained"
              >
                Login
              </Button>
            ) : (
              <Button
                onClick={registerUser}
                variant="contained"
                disabled={error || user === "" || password === ""}
              >
                Register
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterUser;
