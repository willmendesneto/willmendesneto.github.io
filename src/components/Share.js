import React from 'react';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { screen } from '../styles/screen';

const ShareWrapper = styled.div`
  border-radius: 20px;
  background: #f0f0f2;
  padding: 20px 10px;
  margin-top: 40px;
  margin-bottom: 30px;
`;

const commonStyles = `
  cursor: pointer;
  color: #fff;
  padding: 10px 20px;
  margin-right: 20px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  transition: background-color 300ms;

  ${screen.md} {
    display: inline-flex;
    width: auto;
  }
`;

const SocialButtons = ({ className, children }) => <span className={className}>{children}</span>;

const StyledFacebookButton = styled(SocialButtons)`
  ${commonStyles}
  background-color: #3b5998;
  border: 2px solid #3b5998;

  &:hover {
    background-color: transparent;
    color: #3b5998;
  }
`;

const StyledTwitterButton = styled(SocialButtons)`
  ${commonStyles}
  background-color: #1da1f2;
  border: 2px solid #1da1f2;

  &:hover {
    background-color: transparent;
    color: #1da1f2;
  }
`;

const StyledLinkedInButton = styled(SocialButtons)`
  ${commonStyles}
  background-color: #3b5998;
  border: 2px solid #3b5998;

  &:hover {
    background-color: transparent;
    color: #3b5998;
  }
`;

const StyledWhatsAppButton = styled(SocialButtons)`
  ${commonStyles}
  background-color: #128c7e;
  border: 2px solid #128c7e;

  &:hover {
    background-color: transparent;
    color: #128c7e;
  }
`;

const Share = ({ title, tags, path }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            author
          }
        }
      }
    `,
  );

  const url = `${site.siteMetadata.siteUrl}${path}`;

  return (
    <ShareWrapper>
      <p>Share this post via:</p>
      <StyledFacebookButton>
        <FacebookShareButton url={url}>Facebook</FacebookShareButton>
      </StyledFacebookButton>
      <StyledTwitterButton>
        <TwitterShareButton url={url} title={title} via={site.siteMetadata.author.split('@').join('')} hashtags={tags}>
          Twitter
        </TwitterShareButton>
      </StyledTwitterButton>
      <StyledLinkedInButton>
        <LinkedinShareButton url={url} title={title}>
          LinkedIn
        </LinkedinShareButton>
      </StyledLinkedInButton>
      <StyledWhatsAppButton>
        <WhatsappShareButton url={url} title={title}>
          WhatsApp
        </WhatsappShareButton>
      </StyledWhatsAppButton>
    </ShareWrapper>
  );
};

export default Share;
