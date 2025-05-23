/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      node,
      name: 'slug',
      value: node.frontmatter.path,
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve('src/templates/post.js');

  const result = await graphql(`{
  allMarkdownRemark(
    filter: {frontmatter: {status: {eq: "active"}}}
    sort: {frontmatter: {date: DESC}}
    limit: 1000
  ) {
    edges {
      node {
        frontmatter {
          path
        }
      }
    }
  }
}`);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: postTemplate,
      context: {
        postPath: node.frontmatter.path, // Renamed to avoid conflict
      },
    });
  });
};

exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Post build step finished with success!`);
};
