import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage, GatsbyImage, getImage, getImageData } from "gatsby-plugin-image"

const Bio = ({ authorName }) => {

  //   const data = useStaticQuery(graphql`
//     query BioQuery {
//       site {
//         siteMetadata {
//           author {
//             name
//             summary
//           }
//           social {
//             twitterHandle
//           }
//         }
//       }
//     }
//   `)

  let authorProfile;

  // Adding author profiles: 
  // - add a new case below. Matches on the `aurthor` frontmatter field in post MD files.
  // - add profile photo files to `/src/images/author-profile-photos` folder.
  // - add a <StaticImage> component at the bottom
  switch (authorName) {
    case "Janaka Abeywardhana":
      authorProfile = {
        name: authorName,
        social: {
          twitterHandle: "janaka_a",
          linkedinHandle: "janakaabeywardhana",
        },
        bioDescription: "Some bio text about Janaka here"
      }
      break;
    case "Chen Wang":
      authorProfile = {
        name: authorName,
        photoFileName: "chen-profile-pic.jpg",
        social: {
          twitterHandle: "cwang",
          linkedinHandle: "",
        },
        bioDescription: "Some bio text about Chen here"
      }
      break;
    case "Gautam Sreekumar":
      authorProfile = {
        name: authorName,
        photoFileName: "",
        social: {
          twitterHandle: "@",
          linkedinHandle: "",
        },
        bioDescription: "Some bio text about Gautam here"
      }
      break;
    default:
      authorProfile = {
        name: "FABR",
        photoFileName: "../images/fabr-icon.png",
        social: {
          twitterHandle: "@fabr_hq",
          linkedinHandle: "fabrhq",
        },
        bioDescription: "Some bio text about FABR here"
      }
      break;
  }

  
  // Set these values by editing "siteMetadata" in gatsby-config.js
  // const author1 = data.site.siteMetadata?.author
  // const social = data.site.siteMetadata?.social

  return (
    // StaticImage doesn't access dynamic values for the `src` prop. This is the simplest solution
    <div className="bio">
      {(authorProfile.name=="Janaka Abeywardhana") &&
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/author-profile-photos/janaka-profile-pic-square.jpg"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />}
      {(authorProfile.name=="Chen Wang") &&
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/author-profile-photos/chen-profile-pic.jpg"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />}

      {authorProfile?.name && (
        <p>
          Written by <strong>{authorProfile.name}</strong> {authorProfile?.bioDescription || null}
          {` `}
          <a href={`https://twitter.com/${authorProfile.social?.twitterHandle || ``}`}>
            Twitter
          </a>
        </p>
      )}
    </div>
  )
}

export default Bio
