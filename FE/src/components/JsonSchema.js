import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles"; // Import makeStyles from @mui/styles
import theme from "../common/theme";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "10px",
    marginTop: "10px",
    whiteSpace: "pre-wrap", // Preserve line breaks and whitespace
  },
}));

const JsonSchemaDisplay = ({ jsonSchema }) => {
  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        JSON Schema Display
      </Typography>
      <Paper className={classes.paper} elevation={3}>
        {JSON.stringify(jsonSchema, null, 2)}
      </Paper>
    </Container>
  );
};

export default JsonSchemaDisplay;
