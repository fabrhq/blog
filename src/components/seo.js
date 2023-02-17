/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, title, children, location, isPost }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitterHandle
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  //const rootPath = `${__PATH_PREFIX__}/`

  return (
    <>
      <title>{defaultTitle ? `FABR ${defaultTitle} | ${title}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fabr_hq" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      
      {isPost &&
        <>

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:creator"
            content={site.siteMetadata?.social?.twitterHandle || ``}
          />
          <meta
            name="twitter:image"
            content={`${site.siteMetadata.siteUrl}${location.pathname}twitter-card.jpg`}
          />
          <meta name="twitter:image:alt" content={metaDescription} />
        </>
      }

      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      {isPost &&
        <>
          <meta property="og:image" content={`${site.siteMetadata.siteUrl}${location.pathname}twitter-card.jpg`} />
          <meta property="og:url" content={`${site.siteMetadata.siteUrl}${location.pathname}`} />
        </>
      }
      {children}
    </>
  )
}

export default Seo
