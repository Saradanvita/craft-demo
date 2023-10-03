import React from "react";
import Typography from "@mui/material/Typography";
import CardInfo from "./CardInfo";

const RegisteredEvents = ({
  registeredEvents,
  count,
  setRegisteredEvents,
  user,
}) => {
  return (
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "50%",
      }}
    >
      <Typography
        sx={{
          textDecoration: "underline",
          fontSize: "16px",
          color: "#00175A",
          alignSelf: "center",
        }}
        display="inline"
        variant="h6"
        component="h2"
      >
        Selected Events
      </Typography>

      <div
        style={{
          display: "flex",
          marginTop: "10px",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {registeredEvents.map(
          (event) =>
            event["status"] === "REGISTERED" && (
              <CardInfo
                registered={true}
                event={event}
                count={count}
                user={user}
                setRegisteredEvents={setRegisteredEvents}
              />
            )
        )}
      </div>
    </div>
  );
};
export default RegisteredEvents;
