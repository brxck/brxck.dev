const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Create slugs from markdown filenames
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `src/posts` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// Create page for each markdown file
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        posts: allMarkdownRemark(
          filter: {
            fileAbsolutePath: { regex: "/posts/" }
            frontmatter: { draft: { ne: true } }
          }
        ) {
          nodes {
            fields {
              slug
            }
          }
        }
        arts: allMarkdownRemark(
          filter: {
            fileAbsolutePath: { regex: "/arts/" }
            frontmatter: { draft: { ne: true } }
          }
        ) {
          nodes {
            fields {
              slug
            }
          }
        }
      }
    `).then((result) => {
      result.data.posts.nodes.forEach((node) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/PostTemplate.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
      result.data.arts.nodes.forEach((node) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/ArtTemplate.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}
