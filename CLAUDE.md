# CLAUDE.md

Personal site + blog for Emre Tüfekçi. Eleventy 3 static site, no front-end framework, no PHP.

## Commands

- `npm start`: dev server with drafts visible
- `npm run build`: production build to `_site/` (drafts excluded via `ELEVENTY_RUN_MODE`)

## Layout

- `src/_data/cv.js`: all home-page content (experience, open source, founder log, education, skills)
- `src/_data/site.js`: name, email, links, canonical URL
- `src/posts/*.md`: blog posts; front matter `title`, `description`, `date`, `category`
  (`startup` | `rtc` | `engineering` | `personal`), optional `draft`, `video`, `image`
- `src/_includes/layouts/`: `base.njk` (meta/OG/header/footer), `post.njk` (post + share bar)
- `src/assets/`: CSS (tokens on `:root`, dark mode via `prefers-color-scheme` and `data-theme`), JS, images
- `deploy/`: nginx vhost and idempotent server bootstrap. Keep the vhost here in sync with the server.

## Deploy

Push to `master` → GitHub Actions builds → `rsync` to `deploy@<DEPLOY_HOST>`, which is locked to
`rrsync -wo /var/www/emretufekci.com`. Never give the workflow a root key.

## Server (VPS, Ubuntu)

The same box also runs **mail (Postfix/Dovecot/OpenDKIM), BIND DNS, MariaDB and Docker**.
When working on the server:

- Never reset ufw or reinstall the OS. Add rules only.
- Don't touch the mail/DNS configs or `mail.emretufekci.com` (served by the `offline` vhost).
- PHP was removed on purpose (PHP2Shell CVE). Keep the website static.
- `nginx -t` before every reload. Backups of `/etc/nginx` live in `/root/nginx-bak-*`.
- Use `apt-get upgrade` with `--force-confold` so existing configs survive.

## Writing style for posts

Emre's voice: direct, first person, practical, honest about failures, no hype.
Posts about startups or personal life go in `drafts/` (git-ignored; the repo is public) until Emre approves them.
Don't publish private details (finances, health, family, employer-confidential work).

## Commits

Don't add Claude as a co-author or add "Generated with Claude" lines.
