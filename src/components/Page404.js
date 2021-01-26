import React from "react";
import MainPage from "./MainPage";
import { NavLink } from "react-router-dom";

import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  textHedh: {
    textAlign: "center",
  },
  textBody: {
    textAlign: "center",
    marginTop: theme.spacing(1),
  },
  TextFooter: {
    textAlign: "center",
    marginTop: theme.spacing(1),
  },
  centerButton: {
    margin: 'none',
  },
}));

function Page404() {
  const classes = useStyles();

  return (
    <MainPage>
      <Grid item xs={12}>
        <Grid>
          <Typography variant="h1" color="primary" className={classes.textHedh}>
            404
          </Typography>
        </Grid>

        <Grid>
          <Typography variant="h6" className={classes.textBody}>
            Oops... You just found an error page...
          </Typography>
        </Grid>

        <Grid>
          <Box fontWeight="300" fontWeight="2em" className={classes.TextFooter}>
            We are sorry but the page you have requested can not be found...
          </Box>
        </Grid>
        <Grid>
          <NavLink to="/">
            <Button color="primary" variant="outlined" className={classes.centerButton}>
              Back
            </Button>
          </NavLink>
        </Grid>
      </Grid>
    </MainPage>
  );
}
export default Page404;
