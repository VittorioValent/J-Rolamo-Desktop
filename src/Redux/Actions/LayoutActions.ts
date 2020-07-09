import { Action, ActionCreator } from "redux";

export const CHANGE_THEME = "CHANGE_THEME";
export const TOGGLE_SIDEDRAWER = "TOGGLE_SIDEDRAWER";

export interface ChangeThemeAction extends Action {
  type: typeof CHANGE_THEME;
}

export interface ToggleSidedrawerAction extends Action {
  type: typeof TOGGLE_SIDEDRAWER;
}

export const changeTheme: ActionCreator<ChangeThemeAction> = () => ({
  type: CHANGE_THEME,
});

export const toggleSidedrawer: ActionCreator<ToggleSidedrawerAction> = () => ({
  type: TOGGLE_SIDEDRAWER,
});

export type LayoutAction = ChangeThemeAction | ToggleSidedrawerAction;
