import React from 'react';
import { graphql } from 'gatsby';

import PostLink from '../components/PostLink';
import Title from '../components/Title';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

import styled from 'styled-components';

const PostsWrapper = styled.div`
  margin-bottom: 15px;
`;

const BlogPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
  location,
}) => {
  const Workshops = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout location={location}>
      <SEO title="Workshops" />
      <Title>Workshops</Title>

      <PostsWrapper>
        <>
          <p>
            Here you can find a list of workshops I've done across the globe{' '}
            <span role="img" aria-label="world">
              🌎
            </span>
          </p>
          {Workshops}
        </>
      </PostsWrapper>
    </Layout>
  );
};

export default BlogPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { status: { eq: "active" }, category: { eq: "workshop" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            path
            title
            category
          }
        }
      }
    }
  }
`;
