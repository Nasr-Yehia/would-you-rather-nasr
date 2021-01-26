// Action Types for users
export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_TO_AUTHED_USER = "ADD_QUESTION_TO_AUTHED_USER";
export const SAVE_QUESTION_ANSWER_TO_AUTHED_USER ="SAVE_QUESTION_ANSWER_TO_AUTHED_USER";

// Creator of a action to receive users.
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

// Creator of a action to add Question To AuthedUser.
export function addQuestionToAuthedUser(authedUser, id) {
  return {
    type: ADD_QUESTION_TO_AUTHED_USER,
    authedUser,
    id
  };
}

// Creator of a action to saving Question Answer To AuthedUser.
export function saveQuestionAnswerToAuthedUser(authedUser, id, answer) {
  return {
    type: SAVE_QUESTION_ANSWER_TO_AUTHED_USER,
    authedUser,
    id,
    answer
  };
}
