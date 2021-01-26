// AuthedUser reducer.
// Import the set authedUser action Types. 
import {SET_AUTHED_USER} from '../actions/authedUser'

// State will initially be null!.
export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;
    default:
      return state;
  }
}