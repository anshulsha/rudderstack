import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import TrackingPlanList from "./components/TrackingPlan/TrackingPlanList";
import CreateTrackingPlan from "./components/TrackingPlan/TrackingPlan";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/tracking-plan-list" element={<TrackingPlanList />} />
        <Route path="/create-tracking-plan" element={<CreateTrackingPlan />} />
        <Route
          path="/edit-tracking-plan/:id"
          element={<CreateTrackingPlan />}
        />
      </Routes>
    </Router>
  );
}

export default App;
