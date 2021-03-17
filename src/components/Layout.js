/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';

import './layout.css';

import styled from 'styled-components';

import { screen } from '../styles/screen';

import Header from './Header';
import Footer from './Footer';
import Section from './Section';

const Wrapper = styled.div`
  padding: 15px 7px 15px 0;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
  max-width: ${screen.max};
  font-size: 20px;
  line-height: 1.8em;
  padding: 30px 0 0;
  position: relative;
  vertical-align: top;

  ${screen.md} {
    font-size: 22px;
  }

  pre {
    border-radius: 0;
    font-size: 0.8em;
  }
`;

const Main = styled.main`
  display: inline-block;
  padding: 15px;
  vertical-align: top;
  width: 100%;
`;

const Layout = ({ children, location = {} }) => {
  return (
    <>
      <Header currentPath={location.pathname} />
      <Wrapper>
        <Main>
          <Section>{children}</Section>
        </Main>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Layout;
