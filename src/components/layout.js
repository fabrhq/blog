import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="../">
          <StaticImage
            className="main-logo"
            layout="fixed"
            formats={["auto", "webp", "avif"]}
            src="../images/fabr-icon.png"
            width={50}
            height={50}
            quality={95}
            alt="FABR logo market"
          /></Link>
        {' '}/{' '}
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <div>
        <Link to="../">
          <StaticImage
            className="main-logo"
            layout="fixed"
            formats={["auto", "webp", "avif"]}
            src="../images/fabr-icon.png"
            width={25}
            height={25}
            quality={95}
            alt="FABR logo mark"
          /></Link>
        {' '}/{' '}
        <Link className="header-link-home" to="/">
          {title}
        </Link>
      </div>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()} FABR Ltd (Reg No. 14231816), Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
