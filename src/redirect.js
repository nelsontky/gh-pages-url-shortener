async function redirect() {
  try {
    const location = window.location;
    const issueNumber = location.pathname.split("/")[PATH_SEGMENTS_TO_SKIP + 1];

    const homepage =
      location.protocol +
      "//" +
      location.hostname +
      (location.port ? ":" + location.port : "") +
      "/" +
      location.pathname.split("/")[PATH_SEGMENTS_TO_SKIP];

    const response = await fetch(GITHUB_ISSUES_LINK + issueNumber);

    if (response.status !== 200) {
      location.replace(homepage);
    }

    const payload = await response.json();
    const { message, title } = payload;

    if (message === "Not Found") {
      // issueNumber does not exist in gh issues
      location.replace(homepage);
    } else if (title) {
      // Check if the title of issue is a legitimate URL
      new URL(title);
      location.replace(title);
    }
  } catch {
    location.replace(homepage);
  }
}

(async () => {
  redirect();
})();
