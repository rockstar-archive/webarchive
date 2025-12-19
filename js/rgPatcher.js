// rockstararchive Loader — universal Flash path fixer (final version)
let flashPatch = true;

// Load Ruffle as long as there's no 'noruffle' in the URL
const url = new URL(window.location.href);

if (!window.location.href.includes("noruffle")) {

    // Resolve ruffle.js relative to THIS script, not the HTML page
    const currentScript = document.currentScript;
    const ruffleURL = new URL("ruffle.js", currentScript.src);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = ruffleURL.href;
    document.head.appendChild(script);

    // Replace old video embeds with downloads
    document.addEventListener('DOMContentLoaded', function () {
        console.log("=== Video Replacer ===");

        // Grab all <embed> elements
        const embeds = document.querySelectorAll('embed');
        console.log("Number of <embed> elements found:", embeds.length);

        embeds.forEach(function (embed, index) {
            const src = embed.getAttribute('src');
            console.log("Embed #" + index + " src:", src);

            // If the src ends with .mov or .wmv (case-insensitive)
            if (src && /\.(mov|wmv)$/i.test(src)) {
                console.log("Embed #" + index + " has recognized video file extension:", src);

                // Create a new anchor link to force a download
                const link = document.createElement('a');
                link.href = src;
                link.download = '';
                link.style.color = '#000000';
                link.style.backgroundColor = '#ffffff';

                link.textContent =
                    'Playback of MOV and WMV videos is not possible in modern browsers, ' +
                    'but can be played in video players such as VLC. Click here to download ' +
                    (src.substring(src.lastIndexOf('/') + 1) || src);

                // Replace the <embed> with the <a> link
                embed.parentNode.replaceChild(link, embed);
            } else {
                console.log("Embed #" + index + " not recognized as .mov or .wmv");
            }
        });
    });
}

// Ruffle configuration
window.RufflePlayer = window.RufflePlayer || {};
window.RufflePlayer.config = {
    // Options affecting the whole page
    publicPath: undefined,
    polyfills: true,

    // Options affecting files only
    autoplay: "on",
    unmuteOverlay: "hidden",
    backgroundColor: null,
    wmode: "window",
    letterbox: "fullscreen",
    warnOnUnsupportedContent: false,
    contextMenu: true,
    showSwfDownload: true,
    upgradeToHttps: window.location.protocol === "https:",
    logLevel: "debug",
    base: null,
    menu: true,
    salign: "",
    scale: "showAll",
    forceScale: false,
    quality: "high",
    splashScreen: false,
};
