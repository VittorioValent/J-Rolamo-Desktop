import React, { MouseEvent, FunctionComponent } from "react";
import { Drawer, Typography } from "@material-ui/core";
import { Navigation } from "../../../Routes/Routes";
import { connect } from "react-redux";
import { RootState } from "../../../Redux/Reducers";

export interface SideDrawerProps {
  showSideDrawer: boolean;
  currentPort?: string;
  onClose: (event: MouseEvent<HTMLButtonElement>) => void;
}

const SideDrawer: FunctionComponent<SideDrawerProps> = (props) => {
  return (
    <Drawer open={props.showSideDrawer} onClose={props.onClose} anchor="left">
      <Typography variant="h5" align="center">
        Menu Principale
      </Typography>
      <Navigation isPortSet={props.currentPort !== null} />
    </Drawer>
  );
};
const mapState = (state: RootState) => ({
  currentPort: state.applications.currentPort,
});

export default connect(mapState, null)(SideDrawer);
