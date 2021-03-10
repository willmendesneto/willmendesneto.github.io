module.exports = {
  siteMetadata: {
    siteUrl: 'http://willmendesneto.com',
    title: 'Wilson Mendes',
    description:
      'Senior Frontend-Engineer, Senior Software-Developer, Google Developer Expert Wen Technologies, Microsoft MVP Developer Technologies',
    author: '@willmendesneto',
  },
  plugins: [
    'gatsby-alias-imports',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-reading-time',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
              escapeEntities: {},
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1280,
            },
          },
          'gatsby-remark-responsive-iframe',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'willmendesneto.com',
        short_name: 'willmendesneto.com',
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/images/profile.jpg', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-webfonts',
      options: {
        useMinify: true,
        usePreconnect: true,
        fonts: {
          google: [
            {
              family: 'Poppins',
              variants: ['500', '700', '900'],
              display: 'swap',
            },
          ],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-58169656-1',
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const siteUrl = site.siteMetadata.siteUrl;
                const postText = `
                <div style="margin-top=55px; font-style: italic;">(This is an article posted to my blog at willmendesneto.com. You can read it online by <a href="${
                  siteUrl + edge.node.frontmatter.path
                }">clicking here</a>.)</div>
              `;

                let html = edge.node.html;
                html = html
                  .replace(/href="\//g, `href="${siteUrl}/`)
                  .replace(/src="\//g, `src="${siteUrl}/`)
                  .replace(/"\/static\//g, `"${siteUrl}/static/`)
                  .replace(/,\s*\/static\//g, `,${siteUrl}/static/`);

                return Object.assign({}, edge.node.frontmatter, {
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  custom_elements: [{ 'content:encoded': html + postText }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  filter: { frontmatter: { status: { eq: "active" } } },
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      html
                      frontmatter {
                        title
                        date
                        lang
                        path
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Will Mendes Blog RSS Feed',
          },
        ],
      },
    },
  ],
};
