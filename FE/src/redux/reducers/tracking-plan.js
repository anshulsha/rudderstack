import {
  CREATE_NEW_TRACKING_PLAN,
  FETCH_ALL_TRACKING_PLANS,
  FETCH_TRACKING_PLAN,
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_NEW_TRACKING_PLAN:
      return { ...state, newTrackingPlan: action.payload };
    case FETCH_ALL_TRACKING_PLANS:
      return { ...state, allTrackingPlans: action.payload };
    case FETCH_TRACKING_PLAN:
      return { ...state, trackingPlan: action.payload };
    default:
      return state;
  }
}
