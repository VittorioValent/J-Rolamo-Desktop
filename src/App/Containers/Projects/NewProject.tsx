import React, { Component } from "react";
import { channels } from "../../../Shared/constants";
import {
  Button,
  FormControlLabel,
  Box,
  Grid,
  FormGroup,
  TextField,
  Switch,
} from "@material-ui/core";
import { Applications } from "../../../Routes/RouteDefinition";

const { ipcRenderer } = window as any;

export default class NewProject extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      newProjectPath: null,
      newProjectName: null,
      newProjectPackaging: null,
      run: false,
    };
  }

  render() {
    const form = (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            label={
              this.state.newProjectPath
                ? "Selected folder: " + this.state.newProjectPath
                : ""
            }
            control={
              <Button
                variant="contained"
                color="secondary"
                onClick={this.openFolder}
                style={{ marginRight: 10 }}
              >
                Select a folder
              </Button>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <Grid item xs={6}>
              <TextField
                color="secondary"
                style={{ margin: "4px" }}
                label="Project Name"
                value={this.state.newProjectName}
                onChange={this.onSelectName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                color="secondary"
                style={{ margin: "4px" }}
                label="Packaging"
                value={this.state.newProjectPackaging}
                onChange={this.onSelectPackaging}
              />
            </Grid>
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            label="Run Project"
            labelPlacement="start"
            control={
              <Switch value={this.state.run} onChange={this.onTogglRun} />
            }
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={this.createProject}
            disabled={
              !this.state.newProjectName ||
              !this.state.newProjectPackaging ||
              !this.state.newProjectPath
            }
          >
            Create project
          </Button>
        </Grid>
      </Grid>
    );

    return form;
  }

  onTogglRun = (event: any) => {
    this.setState({
      ...this.state,
      run: event.target.checked,
    });
  };

  onSelectName = (event: any) => {
    this.setState({
      ...this.state,
      newProjectName: event.target.value,
    });
  };
  onSelectPackaging = (event: any) => {
    this.setState({
      ...this.state,
      newProjectPackaging: event.target.value,
    });
  };

  openFolder = () => {
    ipcRenderer.invoke(channels.OPEN_FOLDER).then((dirs: any) => {
      this.setState({
        ...this.state,
        newProjectPath: dirs.filePaths[0],
      });
    });
  };

  createProject = () => {
    ipcRenderer.invoke(
      channels.RUN_NEWPROJECT_SCRIPT,
      this.state.newProjectPath,
      this.state.newProjectPackaging,
      this.state.newProjectName,
      this.state.run
    );
    this.props.history.push(Applications.path);
  };
}
