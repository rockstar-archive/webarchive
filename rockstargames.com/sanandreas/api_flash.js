var dom1  = (is_nav6up || is_ie5up)

if (is_mac && is_ie5)
{	dom1 = false
}


/* manage flash below */
var checkme;
var dasWidth;
var dasHeight;

function dasinit(){
	checkme = browserWidth();
	//if (nscp4)
	//{	//window.captureEvents(Event.RESIZE)
	window.onresize = centerMe;
	//}
	
	centerMe();
	
	//fix for mac/ie bug
	if (is_mac && is_ie)
	{	
		self.resizeBy(1, 1);
		centerMe();
	}
}


function newInit(){
	if(is_Flash7up < 1){
		//alert('no flash sucka');
		flOff();
	}
}

// reload page if netscape to avoid styles crapping out
function handleResize()
{	
	if (checkme != browserWidth())
	{	
	//location.replace(location.href);
	location.reload();
	
	//setTimeout('location.href = location.href;',2000)
	//location.href = location.href;
	}
	return false
}

function centerMe(){
	//choose right script
	if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    dasWidth = window.innerWidth;
    dasHeight = window.innerHeight;
  } else if( document.documentElement &&
      ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    dasWidth = document.documentElement.clientWidth;
    dasHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    dasWidth = document.body.clientWidth;
    dasHeight = document.body.clientHeight;
  }

	//for index page
	var indWidth=dasWidth-450;
	var indHeight=dasHeight-378;
		
	var indLeft;
	var indTop;
	
	if(dasWidth<450){indLeft = 0;}
	else{indLeft = Math.round(indWidth/2);}
	
	if(dasHeight<370){indTop = 0;}
	else{indTop = Math.round(indHeight/2);}
	
	//set vid
	setTop('flyr',indTop);
	setLeft('flyr',indLeft);
	show('flyr');
}

function setMe(){
	alert('This script shouldnt be called. If you see this alert, check your actionscript for calls to "setMe()"');
	//setTop('flyr','65');
	//setLeft('flyr','194');
}

//script to turn on navs and logos once character anims are done
function setMeAgain(){	
	//show all relevant layers	
	for (s=0; s<aryJustNavs.length; s++)
	{	
		show(aryJustNavs[s]);
	}
	

	if (window.location) {

		var parseURL = new ParseURL();
		parseURL.parseURLString(window.location.search);
		var parseURLArray = parseURL.getParameterArray();
		var parseURLArrayLength = parseURL.getParameterArrayCount();
		if ((parseURLArrayLength > 0) && (parseURLArray[0][0] == "page"))
		{
			thisPage =  parseURLArray[0][1];
			if (thisPage=="info") togNav('1',thisPage);
			if (thisPage=="news") togNav('2',thisPage);
			if (thisPage=="screens") togNav('3',thisPage);
			if (thisPage=="movies") togNav('4',thisPage);
			if (thisPage=="sound") {
				togNav('5',thisPage);		
				if ((parseURLArrayLength > 0) && (parseURLArray[1][0] == "player")) {
					if (parseURLArray[1][1]=="true") {
						resizeWin('soundtrack/player2.htm','player','646','487');
					}
				}				
			}
			if (thisPage=="buy") togNav('6',thisPage);															

		}
		//alert(parseURLArray[1][1]);

	}
}

//window.onload=dasinit;
