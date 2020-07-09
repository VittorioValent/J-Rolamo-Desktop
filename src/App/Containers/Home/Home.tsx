import React, { Component, Fragment } from "react";
import { Typography, Button } from "@material-ui/core";
import { NewProject } from "../../../Routes/RouteDefinition";

export default class Home extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      newProjectPath: null,
      newProjectName: null,
      newProjectPackaging: null,
    };
  }

  render() {
    return (
      <Fragment>
        <Typography align="center" variant="h3">
          Home
        </Typography>
        <Typography align="left">
          Welcome to J-Rolamo! Click the button to start a new project
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            this.props.history.push(NewProject.path);
          }}
        >
          New Project
        </Button>
      </Fragment>
    );
  }
}
