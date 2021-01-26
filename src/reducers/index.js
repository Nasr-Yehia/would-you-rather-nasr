import { combineReducers } from "redux"
import authedUser from "./authedUser"
import users from "./users"
import questions from "./questions"

/* Export an invocation to combine reducer, 
   passing it all of the different reducers which are (authedusers). */
export default combineReducers({
  authedUser,
  users,
  questions
});
