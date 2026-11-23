<!-- docs-synced-at: 0ad81af35b0c -->

# Site (`/`)

> **Current state:** Static personal site with 57 active posts and 1 workshop entry in content/posts. No tests. Deployed manually with npm run deploy.

## When to read this doc

- You add or change a page, the post template or a component
- You add a post or change frontmatter fields
- You change SEO, RSS, redirects or analytics

## Route and access

| Route           | Purpose                              |
| --------------- | ------------------------------------ |
| `/`             | Home: title and Hello intro          |
| `/posts`        | List of active posts (category post) |
| `/posts/<slug>` | One post, from src/templates/post.js |
| `/talks`        | Talks list                           |
| `/workshops`    | Workshops list                       |
| `/contact`      | Contact page                         |
| `/rss.xml`      | RSS feed of active posts             |

- Layout / shell: `src/components/Layout.js` (Header, Section, Footer)
- Auth gate: none (public static site)
- Roles or plans: none

## Page sections

| Section       | Component     | Data                                     |
| ------------- | ------------- | ---------------------------------------- |
| Header        | `Header`      | static                                   |
| SEO meta      | `SEO`         | useStaticQuery siteMetadata              |
| Post body     | `PostContent` | markdownRemark.html                      |
| Share buttons | `Share`       | react-share, frontmatter path/title/tags |

## Data flow

| Data          | How it is fetched or mutated                             | Auth |
| ------------- | -------------------------------------------------------- | ---- |
| posts list    | page query allMarkdownRemark in src/pages/posts.js       | none |
| one post      | page query markdownRemark(path) in src/templates/post.js | none |
| site metadata | useStaticQuery in SEO.js                                 | none |

## Feature flags and experiments

none

## Analytics

Google Analytics page views (UA-58169656-1) via gatsby-plugin-google-analytics.

## Known limits

gatsby-node.js and the feed cap queries at 1000 posts. Posts without a date are filtered out of /posts.

## Testing

| Area | Where |
| ---- | ----- |
| none | `n/a` |

## Key source files

- `gatsby-config.js`
- `gatsby-node.js`
- `src/templates/post.js`
- `src/pages/posts.js`
- `src/components/Layout.js`
- `src/components/SEO.js`

## Related documentation

- [ARCHITECTURE](../ARCHITECTURE.md)
- [DEVELOPMENT-STANDARDS](../DEVELOPMENT-STANDARDS.md)
