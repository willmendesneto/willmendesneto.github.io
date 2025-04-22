import React from 'react';
import { graphql } from 'gatsby';

import Title from '../components/Title';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostContent from '../components/PostContent';
import PostDate from '../components/PostDate';
import Share from '../components/Share';

function Template({ data }) {
  // Check if markdownRemark exists before destructuring
  if (!data || !data.markdownRemark) {
    return (
      <Layout>
        <SEO title="Post not found" />
        <Title>Post not found</Title>
        <p>Sorry, this post could not be found.</p>
      </Layout>
    );
  }

  const { frontmatter, html, timeToRead, fields } = data.markdownRemark;
  const tags = frontmatter.tags || [];

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
      <p>Subscribe text content here.</p>
    </Layout>
  );
}

export default Template;

export const pageQuery = graphql`
  query ($postPath: String!) {
    markdownRemark(frontmatter: { path: { eq: $postPath } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
        status
      }
      timeToRead
    }
  }
`;
