import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as movies} from "./movies/movies.js";
import {NameSpace} from "./name-space.js";

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.MOVIES]: movies,
});
