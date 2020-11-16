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
    } else if (title) {
      // Check if the title of issue is a legitimate URL
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
    } else {
      location.replace(homepage);
    }
  } catch (e) {
    location.replace(homepage);
  }
})();
