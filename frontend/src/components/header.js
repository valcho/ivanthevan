import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Header = () => {
  const data = useStaticQuery(graphql`
  {
    wordPress {
      node {
        id
      }
      menus {
        nodes {
          menuId
          name
          menuItems {
            nodes {
              menuItemId
              label
              url
            }
          }
        }
      }
    }
  }
  `)
  return (
    <nav>
      {data.wordPress.menus.nodes[0].menuItems.nodes.map(menuItem => (
        <li key={menuItem.menuItemId}>
          <Link to={menuItem.url}>{menuItem.label}</Link>
        </li>
      ))}
    </nav>
  )
}

export default Header
