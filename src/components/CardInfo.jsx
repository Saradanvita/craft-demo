import React from "react";
import Divider from "@mui/material/Divider";

const CardInfo = ({ registered, event, count, setRegisteredEvents, user }) => {
  const selectEvent = (e) => {
    fetch("http://localhost:8080/api/v1/events/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...event,
        user,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((d) => {
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
      });
  };

  const deleteEvent = (e) => {
    fetch("http://localhost:8080/api/v1/events/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...event,
        user,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((d) => {
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
      });
  };

  function changeTimeFormat(d) {
    let date = new Date(d);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes + newformat;
  }
  return (
    <div
      style={{
        margin: "5px",
        width: "190px",
        height: "130px",
        borderRadius: "15px",
        backgroundColor:
          event["status"] === "NOT_AVAILABLE" || (count === 3 && !registered)
            ? "rgba(128,128,128, .5)"
            : "rgba(102, 169, 226, .3)",
        borderColor:
          event["status"] === "NOT_AVAILABLE" || (count === 3 && !registered)
            ? "#808080"
            : "#66A9E2",
        borderStyle: "solid",
        borderWidth: "thin",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <p
          style={{
            display: "flex",
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          {event.eventcategory.substring(0, 1)}
        </p>
        <Divider
          sx={{ bgcolor: "#1976d2" }}
          variant="middle"
          orientation="vertical"
          flexItem
          dark
        />
        <span>
          <p
            style={{ fontWeight: "bold", fontSize: "14px", lineHeight: "0.6" }}
          >
            {event.eventname}
          </p>
          <p style={{ fontSize: "14px", lineHeight: "0.6" }}>
            ({event.eventcategory})
          </p>
          <p style={{ fontSize: "14px", lineHeight: "0.6" }}>
            {changeTimeFormat(event.starttime)} -{" "}
            {changeTimeFormat(event.endtime)}
          </p>

          {registered ? (
            <button
              style={{
                backgroundColor: "rgba(255, 0, 0, 0.3)",
                borderColor: "red",
                borderStyle: "solid",
                borderWidth: "thin",
                marginLeft: "32px",
                borderRadius: "3px",
                fontSize: "12.5px",
              }}
              onClick={deleteEvent}
            >
              REMOVE
            </button>
          ) : (
            <button
              style={{
                backgroundColor:
                  event["status"] !== "NOT_AVAILABLE" &&
                  count !== 3 &&
                  "rgba(97, 179, 59, .4)",
                borderColor:
                  event["status"] !== "NOT_AVAILABLE" &&
                  count !== 3 &&
                  "#008767",
                borderStyle: "solid",
                borderWidth: "thin",
                marginLeft: "32px",
                borderRadius: "3px",
              }}
              disabled={event["status"] === "NOT_AVAILABLE" || count === 3}
              onClick={selectEvent}
            >
              SELECT
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardInfo;
