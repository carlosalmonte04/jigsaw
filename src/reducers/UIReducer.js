import * as T from "../actions/types";

const INITIAL_STATE = {
  isDropdownVisible: false,
  animateToPictures: false
};

const UIReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.ANIMATE_TO_PICTURES: {
      return {
        ...state,
        animateToPictures: true
      };
    }
    default:
      return state;
  }
};

export { UIReducer };
