// import React from 'react';
// import styled from 'styled-components';

import React from 'react';
import styled from 'styled-components';

import { screen } from '../styles/screen';

const Text = styled.p`
  color: #000;
  font-size: 16px;
  padding: 15px 0;
  text-align: center;
`;

const PageFooter = styled.footer`
  width: 100%;
  min-height: 200px;
  border-top: 2px solid #f0f0f2;
  margin: 75px 0 0 0;
  font-size: 16px;
  text-transform: uppercase;
  text-align: center;
  box-sizing: border-box;
  background: #f0f0f2;

  ul {
    display: block;
    margin: 0;
    margin-bottom: 70px;

    ${screen.md} {
      display: inline-block;
      vertical-align: middle;
    }
  }

  li {
    display: block;
    padding: 10px;

    ${screen.md} {
      display: inline-block;
      margin-right: 25px;
    }

    a {
      &:hover {
        opacity: 0.8;
      }
    }
  }

  /* ${screen.md} {
    font-size: 30px;
    margin: 100px 0 15px 5px;
    letter-spacing: -0.04em;
  } */
`;

const Footer = () => (
  <PageFooter>
    <ul>
      <li>
        <a href="https://twitter.com/willmendesneto" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </li>
      <li>
        <a href="https://github.com/willmendesneto" target="_blank" rel="noopener noreferrer">
          Github
        </a>
      </li>
      <li>
        <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
          RSS
        </a>
      </li>
    </ul>

    <Text>
      made by me with{' '}
      <span role="img" aria-label="love">
        ❤️
      </span>{' '}
      since 2014
    </Text>
  </PageFooter>
);

export default Footer;
