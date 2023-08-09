import axios from "axios";

import {
  CREATE_NEW_TRACKING_PLAN,
  FETCH_ALL_TRACKING_PLANS,
  FETCH_TRACKING_PLAN,
} from "./types";

export const createNewTrackingPlan = (payload) => {
  console.log(payload);
  const response = axios
    .post("/api/v1/tracking-plans/create", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);

  return {
    type: CREATE_NEW_TRACKING_PLAN,
    payload: response,
  };
};

export const fetchAllTrackingPlans = () => {
  const response = axios
    .get("/api/v1/tracking-plans", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);

  return {
    type: FETCH_ALL_TRACKING_PLANS,
    payload: response,
  };
};

export const fetchTrackingPlan = ({ _id }) => {
  const response = axios
    .get(`/api/v1/tracking-plans/${_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);

  return {
    type: FETCH_TRACKING_PLAN,
    payload: response,
  };
};
