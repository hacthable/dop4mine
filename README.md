# Dopamine

A web proxy with a custom homepage, built on [Scramjet-App](https://github.com/MercuryWorkshop/Scramjet-App) by Mercury Workshop. It uses the AGPL-3.0 license, so its source code must stay public.

## Files

- `src/index.js`: the server. It serves the site, the proxy engine files, the `/wisp/` WebSocket and `/api/info`.
- `public/index.html`: the Dopamine homepage.
- `public/engine.js`: connects the homepage to the Scramjet proxy.
- `public/sw.js` and `public/register-sw.js`: the service worker that routes proxied pages.
- `public/404.html`: the "page not found" page.
- `public/bg-video.mp4`: the site background video.

## Run it on your own computer

You need [Node.js](https://nodejs.org) 18 or newer.

```
npm install
npm start
```

Then open http://localhost:8080.

## Put it online with Render (free)

1. Put these files in a public GitHub repository.
2. On https://render.com, choose **New > Web Service** and pick that repository.
3. Use these settings:
   - Runtime: **Node**
   - Build command: `npm install`
   - Start command: `npm start`
   - Instance type: **Free**
4. Click **Create Web Service**. When the log says `Listening on`, open the `onrender.com` address Render gives you.

Every change you commit to GitHub redeploys the site automatically.

## Demo mode

On CodePen, from a file on disk, or at any address ending in `?demo`, the homepage runs without the server. It shows a "Demo mode" notice and does not open sites.
