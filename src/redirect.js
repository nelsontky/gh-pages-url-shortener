function isUrl(url) {
  // Regex from https://stackoverflow.com/a/3809435, with a modification to allow for TLDs of up to 24 characters
  return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,24}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
    url
  );
}

const location = window.location;
const issueNumber = location.pathname.split("/")[PATH_SEGMENTS_TO_SKIP + 1];

const homepage =
  location.protocol +
  "//" +
  location.hostname +
  (location.port ? ":" + location.port : "") +
  "/" +
  location.pathname.split("/")[PATH_SEGMENTS_TO_SKIP];

fetch(GITHUB_ISSUES_LINK + issueNumber)
  .then(function (response) {
    if (response.status !== 200) {
      throw new Error(
        "An error occurred with the GitHub API. Maybe you've exceeded your API limits (60 per hour)"
      );
    }

    response.json().then(function (payload) {
      let { message, title } = payload;

      if (message !== "Not Found" && title && isUrl(title)) {
        // Check if the title of issue is a legitimate URL
        const url = new URL(title);

        if (
          url.protocol !== "https:" ||
          url.protocol !== "http:" ||
          url.host === HOST
        ) {
          // Prevent recursive redirects and XSS
          throw new Error("URL to redirect to is invalid!");
        } else {
          location.replace(title);
        }
      } else {
        throw new Error("issueNumber does not exist in gh issues");
      }
    });
  })
  .catch((e) => {
    location.replace(homepage);
  });
