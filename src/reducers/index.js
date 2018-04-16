import { routerReducer } from "react-router-redux";
import { PicturesReducer } from "./PicturesReducer";
import { UIReducer } from "./UIReducer";

export default {
  pictures: PicturesReducer,
  UI: UIReducer,
  routerReducer
};
