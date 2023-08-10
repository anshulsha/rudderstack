import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTrackingPlans } from "../../redux/actions/tracking-plan";
import { useNavigate } from "react-router-dom";

function TrackingPlanList() {
  const [trackingPlans, setTrackingPlans] = useState([]);
  const dispatch = useDispatch();
  const fetchedTrackingPlan = useSelector((state) => state.trackingPlan);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllTrackingPlans());
  }, []);

  useEffect(() => {
    setTrackingPlans(fetchedTrackingPlan.allTrackingPlans);
  }, [fetchedTrackingPlan]);

  const handleEdit = (id) => {
    navigate(`/edit-tracking-plan/${id}`);
  };

  const handleDelete = (id) => {

  };

  return (
    <Container>
      <Typography variant="h4">Tracking Plans</Typography>
      <List>
        {trackingPlans?.map((plan) => (
          <ListItem key={plan._id}>
            <ListItemText
              primary={plan.display_name}
              secondary={plan.description}
            />
            <Button onClick={() => handleEdit(plan._id)}>View</Button>
            <Button onClick={() => handleDelete(plan._id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default TrackingPlanList;
