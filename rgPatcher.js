// therockstararchive Loader (universal version)

// Detect current HTML base path dynamically
(function() {
    const pageURL = new URL(window.location.href);
    // Strip filename (like index.html) and trailing slash to get clean directory
    const basePath = pageURL.href.substring(0, pageURL.href.lastIndexOf('/') + 1);
    console.log("Detected base path for SWFs:", basePath);

    // Load Ruffle if not disabled
    if (!window.location.href.includes("noruffle")) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", "https://unpkg.com/@ruffle-rs/ruffle");
        document.head.appendChild(script);
    }

    document.addEventListener('DOMContentLoaded', function() {

        // Replace old video embeds with download links (MOV/WMV)
        var embeds = document.querySelectorAll('embed');
        embeds.forEach(function(embed) {
            var src = embed.getAttribute('src');

            if (src && /\.(mov|wmv)$/i.test(src)) {
                var link = document.createElement('a');
                link.href = src;
                link.download = '';
                link.style.color = '#000000';
                link.style.backgroundColor = '#ffffff';
                link.textContent = 'Sadly, playback of MOV and WMV videos is not possible anymore in modern browsers, but files can be downloaded. Click here to download ' + (src.substring(src.lastIndexOf('/') + 1) || src);
                embed.parentNode.replaceChild(link, embed);
            }
        });

        // --- Universal SWF Fix ---
        // Adjusts any <embed> or <object> with .swf that uses a relative path
        function fixSWFPaths() {
            // Fix <embed> SWFs
            document.querySelectorAll('embed').forEach(function(embed) {
                let src = embed.getAttribute('src');
                if (src && /\.swf$/i.test(src) && !/^(https?:)?\/\//i.test(src)) {
                    // Build correct URL relative to the HTML file’s directory
                    const newSrc = new URL(src, basePath).href;
                    embed.setAttribute('src', newSrc);
                    console.log("Fixed SWF embed path:", newSrc);
                }
            });

            // Fix <object> SWFs
            document.querySelectorAll('object').forEach(function(obj) {
                let data = obj.getAttribute('data');
                if (data && /\.swf$/i.test(data) && !/^(https?:)?\/\//i.test(data)) {
                    const newData = new URL(data, basePath).href;
                    obj.setAttribute('data', newData);
                    console.log("Fixed SWF object path:", newData);
                }
            });
        }

        fixSWFPaths();
    });

    // Ruffle Config
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
})();
