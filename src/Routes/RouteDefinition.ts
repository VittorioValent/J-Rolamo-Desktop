import HomeComponent from "../App/Containers/Home/Home";
import EntitiesComponent from "../App/Containers/Entities/Entities";
import ApplicationsComponent from "../App/Containers/Applications/Applications";
import NewEntityComponent from "../App/Containers/Entities/NewEntity/NewEntity";
import NewProjectComponent from "../App/Containers/Projects/NewProject";

export interface RouteInfo {
  path: string;
  component: React.ComponentType<any>;
  match?: boolean;
}

export const Home: RouteInfo = {
  path: "/",
  component: HomeComponent,
};

export const Entities: RouteInfo = {
  path: "/entities",
  component: EntitiesComponent,
};

export const Applications: RouteInfo = {
  path: "/applications",
  component: ApplicationsComponent,
};

export const NewProject: RouteInfo = {
  path: "/newproject",
  component: NewProjectComponent,
};

export const NewEntity: RouteInfo = {
  path: "/newentity",
  component: NewEntityComponent,
};
