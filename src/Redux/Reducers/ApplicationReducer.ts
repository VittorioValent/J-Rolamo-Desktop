import { Reducer } from "redux";
import {
  SET_PORT,
  RESET_PORT,
  ApplicationAction,
  ADD_APPLICATION,
  CLEAR_APPLICATIONS,
} from "../Actions/ApplicationsActions";
import AppInfo from "../../Model/AppInfo";

export interface ApplicationState {
  readonly applications: AppInfo[];
  readonly currentPort: string | null;
}

export const applicationReducer: Reducer<ApplicationState> = (
  state: ApplicationState = { applications: [], currentPort: null },
  action: ApplicationAction
) => {
  switch (action.type) {
    case SET_PORT:
      return {
        ...state,
        currentPort: action.port,
      };
    case ADD_APPLICATION:
      const applications: AppInfo[] = [...state.applications];
      applications.push(action.application);
      return {
        ...state,
        applications: applications,
      };
    case CLEAR_APPLICATIONS:
      const applications2: AppInfo[] = [];
      return {
        ...state,
        applications: applications2,
      };
    case RESET_PORT:
      return {
        ...state,
        currentPort: null,
      };
    default:
      return state;
  }
};
