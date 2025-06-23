//therockstararchive Loader

//Load Ruffle as long as there's no 'noruffle' in the URL
url = new URL(window.location.href);
if (!window.location.href.includes("noruffle")) {
	var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", "https://unpkg.com/@ruffle-rs/ruffle");
    document.head.appendChild(script);
	
	//Replace old video embeds with downloads
    document.addEventListener('DOMContentLoaded', function() {
    
      // Grab all <embed> elements
      var embeds = document.querySelectorAll('embed');
    
      embeds.forEach(function(embed, index) {
        // Print the 'src' attribute for debugging
        var src = embed.getAttribute('src');
   

        // If the src ends with .mov or .wmv (case-insensitive)
        if (src && /\.(mov|wmv)$/i.test(src)) {
        

          // Create a new anchor link to force a download
          var link = document.createElement('a');
          link.href = src;
          link.download = '';
		  link.style.color = '#000000';
		  link.style.backgroundColor = '#ffffff';
          // This sets the link text to something like "Download Max2-GamePlay-Clip11_ps2.mov"
          link.textContent = 'Sadly, playback of MOV and WMV videos is not possible anymore in modern browsers, but files can be downloaded. Click here to download ' + (src.substring(src.lastIndexOf('/') + 1) || src);

          // Replace the <embed> with the <a> link
          embed.parentNode.replaceChild(link, embed);
        } 
      });
    });
	
}

window.RufflePlayer = window.RufflePlayer || {};
window.RufflePlayer.config = {
    // Options affecting the whole page
    "publicPath": undefined,
    "polyfills": true,

    // Options affecting files only
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
