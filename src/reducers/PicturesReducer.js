import * as T from "../actions/types";

const INITIAL_STATE = {
  /* 
    Array of picture objects 
    from imgur after mapping
  */
  picturesData: [],
  idToIndex: {},
  pageToPictures: {
    /*
    1: [],
    2: []
    ...
    */
  },
  activePictureId: "",
  nsfwResultsCount: 0,
  activePage: 1
};

const PicturesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.SET_PICTURES: {
      const {
        idToIndex,
        picturesData,
        pageToPictures,
        totalPages,
        totalResults,
        nsfwResultsCount
      } = action.payload;

      return {
        ...state,
        idToIndex,
        picturesData,
        pageToPictures,
        totalPages,
        totalResults,
        nsfwResultsCount,
        activePage: 1
      };
    }

    case T.SET_MORE_PICTURES: {
      const {
        idToIndex,
        picturesData,
        pageToPictures,
        totalPages,
        totalResults,
        nsfwResultsCount
      } = action.payload;

      return {
        ...state,
        idToIndex: { ...state.idToIndex, ...idToIndex },
        picturesData: [...state.picturesData, picturesData],
        pageToPictures: { ...state.pageToPictures, ...pageToPictures },
        totalPages,
        totalResults,
        nsfwResultsCount
      };
    }

    case T.SET_ACTIVE_PAGE: {
      const { pageNumber } = action.payload;

      return {
        ...state,
        activePage: pageNumber
      };
    }

    case T.INCREMENT_ACTIVE_PAGE: {
      return {
        ...state,
        activePage: state.activePage + 1
      };
    }

    case T.DECREMENT_ACTIVE_PAGE: {
      return {
        ...state,
        activePage: state.activePage - 1
      };
    }

    case T.SET_ACTIVE_PICTURE_ID: {
      const { pictureId } = action.payload;

      return {
        ...state,
        activePictureId: pictureId
      };
    }

    case T.ADD_COMMENT_TO_PICTURE: {
      const { pictureId } = action.payload;
      const pictureIndex = state.idToIndex[pictureId];
      const picture = state.picturesData[pictureIndex];
      picture.comments = [...picture.comments, {}];

      return {
        ...state,
        activePictureId: pictureId
      };
    }

    case T.INCREMENT_COMMENTS_COUNT: {
      const { pictureData: { id: pictureId } } = action.payload;
      const pictureIndex = state.idToIndex[pictureId];

      const pictureInState = state.picturesData[pictureIndex];

      pictureInState.commentsCount = pictureInState.commentsCount + 1;

      return {
        ...state
      };
    }

    // case T.GET_NEXT_PAGE: {
    //   return {
    //     ...state,
    //     page: state.page + 1
    //   };
    // }

    // case T.GET_PREV_PAGE: {
    //   return {
    //     ...state,
    //     page: state.page - 1
    //   };
    // }
    default:
      return state;
  }
};

export { PicturesReducer };
