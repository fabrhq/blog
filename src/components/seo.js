/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, title, children, location, author, publishDate, isPost }) => {
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
      <meta name="description" property="og:description" content={metaDescription} />
      
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fabr_hq" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      
      {isPost &&
        <>
          <meta name="author" content={author}></meta>
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:creator"
            content={site.siteMetadata?.social?.twitterHandle || ``}
          />
          <meta
            name="twitter:image"
            content={`${site.siteMetadata.siteUrl}${location.pathname}social-card.jpg`}
          />
          <meta name="twitter:image:alt" content={metaDescription} />
        </>
      }

      <meta name="title" property="og:title" content={title} />
      
      
      {isPost &&
        <>
          
          <meta name="image" property="og:image" content={`${site.siteMetadata.siteUrl}${location.pathname}social-card.jpg`} />
          <meta property="og:url" content={`${site.siteMetadata.siteUrl}${location.pathname}`} />
        </>
      }

      {isPost ?
        <>
          <meta property="og:type" content="article" />
          <meta property="article:published_time" content={publishDate} />
          <meta property="profile:first_name" content={author.split(" ")[0]} />
          <meta property="profile:last_name" content={author.split(" ")[1]} />
          
          
        </>
        :
        <meta property="og:type" content="website" />
      }


      {children}
    </>
  )
}

export default Seo
