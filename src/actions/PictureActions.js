import * as T from "./types";

export const setPictures = ({
  idToIndex,
  picturesData,
  pageToPictures,
  totalPages,
  nsfwResultsCount,
  totalResults
}) => ({
  type: T.SET_PICTURES,
  payload: {
    idToIndex,
    picturesData,
    pageToPictures,
    totalPages,
    nsfwResultsCount,
    totalResults
  }
});

export const setMorePictures = ({
  idToIndex,
  picturesData,
  pageToPictures,
  totalPages,
  nsfwResultsCount,
  totalResults
}) => ({
  type: T.SET_MORE_PICTURES,
  payload: {
    idToIndex,
    picturesData,
    pageToPictures,
    totalPages,
    nsfwResultsCount,
    totalResults
  }
});

export const addNextPagesResults = () => ({});

export const setActivePictureId = pictureId => ({
  type: T.SET_ACTIVE_PICTURE_ID,
  payload: { pictureId }
});

export const setActivePage = pageNumber => ({
  type: T.SET_ACTIVE_PAGE,
  payload: { pageNumber }
});

export const addCommentToPicture = ({ pictureId, commentText }) => ({
  type: T.ADD_COMMENT_TO_PICTURE,
  payload: { pictureId, commentText }
});

export const incrementActivePage = () => ({
  type: T.INCREMENT_ACTIVE_PAGE
});

export const decrementActivePage = () => ({
  type: T.DECREMENT_ACTIVE_PAGE
});
// export const getLocalPictures = page => ({
//   type: T.GET_LOCAL_PICTURES,
//   payload: { page }
// });
