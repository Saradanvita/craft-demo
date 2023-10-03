import React from "react";

import Typography from "@mui/material/Typography";
import CardInfo from "./CardInfo";

const UnregisteredEvents = ({ events, count, setRegisteredEvents, user }) => {
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
        All Events
      </Typography>
      <div
        style={{
          display: "flex",
          marginTop: "10px",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {events.map(
          (event) =>
            event["status"] !== "REGISTERED" && (
              <CardInfo
                registered={false}
                event={event}
                count={count}
                setRegisteredEvents={setRegisteredEvents}
                user={user}
              />
            )
        )}
      </div>
    </div>
  );
};
export default UnregisteredEvents;
