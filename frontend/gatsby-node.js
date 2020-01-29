const path = require("path")
const slash = require("slash")
const _ = require("lodash")

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      query MyQuery {
        __typename
        wordPress {
          users {
            nodes {
              pages {
                nodes {
                  date
                  title(format: RENDERED)
                  uri
                  slug
                }
              }
              posts {
                nodes {
                  slug
                  title
                  featuredImage {
                    uri
                    title(format: RENDERED)
                    srcSet(size: MEDIUM_LARGE)
                  }
                }
              }
            }
          }
        }
      }
    `
  )
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  console.log("result.data: ", result.data)
}

//   // Create a blog index
//   const blogTemplate = path.resolve(`./src/templates/blog.js`)
//   let posts = result.data.allWordpressPost.edges.map(post => post.node)
//   createPage({
//     path: `/blog/`,
//     component: slash(blogTemplate),
//     context: {
//       posts: posts,
//     },
//   })

//   // Create pages for each WordPress page
//   const pageTemplate = path.resolve(`./src/templates/page.js`)
//   _.each(result.data.allWordpressPage.nodes, page => {
//     createPage({
//         path: `/${page.slug}`,
//         component: slash(pageTemplate),
//         context: {
//             content: page.content,
//             name: page.title
//         }
//     })
//   })

//   // Create posts for each WordPress post
//   const postTemplate = path.resolve(`./src/templates/post.js`)
//   _.each(result.data.allWordpressPost.edges, edge => {
//     createPage({
//       path: `/blog/${edge.node.slug}`,
//       component: slash(postTemplate),
//       context: {
//         id: edge.node.wordpress_id,
//         title: edge.node.title,
//         author: {
//           avatar: edge.node.author.avatar_urls.wordpress_48,
//           name: edge.node.author.name,
//           slug: edge.node.author.slug,
//           id: edge.node.author.wordpress_id,
//         },
//         content: edge.node.content,
//         slug: edge.node.slug,
//         excerpt: edge.node.excerpt,
//         date: edge.node.date,
//       },
//     })
//   })

//   // Create a user for each WordPress user
//   const userTemplate = path.resolve(`./src/templates/user.js`)
//   _.each(result.data.allWordpressWpUsers.edges, edge => {
//     createPage({
//       path: `/user/${edge.node.slug}`,
//       component: slash(userTemplate),
//       context: {
//         id: edge.node.wordpress_id,
//         name: edge.node.name,
//         avatar: edge.node.avatar_urls.wordpress_96,
//         bio: edge.node.description,
//         slug: edge.node.slug,
//         posts: edge.node.authored_wordpress__POST,
//       },
//     })
//   })
// }
