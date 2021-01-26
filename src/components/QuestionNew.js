import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// Components
import MainPage from "./MainPage";
import { handleAddQuestion } from "../actions/shared";

// Imprt material-ui component
import AddIcon from "@material-ui/icons/Add";
import {
  Paper,
  Button,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
  TextField,
  FormGroup,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: "auto",
    maxWidth: "xs",
  },
}));

function QuestionNew(props) {
  const classes = makeStyles();
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const [redirect, setRedirect] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const { setOptionOneText } = optionOneText;
    const { setOptionTwoText } = optionTwoText;
    const { addQuestion } = props;

    addQuestion(optionOneText, optionTwoText);

    setRedirect(true);
  }

  const { avatarURL, authedUserName } = props;

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <MainPage>
      <Grid item xs={12}>
      <Paper className={classes.paper}>
        {/* Start questions from  */}
        <form onSubmit={handleSubmit}>
              <Box bgcolor="#3f51b5">
                {/* Start from header */}
                <CardActions>
                  <Box
                    borderColor="primary.main"
                    borderRadius="50%"
                    border={4}
                    className={classes.borderLarge}
                  >
                    {/* Users Name and Avatar */}
                    <Avatar
                      alt={"Avatar of " + authedUserName}
                      src={avatarURL}
                      className={classes.large}
                      title={authedUserName}
                    />
                  </Box>
                  <Box
                    component="span"
                    fontWeight={400}
                    fontSize={20}
                    padding={1}
                  >
                    <NavLink
                      activeStyle={{
                        color: "#FFF",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                      className={classes.avaterName}
                      to={"/"}
                    >
                      {authedUserName}
                    </NavLink>
                  </Box>
                </CardActions>
              </Box>

            {/* Start from body constant */}
              <CardContent>
                {/* Start from title */}
                <Typography
                  variant="h5"
                  color="primary"
                  align="center"
                  className={classes.typoGraphy}
                >
                  Would You Rather ?
                </Typography>
                <br />

                {/* Start form input */}
                <FormGroup>
                  <TextField
                    id="standard-basic"
                    placeholder="Option one..."
                    variant="filled"
                    onChange={(e) => setOptionOneText(e.target.value)}
                  />
                  <br />
                  <Typography variant="h4" align="center">
                    or
                  </Typography>
                  <br />
                  <TextField
                    id="standard-basic"
                    placeholder="Option two..."
                    variant="filled"
                    onChange={(e) => setOptionTwoText(e.target.value)}
                  />
                  <br />
                  {/* Start from submit button */}
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      component="Button"
                      startIcon={<AddIcon />}
                      type="submit"
                      disabled={optionOneText === "" || optionTwoText === ""}
                    >
                      Ask Question
                    </Button>
                  </CardActions>
                </FormGroup>
              </CardContent>
        </form>
      </Paper>
    </Grid>
    </MainPage>
  );
}

const mapStateToProps = ({ authedUser, users }) => ({
  authedUserName: users[authedUser].name,
  avatarURL: users[authedUser].avatarURL,
});
const mapDispatchToProps = (dispatch) => ({
  addQuestion: (one, two) => dispatch(handleAddQuestion(one, two)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionNew);
