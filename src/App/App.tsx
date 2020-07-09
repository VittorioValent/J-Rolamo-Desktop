import React, { Component } from "react";
import { Routes } from "../Routes/Routes";
import Layout from "./Layout/Layout";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { lightTheme, darkTheme } from "../Theme/Theme";
import { CssBaseline } from "@material-ui/core";
import { HashRouter } from "react-router-dom";
import { LayoutState } from "../Redux/Reducers/LayoutReducer";
import { connect } from "react-redux";
import { RootState } from "../Redux/Reducers";

class App extends Component<any, LayoutState> {
  render() {
    return (
      <MuiThemeProvider theme={this.props.darkTheme ? darkTheme : lightTheme}>
        <CssBaseline />
        <HashRouter>
          <Layout>
            <Routes />
          </Layout>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

const mapState = (state: RootState) => ({
  darkTheme: state.layout.darkTheme,
  showSideDrawer: state.layout.showSideDrawer,
});

export default connect(mapState, {})(App);
