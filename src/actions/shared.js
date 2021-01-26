import {_saveQuestion,_saveQuestionAnswer} from "../utils/_DATA";
import {receiveUsers,addQuestionToAuthedUser,saveQuestionAnswerToAuthedUser} from "./users";
import { receiveQuestions, addQuestion, saveQuestionAnswer } from "./questions";
import { setAuthedUser } from "./authedUser";
import {getInitialData} from '../utils/api';

let AUTHED_ID = localStorage.getItem("loggedInUser");
if (AUTHED_ID === "null") {
  AUTHED_ID = null;
}

/* The function of getting back the initial data that the application needs.
this function is going to use the redux pattern. */
export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
    // Pass an object that has the user's property and questions.
      .then(({ users, questions }) => {
      // receiveUsers passing it to users, questions.
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      dispatch(setAuthedUser(AUTHED_ID))
    })
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText
    }).then(question => {
      dispatch(addQuestion(question));
      dispatch(addQuestionToAuthedUser(authedUser, question.id));
    });
  };
}

export function handleSaveQuestionAnswer(id, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestionAnswer({
      authedUser,
      qid: id,
      answer
    })
      .then(dispatch(saveQuestionAnswer(id, answer, authedUser)))
      .then(dispatch(saveQuestionAnswerToAuthedUser(authedUser, id, answer)));
  };
}
