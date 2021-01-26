// Action Types for questions.  
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";

// Creator of a action to receive questions.
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

// Creator of a action to add questions
export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

// Creator a action for saving questions answers.
export function saveQuestionAnswer(id, answer, authedUser) {
  return {
    type: SAVE_QUESTION_ANSWER,
    id,
    answer,
    authedUser
  };
}
