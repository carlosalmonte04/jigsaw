import { IMGUR_API_URL, IMGUR_API_CLIENT_ID } from "../Config";

const data = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: IMGUR_API_CLIENT_ID
  }
};

export const getPictures = async ({ searchQuery, sort = "time", page = 0 }) => {
  const picturesRes = await fetch(
    `${IMGUR_API_URL}/gallery/search/${sort}/all/${page}?q=${searchQuery}&q_type=png&q_type=album`,
    data
  );

  return picturesRes.json();
};

export const getPictureComments = async pictureId => {
  const commentsRes = await fetch(
    `${IMGUR_API_URL}/gallery/${pictureId}/comments`,
    data
  );

  return commentsRes.json();
};
