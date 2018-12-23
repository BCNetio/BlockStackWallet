import React from "react";
import { withStyles } from "@material-ui/core/styles";

import NavbarWrapper from '../InitialPage/Menu';

const styles = {
  navItem: {
    color: "#FFFFFF"
  }
};

export const RoutingPanel = withStyles(styles)(({}) => <NavbarWrapper />);
