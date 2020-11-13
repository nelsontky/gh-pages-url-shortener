# GitHub Pages URL Shortener

This is a minimal URL shortener that can be entirely hosted on GitHub pages.

## Demo

1. [nlsn.cf/1](https://nlsn.cf/1) should link to this repo.

1. To add a new short link, add an issue with the title being the link you want
   to shorten (including the `http(s)://`) to
   [https://github.com/nelsontky/gh-pages-url-shortener-db/issues](https://github.com/nelsontky/gh-pages-url-shortener-db/issues).

1. The newly created short url can be accessed via `nlsn.cf/{issue_number}`

## Features

1. Unlike many URL shorteners, this one does not need a database and can be
   entirely hosted on GitHub pages.

1. GitHub issues are used as a "database" for the short links. (Refer to the
   demo section above)

1. There is no need for the pound symbol - short URLs look clean like this:
   `nlsn.cf/1` instead of looking like this: `nlsn.cf/#1`.
