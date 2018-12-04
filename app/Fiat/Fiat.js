import React from "react";
import { connect } from "react-redux";
import Select from "../CommonComponents/Select";
import * as actions from "./Actions";

const fiat = [
  { name: "United States Dollar", abbr: "USD" },
  { name: "Euro", abbr: "EUR" },
  { name: "Russian ruble", abbr: "RUB" },
  { name: "Australian Dollar", abbr: "AUD" },
  { name: "Brazilian Real", abbr: "BRL" },
  { name: "Canadian dollar", abbr: "CAD" },
  { name: "Swiss Franc", abbr: "CHF" },
  { name: "Chinese Yuan", abbr: "CNY" },
  { name: "British Pound", abbr: "GBP" },
  { name: "Hong Kong dollar", abbr: "HKD" },
  { name: "Indonesian Rupiah", abbr: "IDR" },
  { name: "Indian Rupee", abbr: "INR" },
  { name: "Japanese Yen", abbr: "JPY" },
  { name: "Korean Won", abbr: "KRW" },
  { name: "Mexican Peso", abbr: "MXN" }
];

class Fiat extends React.Component {
  componentDidMount() {
    this.props.fetchCourse(this.props.selectedFiat.abbr);
    this.props.fetchCourseComission();
  }

  handleMenuItemClick = fiat => {
    this.props.mountFiat(fiat);
    this.props.fetchCourse(fiat.abbr);
  };

  render() {
    return (
      <Select
        selectItem={this.props.selectedFiat}
        list={fiat}
        config={{ search: true, input: false, type: "fiat" }}
        handleMenuItemClick={this.handleMenuItemClick}
      />
    );
  }
}

const mapStateToProps = state => ({
  selectedFiat: state.fiat.selectedFiat,
  course: state.fiat.course
});

const mapDispatchToProps = dispatch => ({
  fetchCourse: fiat => dispatch(actions.fetchCourse(fiat)),
  fetchCourseComission: () => dispatch(actions.fetchCourseComission()),
  mountFiat: fiat => dispatch(actions.mountFiat(fiat))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fiat);
