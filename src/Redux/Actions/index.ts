import { ApplicationAction } from "./ApplicationsActions";

export type RootActions = ApplicationAction[keyof ApplicationAction];
