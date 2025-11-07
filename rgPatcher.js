// therockstararchive Loader (universal SWF path–aware version)

(function() {
    const pageURL = new URL(window.location.href);
    const basePath = pageURL.href.substring(0, pageURL.href.lastIndexOf('/') + 1);
    console.log("Detected HTML base path:", basePath);

    // Ruffle configuration must exist before it loads
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

    // Function to fix SWF paths before Ruffle loads
    function fixSWFPaths() {
        document.querySelectorAll('embed, object').forEach(el => {
            let attr = el.tagName.toLowerCase() === 'object' ? 'data' : 'src';
            let value = el.getAttribute(attr);
            if (value && /\.swf$/i.test(value) && !/^(https?:)?\/\//i.test(value)) {
                const fixed = new URL(value.replace(/^\//, ''), basePath).href;
                el.setAttribute(attr, fixed);
                console.log(`Rewrote ${attr} → ${fixed}`);
            }
        });
    }

    // Replace MOV/WMV embeds with download links
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

    // Wait for DOM, fix embeds, then load Ruffle
    document.addEventListener('DOMContentLoaded', function() {
        patchOldVideoEmbeds();
        fixSWFPaths();

        // Load Ruffle only AFTER SWF paths are fixed
        if (!window.location.href.includes("noruffle")) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://unpkg.com/@ruffle-rs/ruffle";
            document.head.appendChild(script);
        }
    });
})();
