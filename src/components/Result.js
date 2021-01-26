import React, { Component } from "react";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { LinearProgress, Box, Grid } from "@material-ui/core";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  top: {
    color: "#1a90ff",
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
  },
  progress: {
    padding: theme.spacing(1),
  },
  floatRight: {
    textAlign: "right",
    marginTop: theme.spacing(1)
  },
  floatLeft: {
    textAlign: "left",
    marginTop: theme.spacing(1)
  },
  questions: {
    marginBottom: theme.spacing(1)
  }
}));

function Result(props) {
  const classes = useStylesFacebook();
  const { authedUser, question } = props;
  const { optionOne, optionTwo } = question;
  const totalVotes = optionOne.votes.length + optionTwo.votes.length;
  const selected = optionOne.votes.includes(authedUser);

  return (
    <div>
      <Grid container>
        <Grid item className={classes.floatLeft} xs={6}>
          <strong>
            {((optionOne.votes.length / totalVotes) * 100).toFixed(0)}%
          </strong>
        </Grid>

        <Grid item className={classes.floatRight} xs={6}>
          <Box fontWeight={100} fontSize={12} m={1}>
            {optionOne.votes.length} out of {totalVotes} votes
          </Box>
        </Grid>
      </Grid>
      <LinearProgress
        className={classes.progress}
        color="primary"
        variant="buffer"
        value={((optionOne.votes.length / totalVotes) * 100).toFixed(0)}
      />
      <h4 className={classes.questions}>{optionOne.text}</h4>
      <br/>
      <Grid container>
        <Grid item className={classes.floatLeft} xs={6}>
          <strong>
            {((optionTwo.votes.length / totalVotes) * 100).toFixed(0)}%
          </strong>
        </Grid>

        <Grid item className={classes.floatRight} xs={6}>
          <Box fontWeight={100} fontSize={12} m={1}>
            {optionTwo.votes.length} out of {totalVotes} votes
          </Box>
        </Grid>
      </Grid>
      <LinearProgress
        className={classes.progress}
        color="primary"
        variant="buffer"
        value={((optionTwo.votes.length / totalVotes) * 100).toFixed(0)}
      />
      <h4 className={classes.questions}>{optionTwo.text}</h4>
    </div>
  );
}

export default connect()(Result);
