import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Card,
  Container,
  Typography,
  Box,
  TextField,
  CssBaseline,
} from "@material-ui/core";

// Copyright component
import { Copyright } from "./MainPage";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    border: theme,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  card: {
    margin: theme.spacing(2),
  },
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function Login(props) {
  const { users } = props;
  const classes = useStyles();
  const [authedUser, setAuthedUsers] = useState();

  function handleChange(event) {
    setAuthedUsers(event.target.value);
  }

  function authorizeUser() {
    props.dispatch(setAuthedUser(authedUser));

    let prevRouterPath =
      props.location.state !== undefined
        ? props.location.state.previous.pathname
        : null;
    prevRouterPath
      ? props.history.push(prevRouterPath)
      : props.history.push("/");
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card className={classes.card}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in your account
          </Typography>
          <br />
          <form className={classes.form} noValidate>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Select User
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={authedUser}
                onChange={handleChange}
                label="Select User"
              >
                <MenuItem value="" disabled>
                  <em>None</em>
                </MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              disabled
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={authorizeUser}
            >
              Sign In
            </Button>
          </form>
        </div>
        <Box mt={8}></Box>
      </Card>
      <Copyright />
    </Container>
  );
}

function mapStateToProps({ authedUser, users }) {
  return {
    users: Object.values(users),
    authedUser: authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
