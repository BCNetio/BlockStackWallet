import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import styled from "styled-components";

const styles = {
  navItem: {
    color: "#FFFFFF"
  }
};

export const RoutingPanel = withStyles(styles)(({}) => <NavbarWrapper />);
