import React from "react";
import { connect } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MainPage from "./MainPage";
import {
  Paper,
  CardHeader,
  Avatar,
  Badge,
  Grid,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: "xs",
  },
  titleTable: {
    color: "#3f51b5",
    fontWeight: "bold",
  },
});

export function LeaderBoard(props) {
  const classes = useStyles();
  let { users } = props;

  return (
    <MainPage>
        <Grid item xs={12}>
          {/* Start table  */}
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              {/* Start table title */}
              <TableHead>
                <CardHeader
                  title="Leaderboard"
                  className={classes.titleTable}
                />
              </TableHead>

              {/* Start table Header */}
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left" ml={1}>Score</StyledTableCell>
                  <StyledTableCell align="center">User Image</StyledTableCell>
                  <StyledTableCell align="center">User name</StyledTableCell>
                  <StyledTableCell align="center">
                    Answered Questions
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Created Questions
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              {/* Start table body */}
              <TableBody>
                {users.map((user) => (
                  <StyledTableRow key={user.id}>
                    
                    <StyledTableCell align="left">
                      <Badge color="primary" badgeContent={user.score}></Badge>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Avatar src={user.avatarURL}></Avatar>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {user.name}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {Object.keys(user.answers).length}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {Object.keys(user.answers).length}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
    </MainPage>
  );
}

function mapStateToProps({ users, authedUser }) {
  // Make a new user object so that users doesn't get overwritten.
  let userObj = Object.assign({}, users);
  Object.values(users).map(
    (user) =>
      (userObj[user.id]["score"] =
        Object.keys(user.answers).length + user.questions.length)
  );
  return {
    // Create an array of users, sorted by score
    users: Object.values(userObj).sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      } else if (a.score > b.score) {
        return -1;
      } else {
        return 0;
      }
    }),
    authedUser,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
