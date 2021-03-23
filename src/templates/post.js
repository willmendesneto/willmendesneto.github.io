import React from 'react';
import { graphql } from 'gatsby';

import Title from '../components/Title';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostContent from '../components/PostContent';
import PostDate from '../components/PostDate';
import Share from '../components/Share';

export default function Template({
  data: {
    markdownRemark: { frontmatter, html, timeToRead, tags },
  },
}) {
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <Title>{frontmatter.title}</Title>
      <PostDate datetime={frontmatter.date} itemprop="datePublished">
        {frontmatter.date} - {timeToRead && `${timeToRead} min read`}
      </PostDate>

      <PostContent itemprop="articleBody">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </PostContent>
      <Share path={frontmatter.path} title={frontmatter.title} tags={tags} />
      <h3>Subscribe</h3>
      <p>
        To keep up with posts on this blog, you can also{' '}
        <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
          subscribe via RSS
        </a>
        .
      </p>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
      }
      timeToRead
    }
  }
`;
