import React from 'react';
import styled, { css } from 'styled-components';
import { dateToRedebleForNews } from '../Providers/DataNormalization';

const Card = styled.div`
  padding: 10px;
  height: auto;
  background: linear-gradient(42.6deg, #2b3649 0%, #342f58 56.09%, #5c1b57 80.31%, #812359 100%);
  box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.3);
  color: #ffffff;
  fontsize: 12;
  textoverflow: ellipsis;
  padding: 20px;
  paddingbottom: 30px;
  p {
    fontsize: '15px';
    lineheight: '20px';
  }
`;

const Header = styled.div`
  display: flex;
  a {
    height: 30px;
    lineheight: 20px;
    color: #ffffff;
    text-decoration: none;
  }
`;

const Post = styled.div`
  a {
    height: 30px;
    lineheight: 20px;
    color: #ffffff;
    text-decoration: none;
  }
  p {
    margin-top: 5px;
    color: grey;
    font-size: 15px;
  }
  :hover {
    background: #ffffff30;
  }
`;

const url = 'https://medium.com/dappy/';

export const News = ({ news }) => (
  <Card>
    <Header>
      <p>Our News</p>
      <a href="https://medium.com/dappy/" target="_blank">
        View more
      </a>
    </Header>
    {news.size ? (
      news.map(post => (
        <Post>
          <a href={`${url}${post.get('uniqueSlug')}`} target="_blank">
            {post.get('title')}
          </a>
          <p>{dateToRedebleForNews(post.get('createdAt'))}</p>
        </Post>
      ))
    ) : (
      <p>There are no news</p>
    )}
  </Card>
);
