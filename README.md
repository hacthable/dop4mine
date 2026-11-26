# Dopamine

Open any website from one place. Dopamine is a web proxy with its own homepage, built on [Scramjet-App](https://github.com/MercuryWorkshop/Scramjet-App) by Mercury Workshop.

Need help or found a site that doesn't work? Use the [help form](https://forms.gle/SKvxB19Re4Ur1WBZ6).

## Features

- Search bar and address bar, with back, forward, reload and open in new tab
- Shortcut tiles, including your own
- Games panel with game sites
- Backgrounds: stars, ice waves, aurora, rain on glass, city lights, night ocean, a solid color, or a video (including your own)
- Color themes, solid or glass menus, a clock, and a custom tab title and icon
- Server status with response time, ping, uptime and a history of checks
- A Help panel that answers common questions
- Can be installed as an app
- Blocks adult, piracy, gambling and dark web sites, and uses SafeSearch on every search

## Safety filter

Dopamine blocks sites in two layers:

1. **Cloudflare family DNS** (`1.1.1.3`) blocks known adult and malware sites. It's set in `src/index.js`.
2. **Dopamine's own list** in `src/blocklist.js` covers piracy, torrent, gambling and dark web sites, plus adult sites the DNS filter misses.

To block another site, add a line to `src/blocklist.js`, for example:

```js
/(^|\.)badsite\.com$/i,
```

Typing a raw IP address is also blocked, so the filter can't be skipped.

## Files

| File | What it does |
| --- | --- |
| `src/index.js` | The server. Serves the site, the proxy engine, the `/wisp/` connection and `/api/info`. |
| `src/blocklist.js` | The list of blocked sites. |
| `public/index.html` | The Dopamine homepage: layout, styles, fonts and all homepage code. |
| `public/engine.js` | Connects the homepage to the Scramjet proxy. |
| `public/sw.js`, `public/register-sw.js` | The service worker that routes proxied pages. |
| `public/404.html` | The "page not found" page. |
| `public/bg-video.mp4` | The background video. |
| `public/manifest.webmanifest`, icons | Let Dopamine be installed as an app. |

## Put it online with Render (free)

1. Put these files in a public GitHub repository.
2. On [render.com](https://render.com), choose **New > Web Service** and pick the repository.
3. Render uses the `Dockerfile` automatically. Choose the **Free** instance type.
4. Click **Deploy Web Service**. When the log says `Listening on`, open your `onrender.com` address.

Every change committed to GitHub redeploys the site automatically. On the free plan the server sleeps after about 15 minutes with no visitors. The next visit shows "Waking the server up" for up to a minute.

## Run it on your own computer

You need [Node.js](https://nodejs.org) 20 or newer.

```
npm install
npm start
```

Then open http://localhost:8080. With Docker instead: `docker compose up -d`.

## Demo mode

On CodePen, from a file on disk, or at any address ending in `?demo`, the homepage runs without the server. It shows a "Demo mode" notice and doesn't open sites.

## Embed it in another site

Paste this into any website builder that accepts HTML, using your own address:

```html
<iframe src="https://YOUR-SITE.onrender.com" style="width:100%;height:100vh;border:0" allow="fullscreen; autoplay; clipboard-write"></iframe>
```

## Credits and license

Made by hacthable. Built with [Scramjet](https://github.com/MercuryWorkshop/scramjet), [Scramjet-App](https://github.com/MercuryWorkshop/Scramjet-App), libcurl-transport, bare-mux and wisp-js by Mercury Workshop, and [Fastify](https://fastify.dev). Fonts: [Unbounded](https://github.com/googlefonts/unbounded) and [Space Grotesk](https://github.com/floriankarsten/space-grotesk), both under the SIL Open Font License.

Dopamine is licensed under AGPL-3.0, the license of Scramjet-App, so its source code must stay public.
