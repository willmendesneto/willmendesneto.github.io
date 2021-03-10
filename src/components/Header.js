import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import Section from './Section';
import { screen } from '../styles/screen';

const PageHeader = styled.header``;

const Logo = styled.span`
  display: inline-block;
  text-align: left;
  width: 40%;
`;

const LogoMobile = styled(Logo)`
  display: inline-block;
  height: 40px;
  width: 20%;

  ${screen.md} {
    display: none;
  }

  img {
    border-radius: 50%;
    margin-bottom: 0;
  }
`;

const LogoDesktop = styled(Logo)`
  display: none;

  ${screen.md} {
    display: inline-block;
  }
`;

const Nav = styled.nav`
  background: #000;
  color: #fff;
  margin: 0 auto;
  padding: 10px 15px;
  position: fixed;
  text-transform: uppercase;
  top: 0;
  width: 100%;
  z-index: 10;

  box-sizing: border-box;
  pointer-events: auto;

  ${screen.md} {
    line-height: auto;
    padding: 15px;
    right: 0;
    padding-top: 2vw;
    padding-bottom: 2vw;
    padding-left: 4vw;
    padding-right: 4vw;
  }

  a {
    font-weight: 900;
    color: #fff;
    text-decoration: none;

    &:hover {
      color: #fff;
      opacity: 1;
      text-decoration: underline;
      text-underline-offset: 10px;
    }
  }
`;

const Wrapper = styled(Section)`
  position: relative;
  overflow-x: auto;
  padding-top: 0;
  font-size: 21px;

  ${screen.lg} {
    padding: 0 20px;
    max-width: ${screen.max};
  }
`;

const Links = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;

  ${screen.md} {
    line-height: inherit;
  }

  a {
    padding: 0;
    font-size: 15px;
    margin-right: 10px;

    &:last-child:after {
      margin-right: 0;
    }

    ${screen.md} {
      font-size: 21px;
      margin-right: 25px;
    }
  }
`;

const Header = () => (
  <PageHeader>
    <Nav>
      <Wrapper>
        <LogoMobile>
          <Link to="/">WM</Link>
        </LogoMobile>
        <LogoDesktop>
          <Link to="/">Wilson Mendes</Link>
        </LogoDesktop>

        <Links>
          <Link to="/posts/">posts</Link>
          <Link to="/talks/">talks</Link>
        </Links>
      </Wrapper>
    </Nav>
  </PageHeader>
);

export default Header;
