function isUrl(url) {
  // Regex from https://stackoverflow.com/a/3809435
  return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
    url
  );
}

(async function redirect() {
  const location = window.location;
  const issueNumber = location.pathname.split("/")[PATH_SEGMENTS_TO_SKIP + 1];

  const homepage =
    location.protocol +
    "//" +
    location.hostname +
    (location.port ? ":" + location.port : "") +
    "/" +
    location.pathname.split("/")[PATH_SEGMENTS_TO_SKIP];

  try {
    const response = await fetch(GITHUB_ISSUES_LINK + issueNumber);

    if (response.status !== 200) {
      location.replace(homepage);
      return;
    }

    const payload = await response.json();
    let { message, title } = payload;

    if (message === "Not Found") {
      // issueNumber does not exist in gh issues
      location.replace(homepage);
    } else if (!title || !isUrl(title)) {
      location.replace(homepage);
    } else {
      const url = new URL(title);

      if (
        (url.protocol !== "https:" && url.protocol !== "http:") ||
        url.host === HOST
      ) {
        // Prevent recursive redirects and XSS
        location.replace(homepage);
      } else {
        location.replace(title);
      }
    }
  } catch (e) {
    location.replace(homepage);
  }
})();
