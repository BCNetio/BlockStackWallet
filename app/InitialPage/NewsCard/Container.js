import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NewsCard from "./Layout";
import newsCardStoreMapping from "./Selectors";
import newsCardActions from "./Actions";

class NewsPanel extends React.Component {
  constructor(props) {
    super(props);
    props.fetchLatest();
  }

  render() {
    const {posts} = this.props;
    return <NewsCard posts={posts} />;
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(newsCardActions.initialPage.newsCard, dispatch);

export default connect(
  newsCardStoreMapping,
  mapDispatchToProps
)(NewsPanel);
