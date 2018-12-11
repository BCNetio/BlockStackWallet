import { createSelector } from "reselect";

const postsSelector = state => state.newsCard.getIn(["posts"]);

const newsCardSelector = createSelector(
  postsSelector,
  posts => ({ posts })
);

const newsCardStoreMapping = state => newsCardSelector(state);

export default newsCardStoreMapping;
