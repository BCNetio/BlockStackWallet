import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "./StepperForSend";

const styles = {
  card: {
    backgroundColor: "#2B3649",
    color: "#FFFFFF",
    fontSize: 12,
    textOverflow: "ellipsis",
    marginBottom: "20px",
    borderRadius: "2px",
    boxShadow: "0 25px 40px 0 rgba(0,0,0,0.3)",
    transition: "background-color 0.7s ease"
  }
};

const Operations = ({ wallet }) => <Stepper wallet={wallet} />;

export default withStyles(styles)(Operations);
