<!-- docs-synced-at: 0ad81af35b0c -->

# Architecture

**When to read:** before adding a module, changing a boundary between modules, or touching how data
flows in and out of the system.

## What this project is

Personal website and blog of Wilson Mendes, built with Gatsby 5 and React 18. Markdown posts under `content/posts/` become static pages through GraphQL. The site is published to GitHub Pages (`master` branch) at https://willmendesneto.github.io.

Kind: app. Stack: Gatsby 5, React 18, styled-components 5, gatsby-transformer-remark (Markdown), GraphQL, react-helmet.

## Modules

| Module                  | Responsibility                                                                                                  | Entry points                         | Doc                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------------------------------- |
| `src/pages/`            | File-based routes: `/`, `/posts`, `/talks`, `/workshops`, `/contact`, 404                                       | `index.js`, `posts.js`               | [features/SITE.md](features/SITE.md)                 |
| `src/templates/post.js` | Post page template; queries one `markdownRemark` by `path`                                                      | `post.js`                            | [features/SITE.md](features/SITE.md)                 |
| `src/components/`       | Layout, Header, Footer, SEO (Helmet), Share, styled text primitives                                             | `Layout.js`, `SEO.js`                | [features/SITE.md](features/SITE.md)                 |
| `src/styles/`           | Theme and screen breakpoints                                                                                    | `theme.js`, `screen.js`              | [DEVELOPMENT-STANDARDS.md](DEVELOPMENT-STANDARDS.md) |
| `content/posts/`        | Markdown posts, one folder per post with `index.md` and assets; `_drafts/` holds drafts                         | `<slug>/index.md`                    | [features/SITE.md](features/SITE.md)                 |
| `gatsby-*.js`           | Gatsby config (plugins, feed, redirects), node APIs (page creation), browser APIs (Prism theme, service worker) | `gatsby-config.js`, `gatsby-node.js` | [ARCHITECTURE.md](ARCHITECTURE.md)                   |

## Boundaries

- Content lives in Markdown under `content/posts/`; code never hardcodes post data.
- `gatsby-node.js` creates one page per post with `status: "active"`, using `frontmatter.path` as the URL.
- Pages and the template read data only through Gatsby GraphQL (`graphql` page queries or `useStaticQuery`).
- Styling uses styled-components plus one global `src/components/layout.css`.

## Data flow

1. `gatsby-source-filesystem` reads `content/posts/` and `src/images/`.
2. `gatsby-transformer-remark` parses Markdown with remark plugins: Prism, images (sharp, webp/avif), gists, tweets, reading time, external links, responsive iframes.
3. `gatsby-node.js` `onCreateNode` adds `fields.slug` from `frontmatter.path`. `createPages` renders `src/templates/post.js` for each active post.
4. `src/pages/posts.js` lists active posts with `category: "post"`. The talks and workshops pages list their own content.
5. `gatsby-plugin-feed` writes `/rss.xml` from active posts.

## External dependencies and integrations

- Google Analytics (UA-58169656-1) through `gatsby-plugin-google-analytics`.
- Google Fonts (Poppins) through `gatsby-plugin-webfonts`.
- GitHub Gists and Twitter embeds inside posts.
- GitHub Pages hosting through `gh-pages` (`npm run deploy`).
- Offline service worker (`gatsby-plugin-offline`), sitemap, robots, manifest.
- Redirects: `gatsby-redirect-from` and `gatsby-plugin-meta-redirect` read `redirect_from` in frontmatter. They must stay last in the plugin list.

## Build and runtime

- Build: `npm run build`
- Output: `public/` (static HTML, JS, images, `rss.xml`, `sitemap`). `npm run deploy` adds `public/VERSION.txt` and pushes `public/` to the `master` branch.
- Server-side rendering: Gatsby renders every page to static HTML at build time. Code in components must not access `window` or `document` at module scope.

## Known constraints and debt

- `npm run test` is a placeholder that exits 1. The repo has no tests.
- CircleCI uses Node 16 (`circleci/node:16.14.0-browsers`), while `.nvmrc` pins v20.10.0. Gatsby 5 needs Node 18 or later.
- `SEO.js` reads `siteMetadata.siteUrl` but its query does not request it, so `og:image` starts with `undefined` when an image is set.
- `src/templates/post.js` renders a placeholder "Subscribe text content here." block.
- Universal Analytics (UA-) IDs no longer collect data.

## Related documentation

- [DEVELOPMENT-STANDARDS.md](DEVELOPMENT-STANDARDS.md)
- [TESTING-GUIDE.md](TESTING-GUIDE.md)
- [decisions/](decisions/README.md)
