import { Colors } from "../assets";

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
