// therockstararchive Loader — fully fixed for GTA LCS SWFs
(function() {
    // Folder where all BradyGames SWFs live
    const SWF_BASE = '/webarchive/bradygames.com/content/downloads/connected/gtalcs/swf/';

    // Set up Ruffle configuration BEFORE it loads
    window.RufflePlayer = window.RufflePlayer || {};
    window.RufflePlayer.config = {
        base: SWF_BASE,               // Crucial: ensures internal SWF references load from the correct folder
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
        scale: "showAll",
        quality: "high",
        splashScreen: false
    };

    // Normalize SWF paths in HTML
    function resolveSWFPath(original) {
        if (!original) return original;
        // Absolute URLs: leave them alone
        if (/^(https?:)?\/\//i.test(original)) return original;
        // Any local SWF: map to SWF_BASE folder
        if (/\.swf$/i.test(original)) {
            const fileName = original.replace(/^.*[\\/]/, ''); // get only the file name
            return SWF_BASE + fileName;
        }
        return original;
    }

    function fixAllSWFPaths() {
        // Fix <embed src="...">
        document.querySelectorAll('embed').forEach(embed => {
            const src = embed.getAttribute('src');
            if (src && /\.swf$/i.test(src)) {
                const fixed = resolveSWFPath(src);
                if (fixed !== src) {
                    embed.setAttribute('src', fixed);
                    console.log("Fixed <embed> src:", fixed);
                }
            }
        });

        // Fix <object data="..."> and <param name="movie">
        document.querySelectorAll('object').forEach(obj => {
            const data = obj.getAttribute('data');
            if (data && /\.swf$/i.test(data)) {
                const fixed = resolveSWFPath(data);
                if (fixed !== data) {
                    obj.setAttribute('data', fixed);
                    console.log("Fixed <object> data:", fixed);
                }
            }

            obj.querySelectorAll('param[name]').forEach(param => {
                if (param.getAttribute('name').toLowerCase() === 'movie') {
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
                    'Playback of MOV/WMV is not supported; click here to download ' +
                    (src.substring(src.lastIndexOf('/') + 1) || src);
                embed.parentNode.replaceChild(link, embed);
            }
        });
    }

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
