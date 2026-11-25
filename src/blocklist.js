// Sites Dopamine refuses to open. Each entry is checked against the site's hostname
// (for example "www.example.com"), for the page itself and for everything it loads.
//
// This list is a second layer. The first layer is Cloudflare's family DNS (1.1.1.3),
// set in src/index.js, which already blocks known adult and malware sites by the millions.
// Add a line here to block a site the DNS filter misses, e.g.  /(^|\.)badsite\.com$/i,

export const blocklist = [
	// adult content
	/porn|xxx|xvideos|xnxx|xhamster|hentai|redtube|youporn|brazzers|chaturbate|onlyfans|fansly|rule34|nsfw|stripchat|camsoda|bongacams|livejasmin|spankbang|eporner|motherless|nhentai|e-hentai/i,
	/(^|\.)(erome|hanime|fapello|thothub)\./i,

	// pirated movies, shows, games and software, and torrent sites
	/(^|\.)(thepiratebay|piratebay|1337x|1377x|rarbg|yts|yify|nyaa|torrentgalaxy|limetorrents|kickass|katcr|eztv|torlock|zooqle|rutracker|fitgirl-repacks|igg-games|steamunlocked|getintopc|fmovies|123movies|gomovies|putlocker|solarmovie|soap2day|lookmovie|sflix|primewire|hianime|aniwatch|9anime|gogoanime|zoro|z-lib|zlibrary|libgen|annas-archive)\./i,
	/torrent/i,

	// dark web gateways
	/\.onion$|tor2web|onion\.(ly|ws|pet|city|cab|link|to|sh)$/i,

	// online gambling and betting
	/casino|gambl|poker|sportsbook|roobet|bet365|draftkings|fanduel|bovada|betway|1xbet|(^|\.)stake\.(com|us)$/i,
];

export function isBlocked(hostname) {
	hostname = String(hostname || "").toLowerCase();
	return blocklist.some((re) => re.test(hostname));
}
