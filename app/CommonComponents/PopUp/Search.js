import React from "react";

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = { searchPredicate: "" };
    this.onChangeSerachPredicate = this.onChangeSerachPredicate.bind(this);
  }

  onChangeSerachPredicate(e) {
    this.setState({ searchPredicate: e.target.value });
    this.props.onSearchItem(e.target.value);
  }

  render() {
    return (
      <input
        className="search"
        type="text"
        placeholder="Search.."
        onChange={this.onChangeSerachPredicate}
        value={this.state.searchPredicate}
      />
    );
  }
}

export default SearchBar;
