import styled from 'styled-components';

import { screen } from '../styles/screen';

const PostWrapper = styled.article`

  figure {
    margin-bottom: 1.45rem;
    vertical-align: middle;
    text-align: center;
    display: block;
    padding: 0;
    margin: 50px auto;
  }

  figcaption {
    color: #666;
    font-size: 12px;
    line-height: 1.5em;
    ${screen.lg} {
      font-size: 16px;
    }
  }

  img {
    vertical-align: middle;
    aspect-ratio: auto 245 / 192;
  }

  p img {
    text-align: center;
    display: block;
    margin: 20px auto;
  }

  p .language-text {
    margin-right 5px;
  }

  hr {
    border: none;
    background: transparent;
    color: #111;
    letter-spacing: 1em;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 50px;

    ${screen.md} {
      margin-bottom: 70px;
    }

    &:before {
      content: '...';
    }
  }
`;

export default PostWrapper;
