#!/usr/bin/env bash
# One-time (idempotent) server bootstrap for the static site. Run as root on the VPS:
#   sudo bash server-setup.sh "<deploy public key>"
#
# It only touches what the website needs: a `deploy` user locked to rsync into
# /var/www/emretufekci.com, the nginx vhost, ufw (22/80/443) and fail2ban.
# Existing services on the box (mail, DNS, …) are left alone.
set -euo pipefail

DOMAIN=emretufekci.com
WEBROOT=/var/www/$DOMAIN
PUBKEY=${1:?usage: server-setup.sh "<ssh public key for GitHub Actions>"}
HERE=$(cd "$(dirname "$0")" && pwd)

export DEBIAN_FRONTEND=noninteractive
apt-get update -q
apt-get -y -q -o Dpkg::Options::=--force-confdef -o Dpkg::Options::=--force-confold upgrade
apt-get -y -q install nginx certbot python3-certbot-nginx ufw fail2ban rsync

# deploy user: no password, no sudo, key can only run rrsync (write-only) into the web root.
id deploy &>/dev/null || useradd --system --create-home --shell /bin/sh deploy
passwd -l deploy >/dev/null
install -d -o deploy -g deploy -m 755 "$WEBROOT"
install -d -o deploy -g deploy -m 700 /home/deploy/.ssh
echo "command=\"/usr/bin/rrsync -wo $WEBROOT\",restrict $PUBKEY" > /home/deploy/.ssh/authorized_keys
chown deploy:deploy /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys

# TLS certificate (reuses the existing one if present).
[ -d /etc/letsencrypt/live/$DOMAIN ] || \
  certbot certonly --webroot -w /var/www/html -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m contact@$DOMAIN

install -m 644 "$HERE/nginx/$DOMAIN.conf" /etc/nginx/sites-available/emretufekci-static
ln -sf /etc/nginx/sites-available/emretufekci-static /etc/nginx/sites-enabled/emretufekci-static
nginx -t && systemctl reload nginx

# Firewall: add rules, never reset (other services may rely on existing ones).
ufw allow OpenSSH >/dev/null
ufw allow 'Nginx Full' >/dev/null
ufw --force enable >/dev/null

systemctl enable --now fail2ban
echo "Done. Web root: $WEBROOT"
