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
  background: #fff;
  color: #333;
  margin: 0 auto;
  padding: 10px 15px;
  position: fixed;
  text-transform: uppercase;
  top: 0;
  width: 100%;
  z-index: 10;
  box-sizing: border-box;
  pointer-events: auto;
  box-shadow: inset 0 -1px 0 rgb(230 230 230);

  ${screen.md} {
    line-height: auto;
    padding: 15px;
    right: 0;
    padding-top: 2vw;
    padding-bottom: 2vw;
    padding-left: 4vw;
    padding-right: 4vw;
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

const NavLink = styled(Link)`
  font-weight: 900;
  color: #333;
  ${props =>
    props.active === 'true'
      ? `
    text-decoration: underline;
    text-underline-offset: 10px;
  `
      : `
    text-decoration: none;
  `}

  &:hover {
    opacity: 1;
    text-decoration: underline;
    text-underline-offset: 10px;
  }
`;

const Header = ({ currentPath }) => {
  return (
    <PageHeader>
      <Nav>
        <Wrapper>
          <LogoMobile>
            <NavLink to="/">WM</NavLink>
          </LogoMobile>
          <LogoDesktop>
            <NavLink to="/">Wilson Mendes</NavLink>
          </LogoDesktop>

          <Links>
            <NavLink to="/posts/" active={(currentPath === '/posts/').toString()}>
              posts
            </NavLink>
            <NavLink to="/talks/" active={(currentPath === '/talks/').toString()}>
              talks
            </NavLink>
            <NavLink to="/contact/" active={(currentPath === '/contact/').toString()}>
              contact
            </NavLink>
          </Links>
        </Wrapper>
      </Nav>
    </PageHeader>
  );
};

export default Header;
