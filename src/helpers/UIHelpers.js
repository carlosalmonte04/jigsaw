import { Colors } from "../assets";
import moment from "moment";

export const getBorderColor = index => {
  switch (true) {
    case index === 0:
      return Colors.lightBlue;
    case index % 2 === 0:
      return Colors.pink;
    case index % 3 === 0:
      return Colors.lightBlue;
    default:
      return Colors.yellow;
  }
};

export const getCroppedPictureTitle = title =>
  title.length > 99 ? `${title.slice(0, 100)}...` : title;

export const formatDate = datetime =>
  moment(datetime * 1000).calendar(null, {
    sameDay: "h:mma",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday]",
    lastWeek: "dddd",
    sameElse: "MM/DD/YY"
  });
