import { htmlToText } from "html-to-text";

const getBriefDescription = (htmlContent, length = 160) => {
  // Convert HTML to plain text
  const plainText = htmlToText(htmlContent, {
    wordwrap: false,
    selectors: [{ selector: "img", format: "skip" }], // Skip images
  });

  // Get a brief description of the desired length
  const briefDescription = plainText.slice(0, length);

  return briefDescription;
};

export default getBriefDescription;
