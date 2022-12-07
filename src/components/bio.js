import * as React from "react"
//import { useStaticQuery, graphql } from "gatsby"
import { StaticImage, } from "gatsby-plugin-image"

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
          githubHandle: "janaka"
        },
        bioDescription: "Co-founder CPTO @ FABR. "
      }
      break;
    case "Chen Wang":
      authorProfile = {
        name: authorName,
        photoFileName: "chen-profile-pic.jpg",
        social: {
          twitterHandle: "cwang",
          linkedinHandle: "chenwang",
          githubHandle: "cwang",
        },
        bioDescription: "Co-founder CEO @ FABR. "
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
        bioDescription: ""
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
      {(authorProfile.name == "Janaka Abeywardhana") &&
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
      {(authorProfile.name == "Chen Wang") &&
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
        <div>
          <p>
            Written by <strong>{authorProfile.name}</strong>, {authorProfile?.bioDescription || null}
            {` `}

          </p>
          <p>
            {authorProfile.social?.twitterHandle && <a href={`https://twitter.com/${authorProfile.social?.twitterHandle || ``}`} target="_BLANK">
              Twitter
            </a>}{` `}
            {authorProfile.social?.linkedinHandle && <a href={`https://linkedin.com/in/${authorProfile.social?.linkedinHandle || ``}`} target="_BLANK">
              LinkedIn
            </a>}{` `}
            {authorProfile.social?.githubHandle && <a href={`https://github.com/${authorProfile.social?.githubHandle || ``}`} target="_BLANK">
              Github
            </a>}
          </p>
        </div>
      )}
    </div>
  )
}

export default Bio
