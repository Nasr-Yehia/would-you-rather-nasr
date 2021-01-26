import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  FormGroup,
  FormControl,
  Box,
  FormControlLabel,
  Grid,
  RadioGroup,
  Radio,
  Paper,
} from "@material-ui/core";
import { handleSaveQuestionAnswer } from "../actions/shared";

function QuestionAnswer(props) {
  const { question } = props;
  const [option, setOption] = useState("none");
  const [showAlert, setShowAlert] = useState(true);

  function handleChange(e) {
    setOption(e.target.value);

    setShowAlert(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { setOption } = option;
    const { dispatch, question } = props;

    option === "none"
      ? setShowAlert(true)
      : dispatch(handleSaveQuestionAnswer(question.id, option));
  }

  return (
        <form
          onChange={(e) => {
            handleChange(e);
          }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <FormControl component="fieldset">
            <FormGroup label="Choose one option">
              {showAlert && (
                <Box className="text-danger p-4">
                  * Please select one option
                </Box>
              )}
              <RadioGroup>
                <FormControlLabel
                  control={
                    <Radio name="choice" value="optionOne" color="primary" />
                  }
                  label={question.optionOne.text}
                ></FormControlLabel>
                <FormControlLabel
                  control={
                    <Radio name="choice" value="optionTwo" color="primary" />
                  }
                  label={question.optionTwo.text}
                ></FormControlLabel>
              </RadioGroup>
            </FormGroup>
            <Button
              type="submit"
              value="Submit Answer"
              variant="contained"
              color="primary"
            >
              Submit Answer
            </Button>
          </FormControl>
        </form>
  );
}

export default connect()(QuestionAnswer);
