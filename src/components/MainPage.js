import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { makeStyles } from "@material-ui/core/styles";

import Link from "@material-ui/core/Link";
import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Avatar,
  Icon,
  Box,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Toolbar,
} from "@material-ui/core";

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Would you rather
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menu2Button: {
    marginRight: theme.spacing(2),
  },
  menu2Avatar: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  avatarSize: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  spaceContainer: {
    marginTop: theme.spacing(5),
  },

  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
    spaceContainer: {},
  },
  link: {
    color: "#338FFF",
    fontWeight: "450",
    padding: theme.spacing(0.5),
  },
  spanSpacing: {
    padding: theme.spacing(0.75, 0, 0, 0.75),
  },
}));

// --- Start MainPage class -- //
export function MainPage(props) {
  const classes = useStyles();
  const { authedUser, users } = props;
  const [value, setValue] = React.useState(2);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // The event log out handle AuthedUser.
  const logout = () => {
    props.dispatch(setAuthedUser(null));
    // When user is logged out, return to the signin page
    props.history.push("/");
  };

  const Change = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // The event close handle menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // array navbar items
  const navBarItems = authedUser
    ? [
        {
          value: "Home",
          to: "/",
          icon: "home",
          LinkComponent: NavLink,
          useExact: true,
        },
        {
          value: "Leaderboard",
          to: "/leaderboard",
          icon: "star",
          LinkComponent: NavLink,
          useExact: true,
        },
        {
          value: "Add Question",
          to: "/add",
          icon: "add",
          LinkComponent: NavLink,
          useExact: true,
        },
      ]
    : [];

  // account user option object
  const accountDropdownOptions = authedUser
    ? {
        avatarURL: users[authedUser].avatarURL,
        name: users[authedUser].name,
        description: users[authedUser].id,
      }
    : false;

  let loginLink;

  if (!authedUser) {
    loginLink = (
      <NavLink to="login" className="nav-item font-weight-bold text-dark">
        SIGN IN
      </NavLink>
    );
  } else {
    loginLink = false;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Start Toolbar code  */}
      <div className={classes.grow}>
        <Grid direction="row" justify="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <AppBar position="static">
              <Toolbar>
                <Icon size="small">star</Icon>
                <Typography variant="h6" className={classes.title}>
                  Would You Rather
                </Typography>
                {auth && (
                  <div>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <Avatar src={accountDropdownOptions.avatarURL} />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem>
                        <Avatar className={classes.menu2Avatar} src={accountDropdownOptions.avatarURL}/>
                        <NavLink to="/profile" className={classes.link}>My account</NavLink>
                      </MenuItem>
                      <MenuItem onClick={logout}>
                        <Icon className={classes.menu2Button}>exit_to_app</Icon>
                        Log out
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={12}>
            <Toolbar position="fixed">
              {navBarItems.map((element) => (
                <NavLink
                  className={classes.link}
                  to={element.to}
                  onChange={Change}
                >
                  {element.value}
                  <span className={classes.spanSpacing}>|</span>
                </NavLink>
              ))}
            </Toolbar>
          </Grid>
        </Grid>
      </div>

      {/* Start Content page */}
      <Container
        maxWidth="md"
        component="main"
        className={classes.spaceContainer}
      >
        <Grid container xs={12}>
          {props.children}
        </Grid>
      </Container>
      {/* End Content page */}

      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={1}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
function mapStateToProps({ authedUser, users }) {
  return {
    authedUser: authedUser,
    users: users,
  };
}

export default withRouter(connect(mapStateToProps)(MainPage));
