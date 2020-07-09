import { Action, ActionCreator } from "redux";
import AppInfo from "../../Model/AppInfo";

export const SET_PORT = "SET_PORT";
export const ADD_APPLICATION = "ADD_APPLICATION";
export const CLEAR_APPLICATIONS = "CLEAR_APPLICATIONS";
export const RESET_PORT = "RESET_PORT";

export interface SetPortAction extends Action {
  type: typeof SET_PORT;
  port: string;
}
export interface AddApplicationAction extends Action {
  type: typeof ADD_APPLICATION;
  application: AppInfo;
}
export interface ClearApplicatiosAction extends Action {
  type: typeof CLEAR_APPLICATIONS;
}
export interface ResetPortAction extends Action {
  type: typeof RESET_PORT;
}

export const setPort: ActionCreator<SetPortAction> = (port: string) => ({
  type: SET_PORT,
  port: port,
});

export const addApplication: ActionCreator<AddApplicationAction> = (
  appInfo: AppInfo
) => ({
  type: ADD_APPLICATION,
  application: appInfo,
});

export const clearApplications: ActionCreator<ClearApplicatiosAction> = () => ({
  type: CLEAR_APPLICATIONS,
});

export const resetPort: ActionCreator<ResetPortAction> = () => ({
  type: RESET_PORT,
});

export type ApplicationAction =
  | SetPortAction
  | ResetPortAction
  | AddApplicationAction
  | ClearApplicatiosAction;
