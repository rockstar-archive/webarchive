

function randomTinyText() {
    const phraseArray = [
        "Making The Private Public",
        "Dock and Dock Again",
        "PORTRAY THE LIFE YOU WANT Online",
        "Create Friends Today",
        "Inflate Yourself Online",
        "Excel Online",
        "Excite Your Life Online",
        "Amplify your personality",
        "putting your personal life in the public domain",
        "where your personal information becomes a marketing profile (that we can sell)",
        "make friends with strangers",
        "social self respect"
    ];

    var i = Math.floor(Math.random() * (0 - phraseArray.length)) + phraseArray.length;

    return phraseArray[i];

}

function getAdLink(index) {
    const phraseArray = [
        "../profile/elitas_travel.html",
        "../profile/herr_kutz.html",
        "../profile/inkinc.html",
        "../profile/legendary_motorsport.html",
        "../profile/los_santos_customs.html",
        "../profile/redwood_cigarettes.html",
        "../profile/sprunk.html",
        "../profile/warstock_cache_n_carry.html"
    ];

    return phraseArray[index];
}
function getAdText(index) {
    const phraseArray = [
        "Elitas Travel",
        "Herr Kutz",
        "Ink Inc.",
        "Legendary Motorsport",
        "Los Santos Customs",
        "Redwood Cigarettes",
        "Sprunk",
        "Warstock Cache & Carry"
    ];

    return phraseArray[index];
}
function getDescText(index) {
    const phraseArray = [
        "10% off your next purchase.",
        "First haircut free.",
        "First tattoo free.",
        "10% discount on your first website purchase.",
        "Get a free spray paint job.",
        "10% discount on your first hospital visit",
        "Get a free can from any participating vending machine! ",
        "10% off your first purchase."
    ];

    return phraseArray[index];
}
function getStalkText(index) {
    const phraseArray = [
        "1811265 are stalking Elitas Travel",
        "1528629 are stalking Herr Kutz Barber",
        "1576007 are stalking Ink Inc.",
        "2271521 are stalking Legendary Motorsport",
        "2178062 are stalking Los Santos Customs",
        "1357089 are stalking Redwood Cigarettes",
        "1528688 are stalking Sprunk",
        "2022210 are stalking Warstock Cache & Carry"
    ];

    return phraseArray[index];
}
function getAdImg(index) {
    const phraseArray = [
        "../page/ads/elitas.jpg",
        "../page/ads/herr_kutz.png",
        "../page/ads/inkinc.png",
        "../page/ads/lmotorsport.jpg",
        "../page/ads/lsc.png",
        "../page/ads/redwood.png",
        "../page/ads/sprunk.png",
        "../page/ads/warstock.png"
    ];

    return phraseArray[index];
}
function randomPage() {
    const linkArray = [
        "profile/elitas_travel.html",
        "profile/herr_kutz.html",
        "profile/inkinc.html",
        "profile/jackhowitzer.html",
        "profile/karlkelly.html",
        "profile/legendary_motorsport.html",
        "profile/los_santos_customs.html",
        "profile/redwood_cigarettes.html",
        "profile/sprunk.html",
        "profile/warstock_cache_n_carry.html",
        "profile/alanmcclean.html",
        "profile/duaneearl.html",
        "profile/drray.html"
    ]

    var i = Math.floor(Math.random() * (0 - linkArray.length)) + linkArray.length;
    window.location.href = linkArray[i];
}
function changeBackgroundImage() {
    const bgArray = [
        "page/custom/backgrounds/bg1.png",
        "page/custom/backgrounds/bg2.png",
        "page/custom/backgrounds/bg3.png"
    ]
    var i = Math.floor(Math.random() * (0 - bgArray.length)) + bgArray.length;
    let headingID = document.getElementById("GFG");
    headingID.style.backgroundImage = bgArray[i];
}
function changeMainBg() {
    const bgArray = [
        "page/custom/backgrounds/bg1.png",
        "page/custom/backgrounds/bg2.png",
        "page/custom/backgrounds/bg3.png",
        "page/custom/backgrounds/bg4.png"
    ]
    var i = Math.floor(Math.random() * (0 - bgArray.length)) + bgArray.length;
    let headingID = document.getElementsByTagName('body')[0];
    document.body.style.backgroundImage = "url('" + bgArray[i] + "')";
}

function analizePosts() {
    if (localStorage.getItem('currUsername') + "" === "null") {
        var socialBoxes = document.getElementsByName("socialBoxDiv");
        console.log("user not loged in, " + socialBoxes.length + " posts");

        for (let i = socialBoxes.length - 1; i > -1; i--) {

            console.log("page thinged " + i);
            socialBoxes[i].parentNode.removeChild(socialBoxes[i]);

        }


    } else {
        var commentPfps = document.getElementsByName("commentPfp");
        console.log("user loged in, " + commentPfps.length + " posts");

        for (let i = commentPfps.length - 1; i > -1; i--) {

            console.log("page thinged " + i);
            commentPfps[i].src = "../" + localStorage.getItem('curPfp');

        }

    }
}
function stalk(stringer) {
    if (localStorage.getItem(stringer) + "" == "true") {
        localStorage.setItem(stringer, "null");
    } else {
        localStorage.setItem(stringer, "true");
    }



}
function deleteAllCookies() {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}

function getNumberOfDaysSinceUpload(uplDate) {

    let uploadDate = new Date(uplDate);
    let currDate = new Date();


    let Difference_In_Time =
        currDate.getTime() - uploadDate.getTime();


    let Difference_In_Days =
        Math.round
            (Difference_In_Time / (1000 * 3600 * 24));




    return Difference_In_Days + " days ago";
}
