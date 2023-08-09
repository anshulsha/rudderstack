import React from "react";
import { TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const EventComponent = ({ event, index, events, setEvents }) => {
  const onDeleteHandler = (index) => {
    const updatedEvents = events.filter((event, idx) => {
      return idx != index;
    });
    setEvents(updatedEvents);
  };
  return (
    <div key={index} style={{ marginBottom: "40px" }}>
      <TextField label="Event Name" fullWidth value={event.name} disabled key={`${index}-name`}/>
      <TextField
        label="Event Description"
        fullWidth
        value={event.description}
        disabled
        style={{ marginTop: "10px" }}
        key={`${index}-description`}
      />
      <TextField
        label="Event Rules (JSON)"
        fullWidth
        multiline
        value={JSON.stringify(event.rules, null, 2)}
        disabled
        style={{ marginTop: "10px" }}
        key={`${index}-json`}
      />
      <IconButton onClick={() => onDeleteHandler(index)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default EventComponent;
