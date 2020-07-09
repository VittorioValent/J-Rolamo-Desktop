import React, { FunctionComponent } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import {
  Entities,
  Home,
  Applications,
  NewEntity,
  NewProject,
} from "./RouteDefinition";
import { MenuList, MenuItem } from "@material-ui/core";

export const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <Route {...Entities} />
      <Route {...Applications} />
      <Route {...NewEntity} />
      <Route {...NewProject} />
      <Route {...Home} />
    </Switch>
  );
};

export interface NavigationProps {
  isPortSet: boolean;
}

export const Navigation: FunctionComponent<NavigationProps> = (props) => {
  return (
    <MenuList style={{ width: "20vw" }}>
      <MenuItem to={Home.path} component={NavLink}>
        Home
      </MenuItem>
      <MenuItem to={NewProject.path} component={NavLink}>
        New Project
      </MenuItem>
      <MenuItem
        disabled={!props.isPortSet}
        to={Entities.path}
        component={NavLink}
      >
        Entities
      </MenuItem>
      <MenuItem to={Applications.path} component={NavLink}>
        Applications
      </MenuItem>
    </MenuList>
  );
};
