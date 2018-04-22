import uuidv4 from "uuid/v4";

export const makePicturesAppReady = ({
  picturesData,
  prevTotalPages,
  prevTotalResults
}) => {
  /*
    to increment locally and create
    new page for every 12 pictures
    mapped
  */
  let localPageNumber = (prevTotalPages && prevTotalPages + 1) || 1;

  const pageToPictures = { [(prevTotalPages && prevTotalPages + 1) || 1]: [] };
  const idToIndex = {};
  const totalResults = prevTotalResults || picturesData.length;

  let totalPages = (prevTotalPages && prevTotalPages + 1) || 1;
  let nsfwResultsCount = 0;

  const mappedPicturesData = picturesData.map((pictureObj, index) => {
    /*
      TODO: maybe keeping imagesObj as an array wouldn't be a big deal
    */
    const imagesObj = pictureObj.images.reduce((a, b) => {
      a[b.id] = b;
      return a;
    }, {});

    /*
      For constant access...
      probably will need at some point
    */
    idToIndex[pictureObj.id] = index;

    /*
      Actual info from picture
      needed in the app
    */
    const appReadyPicture = {
      id: pictureObj.id,
      commentsCount: pictureObj.comment_count,
      cover: pictureObj.cover,
      downs: pictureObj.downs,
      description: pictureObj.description,
      favoriteCount: pictureObj.favorite_count,
      images: imagesObj,
      imagesCount: pictureObj.images_count,
      activeImageId: pictureObj.cover,
      link: pictureObj.link,
      points: pictureObj.points,
      nsfw: pictureObj.nsfw,
      title: pictureObj.title,
      topic: pictureObj.topic,
      views: pictureObj.views,
      tag: pictureObj.tags
    };

    /*
      divide results into pages of
      12 pictures each
    */
    if (index && index % 12 === 0) {
      localPageNumber++;
      totalPages++;
      pageToPictures[localPageNumber] = [];
    }
    pageToPictures[localPageNumber].push(appReadyPicture);

    /*
      keep count of nsfw results
    */
    if (pictureObj.nsfw) {
      nsfwResultsCount++;
    }

    return appReadyPicture;
  });

  return {
    idToIndex,
    picturesData: mappedPicturesData,
    pageToPictures,
    totalPages,
    totalResults,
    nsfwResultsCount
  };
};

export const makeCommentAppReady = ({ pictureId, commentText }) => ({
  id: uuidv4(),
  author: "PICTSY",
  image_id: pictureId,
  children: [],
  comment: commentText,
  downs: 0,
  points: 0,
  ups: 0,
  vote: null,
  /*
    datetime from imgur comes in
    as datetime / 1000
  */
  datetime: new Date().getTime() / 1000,
  deleted: false
});
