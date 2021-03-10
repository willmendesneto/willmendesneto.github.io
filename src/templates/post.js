import React from 'react';
import { graphql } from 'gatsby';

import Title from '../components/Title';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostContent from '../components/PostContent';
import PostDate from '../components/PostDate';

export default function Template({
  data: {
    markdownRemark: { frontmatter, html, timeToRead },
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
      }
      timeToRead
    }
  }
`;
