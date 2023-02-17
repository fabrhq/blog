// code in this file is a fork from: https://github.com/syntra/gatsby-remark-social-cards
// license: https://github.com/syntra/gatsby-remark-social-cards/blob/master/LICENCE.md
// this plugin has the hieght and width hardcoded to 600x314, didn't have time to get a PR merged in. 
// Also later we want to make the render prettier with logo watermark etc.

const path = require("path");
const Jimp = require("jimp");

/**
 * Writes text to the provided image
 * All options are required
 *
 * @param {Jimp} image
 * @param {Object} options
 */
const writeText = async (
  image,
  { text, font, color, size, style, x, y, xBounds, yBounds }
) => {
  const filename = [font, color, style, size].join("_");
  const fontFile = await Jimp.loadFont(
    path.join(__dirname, `social-card-fonts/${filename}.fnt`)
  );
  return image.print(fontFile, x, y, { text }, xBounds, yBounds);
};

/**
 * Compiles the meta string using the supplied post and parts
 *
 * @param {Object} post the markdown node's frontmatter
 * @param {Array} parts the metadata parts that need compiled
 */
const compileMeta = (post, parts) =>
  parts
    .map(part => {
      if (typeof part === "string") {
        // If the part is a string, return it as-is
        return part;
      } else if (typeof part === "object") {
        // If type is object, it could be a text field or date field
        if (part.format !== undefined) {
          // if format is set, field type must be date
          //return dateFormat(post[part.field], part.format); // library import was a hassle. Just use the same GQL formatted string.
        }
        // If type is not date, field type must be text
        return post[part.field];
      }
    })
    .join("");

/**
 *
 * @param {Object} post the markdown node's frontmatter
 * @param {Object} options the plugin options
 */
 const generateCard = async (
  post,
  {
    // Default Settings
    card: {
      x: card_x = 1200,
      y: card_y = 630
    } = {},
    title: {
      field: title_field = "title",
      font: title_font = "DejaVuSansCondensed",
      color: title_color = "black", // black|white
      size: title_size = 48, // 16|24|32|48|64
      style: title_style = "bold", // normal|bold|italic
      x: title_x = null,
      y: title_y = null,
    } = {},
    meta: {
      parts: meta_parts = [
        "- ",
        { field: "author" },
        " » ",
        { field: "date", format: "mmmm dS" },
      ],
      font: meta_font = "DejaVuSansCondensed",
      color: meta_color = "black", // black|white
      size: meta_size = 24, // 16|24|32|48|64
      style: meta_style = "normal", // normal|bold|italic
      x: meta_x = null,
      y: meta_y = null,
    } = {},
    background = "#FFFFFF",
    xMargin = 24,
    yMargin = 24,
  } = {}
) => {
  // const width = 1200; //600
  // const height = 630; //314

  // Initialize a new blank image
  let image = await new Jimp(card_x, card_y, background);

  // Write the post title to the image
  image = await writeText(image, {
    text: post[title_field],
    font: title_font,
    color: title_color,
    size: title_size,
    style: title_style,
    x: title_x ? title_x : xMargin,
    y: title_y ? title_y : yMargin,
    xBounds: card_x - xMargin,
    yBounds: card_y - yMargin,
  });

  // Write the post meta to the image
  image = await writeText(image, {
    text: compileMeta(post, meta_parts),
    font: meta_font,
    color: meta_color,
    size: meta_size,
    style: meta_style,
    x: meta_x ? meta_x : xMargin,
    y: meta_y ? meta_y : card_y - meta_size - yMargin,
    xBounds: card_x - xMargin,
    yBounds: card_y - yMargin,
  });

  return image;
};

//TODO: move this to gatsby-config.js
const configOptions = {
      card: {
        x: 1200, 
        y: 630
      },
      title: {
        // This is the frontmatter field the title should come from
        field: "title",
        // Currently only supports DejaVuSansCondensed
        // More fonts coming soon!
        font: "DejaVuSansCondensed",
        color: "white", // black|white
        size: 64, // 16|24|32|48|64
        style: "bold", // normal|bold|italic
        x: null, // Will default to xMargin
        y: null, // Will default to yMargin
      },
      meta: {
        // The parts array is what generates the bottom text
        // Pass an array with strings and objects
        // The following array will generate:
        // "15 Feb 2023 | Author Name"
        // The objects are used to pull data from your markdown's
        // frontmatter. { field: "author" } pulls the author set
        // in the frontmatter. { field: "category" } would pull
        // the category set. Any field can be used as parts
        // Note: Only pass the "format" property on date fields
        parts: [
          { field: "date", format: "dd mmm yyyy" },
          " | ",
          { field: "author" },
        ],
        // Currently only supports DejaVuSansCondensed
        // More fonts coming soon!
        font: "DejaVuSansCondensed",
        color: "white", // black|white
        size: 32, // 16|24|32|48|64
        style: "normal", // normal|bold|italic
        x: null, // Will default to xMargin
        y: null, // Will default to cardHeight - yMargin - size
      },
      background: "#FC7E56", // Background color for the card
      xMargin: 48, // Edge margin used when x value is not set
      yMargin: 48,// Edge margin used when y value is not set
    }

module.exports = { generateCard, configOptions } 
// module.exports = ({ markdownNode }, options) => {
//   const post = markdownNode.frontmatter;

  
//   if (markdownNode.fields) {
//     const output = path.join(
//       "./public",
//       markdownNode.fields.slug,
//       "twitter-card.jpg"
//     );

//     generateCard(post, options)
//       .then(image =>
//         image
//           .writeAsync(output)
//           .then(() => console.log("Generated Twitter Card:", output))
//           .catch(err => console.log("ERROR GENERATING TWITTER CARD", err))
//       )
//       .catch(console.error);
//   }
// };