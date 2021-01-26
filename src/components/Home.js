import React, { useState } from "react";
import { Redirect, withRouter, Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Box,
  CardHeader,
  CardContent,
  Card,
  Grid,
  Typography,
  Avatar,
} from "@material-ui/core";
// Components
import MainPage from "./MainPage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  postionRight: {
    float: "right",
  },
  textLeft: {
    float: "left",
  },
  cardTextCenter: {
    textAlign: "center",
  },
  textDate: {
    marginTop: theme.spacing(2),
    float: "left",
  },
  textLink: {
    color: "#338fff",
  }
}));

const RESULTS = "results";
const POLL = "poll";
const UNANSWERED = "unanswered";
const ANSWERED = "answered";

function humantime(myTimestamp) {
  return <ReactTimeAgo date={myTimestamp} />;
}

function Home(props) {
  const [questionList, setQuestionList] = useState(UNANSWERED);
  const classes = useStyles();

  function changeQuestionList(e) {
    if (!e.target.textContent.toLowerCase().includes(UNANSWERED)) {
      setQuestionList(ANSWERED);
    } else {
      setQuestionList(UNANSWERED);
    }
  }

  const { questions, users, authedUser, answered, unanswered } = props;

  // Redirect to login Page if not logged in
  if (!authedUser) {
    return <Redirect to="/login" />;
  }

  return (
    <MainPage>
      {/* Start questions button */}
      <Grid item xs={6}>
        <Button
          color="primary"
          variant="outlined"
          aria-selected={questionList === UNANSWERED ? "true" : "false"}
          onClick={changeQuestionList}
          color="primary"
        >
          Unanswered Questions
        </Button>
      </Grid>

      <Grid item xs={6}>
        <Button
          className={classes.postionRight}
          color="primary"
          variant="outlined"
          aria-selected={questionList === ANSWERED ? "true" : "false"}
          onClick={changeQuestionList}
        >
          Answered Questions
        </Button>
      </Grid>

      <Grid item xs={12}><br />
        {(questionList === UNANSWERED ? unanswered : answered).map((answer) => (
          <Grid item key={questions[answer].id}>
            <Card>
              {/* Start card header */}
              <Box
                bgcolor="primary.main"
                color="text.primary"
                style={{ height: "50" }}
              >
                <CardHeader title={users[questions[answer].author].name}>
                </CardHeader>
              </Box>

              {/* Start card content and avatar */}
              <CardContent className={classes.cardTextCenter}>
                <Grid item xs={6}>
                  <Avatar
                    className={classes.large}
                    alt={users[questions[answer].author].name}
                    src={users[questions[answer].author].avatarURL}
                  />
                </Grid>

                {/* Start User Name code*/}
                <Grid container>
                  <Grid item xs={12}>
                    <Box className={classes.textLeft}>
                      <a href="./profile" className={classes.textLink}>
                        {users[questions[answer].author].name}
                      </a>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      className={classes.textLeft}
                      fontWeight="8"
                      fontWeight="50"
                    >
                      asked
                    </Box>
                  </Grid>
                </Grid>

                {/* Start Questions */}
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="h4">Would you rather...</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Box mt={2} fontSize="1.25em" fontWeight="200">
                      ...{questions[answer].optionOne.text}...
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box fontWeight="bold" fontSize="1.5em" mt={1}>
                      OR
                    </Box>
                  </Grid>
                </Grid>

                <Grid container>
                  {/* Start question date */}
                  <Grid item xs={6}>
                    <Box color="text.disabled" className={classes.textDate}>
                      {humantime(questions[answer].timestamp)}
                    </Box>
                  </Grid>

                  {/* Start Answer button */}
                  <Grid item xs={6}>
                    <Link
                      to={{
                        pathname: `/question/${questions[answer].id}`,
                        state: {
                          type: questionList === UNANSWERED ? POLL : RESULTS,
                        },
                      }}
                    >
                      <Button
                        color="primary"
                        size="md"
                        className={classes.postionRight}
                        variant="contained"
                      >
                        Answer
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <br />
          </Grid>
        ))}
      </Grid>
    </MainPage>
  );
}

//
function mapStateToProps({ authedUser, users, questions }) {
  let answered, unanswered;
  const sort = (a, b) => {
    return (
      new Date(questions[b].timestamp).getTime() -
      new Date(questions[a].timestamp).getTime()
    );
  };
  if (authedUser) {
    answered = Object.keys(users[authedUser].answers).sort(sort);
    unanswered = Object.keys(Object.assign({}, questions)).sort(sort);
    answered.map(
      (answer) =>
        (unanswered = unanswered.filter((unanswered) => answer !== unanswered))
    );
  }
  return {
    authedUser,
    users,
    questions,
    answered,
    unanswered,
  };
}
export default withRouter(connect(mapStateToProps)(Home));
