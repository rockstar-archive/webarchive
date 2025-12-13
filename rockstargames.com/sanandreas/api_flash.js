var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

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
}

//window.onload=dasinit;

}
/*
     FILE ARCHIVED ON 08:26:24 Oct 19, 2004 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:01:23 Nov 30, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  RedisCDXSource: 14.496
  PetaboxLoader3.datanode: 474.225 (4)
  LoadShardBlock: 913.184 (3)
  captures_list: 977.171
  esindex: 0.016
  load_resource: 456.304
  exclusion.robots.policy: 0.178
  PetaboxLoader3.resolve: 281.844
  CDXLines.iter: 37.384 (3)
  exclusion.robots: 0.192
*/