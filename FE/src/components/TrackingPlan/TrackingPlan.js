import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import EventComponent from "../Event/Event";
import { useDispatch, useSelector } from "react-redux";
import { createNewTrackingPlan } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { fetchTrackingPlan } from "../../redux/actions/tracking-plan";

const TrackingPlanBuilder = ({
  onAddRule,
  events,
  setEvents,
  setTrackingPlans,
}) => {
  const [trackingPlanName, setTrackingPlanName] = useState("");
  const [trackingPlanDescription, setTrackingPlanDescription] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventJSON, setEventJSON] = useState("");

  const handleAddTrackingPlan = () => {
    const trackingPlan = {
      display_name: trackingPlanName,
      description: trackingPlanDescription,
      rules: { events },
    };

    setTrackingPlans(trackingPlan);
  };

  const handleAddEvent = () => {
    const event = {
      display_name: eventName,
      description: eventDescription,
      rules: JSON.parse(eventJSON),
    };
    console.log(events);
    if (typeof events == "array") setEvents([...events, event]);
    else setEvents([event]);
    // events.push(event);

    setEventName("");
    setEventDescription("");
    setEventJSON("");
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", border: "2px solid black" }}>
      <Typography variant="h6">Add Tracking Plan</Typography>
      <TextField
        label="Name"
        fullWidth
        value={trackingPlanName}
        onChange={(e) => setTrackingPlanName(e.target.value)}
      />
      <TextField
        label="Description"
        fullWidth
        value={trackingPlanDescription}
        onChange={(e) => setTrackingPlanDescription(e.target.value)}
        style={{ marginTop: "10px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTrackingPlan}
        style={{ marginTop: "10px", marginRight: "10px" }}
        disabled={
          trackingPlanName == "" || trackingPlanDescription == "" ? true : false
        }
      >
        Add Plan
      </Button>
      <hr style={{ marginTop: "20px", marginBottom: "20px" }} />

      <Typography variant="h6">Events</Typography>

      <TextField
        label="Event Name"
        fullWidth
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <TextField
        label="Event Description"
        fullWidth
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
        style={{ marginTop: "10px" }}
      />
      <TextField
        label="Event Rules (JSON)"
        fullWidth
        multiline
        rows={3}
        value={eventJSON}
        onChange={(e) => setEventJSON(e.target.value)}
        style={{ marginTop: "10px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddEvent}
        style={{ marginTop: "10px", marginRight: "10px" }}
        disabled={eventName == "" || eventJSON == "" ? true : false}
      >
        +
      </Button>
    </Paper>
  );
};

const App = () => {
  const [trackingPlans, setTrackingPlans] = useState({});
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const fetchedTrackingPlan = useSelector((state) => state.trackingPlan);

  const handleSave = () => {
    let payload = { ...trackingPlans, rules: { events: events } };
    console.log(payload);
    dispatch(createNewTrackingPlan(payload));
    setEvents([]);
    setTrackingPlans([]);
  };

  const { id } = useParams();

  useEffect(() => {
    if (fetchTrackingPlan) {
      console.log(fetchedTrackingPlan.trackingPlan);
      setTrackingPlans(fetchedTrackingPlan?.trackingPlan);
      setEvents(fetchedTrackingPlan?.trackingPlan?.rules?.events);
    }
  }, [fetchedTrackingPlan]);

  useEffect(() => {
    console.log(id);
    if (id) {
      dispatch(fetchTrackingPlan({ _id: id }));
    }
  }, []);

  return (
    <Container style={{ padding: "20px" }}>
      <Typography variant="h4" style={{ marginTop: "20px" }}>
        Tracking Plan Builder
      </Typography>
      <TrackingPlanBuilder
        events={events}
        setEvents={setEvents}
        setTrackingPlans={setTrackingPlans}
      />
      <Box mt={4}>
        <Typography variant="h6">Tracking Plans</Typography>

        <Paper
          elevation={0}
          style={{
            padding: "10px",
            marginTop: "10px",
            border: "2px solid black",
          }}
        >
          {trackingPlans &&
            trackingPlans.display_name &&
            trackingPlans.description && (
              <>
                <Typography variant="h6">
                  Name: {trackingPlans.display_name}
                </Typography>
                <Typography variant="h6">
                  Description: {trackingPlans.description}
                </Typography>
              </>
            )}

          <hr style={{ marginTop: "20px", marginBottom: "20px" }} />

          {events &&
            events.map((event, index) => (
              <EventComponent
                event={event}
                index={index}
                events={events}
                setEvents={setEvents}
              />
            ))}
          {trackingPlans &&
            trackingPlans.display_name != "" &&
            trackingPlans.description != "" &&
            events?.length > 0 &&
            !id && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                style={{ marginTop: "10px" }}
              >
                Save
              </Button>
            )}
        </Paper>
      </Box>
    </Container>
  );
};

export default App;
