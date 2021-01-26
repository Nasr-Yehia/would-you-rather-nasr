// Action Types for authedUser
export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT = "LOGOUT";

// Creator of a action to SET AUTHED USER.
export function setAuthedUser(id) {
  localStorage.setItem("loggedInUser", id);
  return {
    type: SET_AUTHED_USER,
    id
  };
}

export function logout () {
  return { 
    type: LOGOUT,
    id:null
  }
}