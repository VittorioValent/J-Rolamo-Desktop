import { combineReducers } from "redux";

import { ApplicationState, applicationReducer } from "./ApplicationReducer";
import { layoutReducer, LayoutState } from "./LayoutReducer";

export interface RootState {
  applications: ApplicationState;
  layout: LayoutState;
}

export const rootReducer = combineReducers<RootState | undefined>({
  applications: applicationReducer,
  layout: layoutReducer,
});
