import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import QuestionAnswer from "./QuestionAnswer";
import Result from "./Result";
import Page404 from "./Page404";
import MainPage from "./MainPage";
import {
  Paper,
  Card,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  makeStyles,
  Avatar,
  Grid,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  borderLarge: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  typoGraphy: {
    marginBottom: theme.spacing(2),
  },
  avaterName: {
    color: "FFF",
  },
}));

function humantime(myTimestamp) {
  return <ReactTimeAgo date={myTimestamp} />;
}
function Question(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { authedUser, users, question } = props;

  if (!question) {
    return <Page404 />;
  }

  const questionAnswered = Object.keys(users[authedUser].answers).includes(
    question.id
  );

  return (
    <MainPage>
                    <Grid item xs={12}>

      <Paper>
        <Card>

          <Box bgcolor="primary.main">
                <CardActions>
                  <Box
                    borderColor="primary.main"
                    borderRadius="50%"
                    border={4}
                    className={classes.borderLarge}
                  >
                    <Avatar
                      alt={"Avatar of " + users[question.author].name}
                      src={users[question.author].avatarURL}
                      className={classes.large}
                      title={users[question.author].name}
                    />
                  </Box>
                  <Box
                    component="span"
                    fontWeight={400}
                    fontSize={20}
                    padding={1}
                  >
                    <NavLink activeStyle={{
                      color: '#FFF',
                      textDecoration: 'none',
                      fontWeight: "bold",
                      }}
                      className={classes.avaterName} to={'/'}>
                      {users[question.author].name}
                    </NavLink>
                  </Box>
                </CardActions>
          </Box>

          <CardContent>
            <Typography
              variant="h5"
              color="primary"
              align="center"
              className={classes.typoGraphy}
            >
              Would you rather...
            </Typography>
            {questionAnswered ? (
              <Result
                question={question}
                author={users[question.author]}
                authedUser={authedUser}
              />
            ) : (
              <QuestionAnswer
                question={question}
                author={users[question.author]}
              />
            )}
          </CardContent>
          <CardActionArea>
            {questionAnswered && (
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  component="Button"
                  startIcon={<ArrowBackIcon />}
                >
                  <NavLink to={"/"} activeStyle={{color:'white', textDecoration:'none'}}>Return to Homepage</NavLink>
                </Button>
              </CardActions>
            )}
          </CardActionArea>
        </Card>
        </Paper>
        </Grid>
    </MainPage>
  );
}

const mapStateToProps = ({ authedUser, users, questions }, props) => ({
  authedUser,
  users,
  question: questions[props.match.params.id],
});

export default connect(mapStateToProps)(Question);
