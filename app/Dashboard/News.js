import React from 'react';
import styled, { css } from 'styled-components';
import { v4 } from 'uuid';
import { dateToRedebleForNews } from '../Providers/DataNormalization';
import IconForward from '../images/common/icon-link-forward.svg';
import IconForwardHover from '../images/common/icon-link-forward-hover.svg';

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
  .empty-news{
    line-height: 14px;
    font-size: 10px;
    text-align: center;
    letter-spacing: 0.375px;
    color: #8D96B2;
    padding-top: 50px;
    padding-bottom: 40px;
  }
  &:hover{
    a{
      color: #F1F1F1;
      background: url(${IconForwardHover}) no-repeat 100% top;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p{
    font-size: 14px;
    letter-spacing: 0.2625px;
    color: #F1F1F1;
  }
  a {
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #8D96B2;
    text-decoration: none;
    padding-right: 20px;
    background: url(${IconForward}) no-repeat 100% top;
  }
`;

const Post = styled.div`
    margin-left: -20px;
    margin-right: -20px;
    padding: 20px;
  &:nth-child(2){
    margin-top: 15px;
  }
  a {
    height: 30px;
    lineheight: 20px;
    color: #ffffff;
    text-decoration: none;
  }
  .text {
    span{
      vertical-align: middle;
    }
    span:first-child{
      font-size: 14px;
      letter-spacing: 0.35px;
      color: #FFFFFF;
    }
    .icon-link{
      display: none;
      width: 12px;
      height: 14px;
      margin-left: 5px;
      background: url(${IconForwardHover}) no-repeat 100% top;
    }
  }
  .date{
    color: #8D96B2;
    letter-spacing: 0.3px;
    margin-top: 10px;
  }
  &:hover {
    background: rgba(241, 241, 241, 0.1);
    .text{
      .icon-link{
        display: inline-block;
      }
    }
  }
`;

const url = 'https://medium.com/dappy/';

export const News = ({ news }) => (
  <Card>
    <Header>
      <p>Our News</p>
      <a href={url} target="_blank">
        View more
      </a>
    </Header>
    <Post>
      <a href="#">
        <div class="text">
            <span>Certain conditions would cause the asset units to be incorrect</span>
            <span class="icon-link"></span>
         </div>
        <p class="date">May 17, 2018</p>
      </a>
    </Post>
    <Post>
      <a href="#">
        <div class="text">
            <span>Certain conditions would cause the asset units to be incorrect. Lorem ipsum dolor sit amet.</span>
            <span class="icon-link"></span>
         </div>
        <p class="date">May 17, 2018</p>
      </a>
    </Post>
    <Post>
      <a href="#">
        <div class="text">
            <span>Certain conditions would cause the asset units to be incorrect. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, corporis!</span>
            <span class="icon-link"></span>
         </div>
        <p class="date">May 17, 2018</p>
      </a>
    </Post>
    {/* news.size ? (
      news.map(post => (
        <Post key={v4()}>
          <a href={`${url}${post.get('uniqueSlug')}`} target="_blank">
            {post.get('title')}
            <p>{dateToRedebleForNews(post.get('createdAt'))}</p>
          </a>
        </Post>
      ))
    ) : (
      <p class="empty-news">There are no news</p>
    )*/}
  </Card>
);
