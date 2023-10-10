import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const LoginUser = ({ user, setUser, password, setPassword }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const loginUser = () => {
    fetch("http://localhost:8080/api/v1/user/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data["userid"] === "-1") {
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
          <p style={{ color: "#1976d2", fontWeight: "bold" }}>LOGIN</p>
          <p>Please sign-in to your account to register for events</p>
          {error && (
            <p style={{ color: "red" }}>User not registered. Please register</p>
          )}
          <TextField
            fullWidth
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
            label="Password"
            variant="filled"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
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
            <Button
              onClick={loginUser}
              variant="contained"
              disabled={error || user === "" || password === ""}
            >
              Sign In
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <p style={{ marginRight: "35px" }}>New to our platform?</p>
            <Button
              onClick={() => {
                navigate("/register");
              }}
              size="small"
              data-testid="register-button"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginUser;
