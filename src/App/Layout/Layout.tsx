import React, { Component, Fragment } from "react";
import SideDrawer from "./SideDrawer/SideDrawer";
import Topbar from "./Topbar/Topbar";
import { Box } from "@material-ui/core";
import { LayoutState } from "../../Redux/Reducers/LayoutReducer";
import {
  changeTheme,
  toggleSidedrawer,
} from "../../Redux/Actions/LayoutActions";
import { connect } from "react-redux";
import { RootState } from "../../Redux/Reducers";
import { channels } from "../../Shared/constants";

const { ipcRenderer } = window as any;

class Layout extends Component<any, LayoutState> {
  componentDidMount() {
    this.getTheme();
  }

  render() {
    return (
      <Fragment>
        <Topbar
          onClick={this.props.onToggleSideDrawer}
          onChangeTheme={this.changeTheme}
          darkTheme={this.props.darkTheme}
        />
        <SideDrawer
          showSideDrawer={this.props.showSideDrawer}
          onClose={this.props.onToggleSideDrawer}
        />
        <Box marginX={7} marginY={3}>
          {this.props.children}
        </Box>
      </Fragment>
    );
  }

  changeTheme = () => {
    ipcRenderer.send(channels.TOGGLE_DARK_THEME);
    this.props.onChangeTheme();
  };

  getTheme = () => {
    ipcRenderer.invoke(channels.GET_THEME).then((res: any) => {
      if (res) {
        this.props.onChangeTheme();
      }
    });
  };
}

const mapState = (state: RootState) => ({
  darkTheme: state.layout.darkTheme,
  showSideDrawer: state.layout.showSideDrawer,
});

const mapDispatch = (dispatch: any) => ({
  onChangeTheme: () => dispatch(changeTheme()),
  onToggleSideDrawer: () => dispatch(toggleSidedrawer()),
});

export default connect(mapState, mapDispatch)(Layout);
