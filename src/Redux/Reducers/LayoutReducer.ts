import { Reducer } from "redux";
import {
  LayoutAction,
  CHANGE_THEME,
  TOGGLE_SIDEDRAWER,
} from "../Actions/LayoutActions";

export interface LayoutState {
  readonly darkTheme: boolean;
  readonly showSideDrawer: boolean;
}

export const layoutReducer: Reducer<LayoutState> = (
  state: LayoutState = { darkTheme: false, showSideDrawer: false },
  action: LayoutAction
) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    case TOGGLE_SIDEDRAWER:
      return {
        ...state,
        showSideDrawer: !state.showSideDrawer,
      };
    default:
      return state;
  }
};
