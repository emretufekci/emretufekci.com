# emretufekci.com

Personal site and blog of **Emre Tüfekçi**: Senior RTC & AI Engineer.
Static site built with [Eleventy](https://www.11ty.dev/), served by nginx on my own VPS.
Every push to `master` builds and deploys automatically.

The 2018 version of this site is preserved under the tag [`v2018`](../../tree/v2018).

## Run locally

```sh
npm install
npm start          # http://localhost:8080, drafts are visible here
npm run build      # production build into _site/ (drafts excluded)
```

## Writing a post

Create `src/posts/YYYY-MM-DD-some-slug.md`:

```md
---
title: "Post title"
description: "One or two sentences. Used in lists, SEO and share cards."
date: 2026-11-01
category: rtc            # startup | rtc | engineering | personal
draft: true              # remove to publish
video: https://youtu.be/XXXXXXXXXXX   # optional, makes it a vlog post
image: /assets/img/posts/cover.jpg    # optional share image (1200×630)
---

Markdown here.
```

The URL becomes `/blog/some-slug/`. Commit and push, and it's live in about a minute.

Images go in `src/assets/img/posts/`.

## Cross-posting (Medium, Substack, LinkedIn)

Every post has a canonical URL, Open Graph tags, and a full-content RSS feed at
`/feed.xml`. Publish here first, then:

- **Medium:** profile menu → *Stories* → *Import a story* → paste the post URL.
  Medium sets the canonical link back to this site, so search engines credit the original.
- **Substack:** *Settings* → *Import* → paste `https://emretufekci.com/feed.xml`, or paste a
  post into the editor and add "Originally published at …" at the bottom. Share a teaser in **Notes**.
- **LinkedIn:** use the *Share* button on the post (link card), or paste it as a LinkedIn article
  with a link back.
- **dev.to / Hashnode:** both can import from RSS automatically and set the canonical URL.

## Deployment

`.github/workflows/deploy.yml` builds the site and `rsync`s `_site/` to the server as the
`deploy` user. That user's SSH key is pinned server-side to
`rrsync -wo /var/www/emretufekci.com`: it can only write files into the web root,
with no shell and no sudo.

Repository settings needed (*Settings → Secrets and variables → Actions*):

| Name | Type | Value |
| --- | --- | --- |
| `DEPLOY_SSH_KEY` | secret | private key of the deploy keypair |
| `DEPLOY_KNOWN_HOSTS` | secret | `ssh-keyscan -t ed25519 <server ip>` output |
| `DEPLOY_HOST` | variable | server IP |

Server bootstrap (idempotent; nginx vhost, deploy user, ufw, fail2ban, certbot):

```sh
scp -r deploy root@server:/root/emretufekci-deploy
ssh root@server 'bash /root/emretufekci-deploy/server-setup.sh "<deploy public key>"'
```

## Editing the CV

Everything on the home page lives in [`src/_data/cv.js`](src/_data/cv.js).
Site-wide details (email, links) are in [`src/_data/site.js`](src/_data/site.js).

## License

Code: GPL-3.0 (see `LICENSE`). Blog posts and photos: © Emre Tüfekçi, all rights reserved.
