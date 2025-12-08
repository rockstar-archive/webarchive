// rockstararchive Loader — universal Flash path fixer (final version)
let flashPatch = true;
(function() {
    const pageURL = new URL(window.location.href);
    const basePath = pageURL.href.substring(0, pageURL.href.lastIndexOf('/') + 1);
    console.log("Detected HTML base path:", basePath);

    // Set up Ruffle configuration before it loads
    window.RufflePlayer = window.RufflePlayer || {};
    window.RufflePlayer.config = {
        "publicPath": undefined,
        "polyfills": true,
        "autoplay": "on",
        "unmuteOverlay": "hidden",
        "backgroundColor": null,
        "wmode": "window",
        "letterbox": "fullscreen",
        "warnOnUnsupportedContent": false,
        "contextMenu": true,
        "showSwfDownload": true,
        "upgradeToHttps": window.location.protocol === "https:",
        "logLevel": "debug",
        "base": null,
        "menu": true,
        "salign": "",
        "scale": "showAll",
        "forceScale": false,
        "quality": "high",
        "splashScreen": false,
    };

    // Normalize a SWF path so /front/front.swf → basePath + front/front.swf
    function resolveSWFPath(original) {
        if (!original) return original;
        // If it’s already absolute (http/https), leave it alone
        if (/^(https?:)?\/\//i.test(original)) return original;

        // Remove any leading slash so we treat it as relative to HTML folder
        let relative = original.replace(/^\/+/, '');
        const resolved = new URL(relative, basePath).href;
        return resolved;
    }

    function fixAllSWFPaths() {
        // --- Handle <embed src="..."> ---
        document.querySelectorAll('embed').forEach(embed => {
            let src = embed.getAttribute('src');
            if (src && /\.swf$/i.test(src)) {
                const fixed = resolveSWFPath(src);
                if (fixed !== src) {
                    embed.setAttribute('src', fixed);
                    console.log("Fixed <embed> src:", fixed);
                }
            }
        });

        // --- Handle <object data="..."> (not used here but just in case) ---
        document.querySelectorAll('object').forEach(obj => {
            let data = obj.getAttribute('data');
            if (data && /\.swf$/i.test(data)) {
                const fixed = resolveSWFPath(data);
                if (fixed !== data) {
                    obj.setAttribute('data', fixed);
                    console.log("Fixed <object> data:", fixed);
                }
            }

            // --- Handle <param name="movie" value="..."> ---
            obj.querySelectorAll('param[name]').forEach(param => {
                const name = param.getAttribute('name').toLowerCase();
                if (name === 'movie') {
                    const val = param.getAttribute('value');
                    if (val && /\.swf$/i.test(val)) {
                        const fixed = resolveSWFPath(val);
                        if (fixed !== val) {
                            param.setAttribute('value', fixed);
                            console.log("Fixed <param name='movie'>:", fixed);
                        }
                    }
                }
            });
        });
    }

    function patchOldVideoEmbeds() {
        document.querySelectorAll('embed').forEach(embed => {
            const src = embed.getAttribute('src');
            if (src && /\.(mov|wmv)$/i.test(src)) {
                const link = document.createElement('a');
                link.href = src;
                link.download = '';
                link.style.color = '#000';
                link.style.backgroundColor = '#fff';
                link.textContent =
                    'Sadly, playback of MOV and WMV videos is not possible anymore in modern browsers, but files can be downloaded. Click here to download ' +
                    (src.substring(src.lastIndexOf('/') + 1) || src);
                embed.parentNode.replaceChild(link, embed);
            }
        });
    }

    // Run fixes before loading Ruffle
    document.addEventListener('DOMContentLoaded', function() {
        patchOldVideoEmbeds();
        fixAllSWFPaths();

        if (!window.location.href.includes("noruffle")) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://unpkg.com/@ruffle-rs/ruffle";
            document.head.appendChild(script);
        }
    });
})();
