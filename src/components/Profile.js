import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setAuthedUser, users } from "../actions/authedUser";
import MainPage from "./MainPage";
import { Button, Grid, Avatar, Typography, Box } from "@material-ui/core";

function Profile(props) {
  const { authedUser, users } = props;

  // The event log out handle AuthedUser.
  const handleLogout = () => {
    props.dispatch(setAuthedUser(null));
    // When user is logged out, return to the signin page
    props.history.push("/");
  };

  return (
    <MainPage>
      {/* Start user Avatar */}
      <Grid xs={2}>
        {" "}
        <Avatar src={props.users[props.authedUser].avatarURL}></Avatar>
      </Grid>

      {/* Start user Name */}
      <Grid item xs={4}>
        <Box fontWeight="200" fontSize="1.5em">
          {props.users[props.authedUser].name}
        </Box>
        <Button color="primary" variant='outlined' onClick={handleLogout}>
          Logout
        </Button>
      </Grid>

      {/* Start user Score */}
      <Grid item xs={4}>
        <p>Score</p>
        <Box fontWeight="200" fontSize="1.5em">
          {props.users[props.authedUser].score}
        </Box>
      </Grid>
    </MainPage>
  );
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser: authedUser,
    users: users,
  };
}

export default withRouter(connect(mapStateToProps)(Profile));
