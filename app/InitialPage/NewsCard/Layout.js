import React from "react";
import styled from "styled-components";
import { config } from "../../AppConfig";
import IconForward from '../../images/common/icon-link-forward.svg';
import IconForwardHover from '../../images/common/icon-link-forward-hover.svg';
import { newsDateConverter } from '../../Providers/DateWrapper';

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

const Failed = () => (
  <a href="#">
    <div className="text">
      <span>Certain conditions would cause the asset units to be incorrect</span>
      <span className="icon-link" />
    </div>
    <p className="date">May 17, 2018</p>
  </a>
);

const NewsHeader = () => (
  <Header>
    <p>Our News</p>
    <a
      href="https://medium.com/dappy/"
      target="_blank"
      rel="noopener noreferrer"
    >
      View more
    </a>
  </Header>
);

const NewsPost = ({ uniqueSlug, title, createdAt }) => (
  <Post>
    <a
      href={`${config.mediumNewsRoot}${uniqueSlug}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={'text'} >
        <span className={'text'}> {title} </span>
        <span className="icon-link" />
      </div>
      <p className={'date'}> {newsDateConverter(createdAt)} </p>
    </a>
  </Post>
);

const News = ({ posts }) => (
  <Card>
    <NewsHeader />
    {posts ? (
      posts.map(post => <NewsPost key={post.uniqueSlug} {...post} />)
    ) : (
      <Failed />
    )}
  </Card>
);

export default News;
