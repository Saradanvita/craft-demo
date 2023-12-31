import React, { useEffect, useState } from "react";
import UnregisteredEvents from "./UnregisteredEvents";
import RegisteredEvents from "./RegisteredEvents";
import Divider from "@mui/material/Divider";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Events = ({ setUser, user, setPassword }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [formattedEvents, setFormattedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (user !== "") {
      fetch("http://localhost:8080/api/v1/sports/events", { method: "POST" })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setEvents(data);
        });
      fetch("http://localhost:8080/api/v1/events/registered", {
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
          setRegisteredEvents(data);
        });
    }
  }, []);

  useEffect(() => {
    if (user !== "") {
      const fEvents = [];
      const x = {};
      let c = 0;
      registeredEvents.forEach((rEvent) => {
        x[rEvent["id"]] = rEvent["status"];
        if (rEvent["status"] === "REGISTERED") c++;
      });
      events.forEach((e) => {
        if (x[e["id"]] !== undefined) {
          fEvents.push({
            ...e,
            status: x[e["id"]],
          });
        } else {
          fEvents.push({
            ...e,
            status: "NOT_REGISTERED",
          });
        }
      });
      setFormattedEvents(fEvents);
      setCount(c);
    }
  }, [events, registeredEvents]);

  if (user === "") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>User is not authorised to view this content. Please login first. </p>
        <div style={{ marginLeft: "10px" }}>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            variant="contained"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "10px",
          marginRight: "10px",
          marginLeft: "20px",
        }}
      >
        <p style={{ lineHeight: "0" }}>
          Hi {user}! Please select any 3 events you would like to participate
          in.
        </p>
        <div>
          <Button
            variant="contained"
            size="small"
            startIcon={<LogoutRoundedIcon />}
            onClick={() => {
              setUser("");
              setPassword("");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {formattedEvents.length > 0 && (
          <UnregisteredEvents
            events={formattedEvents}
            count={count}
            setRegisteredEvents={setRegisteredEvents}
            user={user}
          />
        )}

        <Divider
          sx={{ bgcolor: "#1976d2" }}
          variant="middle"
          orientation="vertical"
          flexItem
          dark
        />
        <RegisteredEvents
          registeredEvents={registeredEvents}
          count={count}
          setRegisteredEvents={setRegisteredEvents}
          user={user}
        />
      </div>
    </div>
  );
};
export default Events;
