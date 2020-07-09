import React, { Component, Fragment } from "react";
import { Typography, Button, Box } from "@material-ui/core";
import Application from "../../Components/Application/Application";
import ActuatorService from "../../../Service/ActuatorService";
import AppInfo from "../../../Model/AppInfo";
import { ApplicationState } from "../../../Redux/Reducers/ApplicationReducer";
import { connect } from "react-redux";
import {
  setPort,
  addApplication,
  clearApplications,
} from "../../../Redux/Actions/ApplicationsActions";
import { RootState } from "../../../Redux/Reducers";
import { Entities } from "../../../Routes/RouteDefinition";

class Applications extends Component<any, ApplicationState> {
  render() {
    const applications = this.props.applications.map((application: AppInfo) => {
      return (
        <Application
          key={application.name}
          name={application.name}
          port={application.port}
          version={application.version}
          status={application.status}
          onClickCard={this.onClickCard}
          onShutdownApplication={this.onShutdownApplication}
        />
      );
    });
    return (
      <Fragment>
        <Typography align="center" variant="h3">
          Applications
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={this.getRunningApplications}
        >
          Scan for Running Applications
        </Button>
        <Box m={1}>{applications}</Box>
      </Fragment>
    );
  }

  getRunningApplications = () => {
    this.props.onClearApplications();
    for (let i = 0; i <= 20; i++) {
      const actuatorService = new ActuatorService("808" + i.toString());
      actuatorService.getHealthStatus().then((res: any) => {
        if (res.data.status === "UP") {
          actuatorService.getAppInfo().then((res: any) => {
            const application: AppInfo = {
              ...res.data.app,
              port: "808" + i.toString(),
              status: "UP",
            };
            this.props.onAddApplication(application);
          });
        }
      });
    }
  };

  onClickCard = (port: string) => {
    this.props.onClickCard(port);
    this.props.history.push(Entities.path);
  };

  onShutdownApplication = () => {
    this.getRunningApplications();
  };
}

const mapState = (state: RootState) => ({
  applications: state.applications.applications,
});

const mapDispatch = (dispatch: any) => ({
  onClickCard: (port: string) => dispatch(setPort(port)),
  onAddApplication: (appInfo: AppInfo) => dispatch(addApplication(appInfo)),
  onClearApplications: () => dispatch(clearApplications()),
});

export default connect(mapState, mapDispatch)(Applications);
