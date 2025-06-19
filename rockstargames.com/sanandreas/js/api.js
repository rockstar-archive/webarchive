/* scripts */
//generic scripts
function getObj(obj)
{	
	compLayr = document.getElementById(obj).style
	return compLayr
}

function show(layr)
{	obj = getObj(layr)
	obj.visibility = "visible"
}

function hide(layr)
{	obj = getObj(layr)
	obj.visibility = "hidden"
}

function setTop(layr,num)
{	
	obj = getObj(layr);
	obj.top = num +"px";
}

function setLeft(layr,num)
{	
	obj = getObj(layr);
	obj.left = num +"px";
}

function browserWidth()
{	if (is_nav)
	{	return (window.innerWidth)
	}
	else
	{	return (document.body.clientWidth)
	}
}

function browserHeight()
{	if (is_nav)
	{	return (window.innerHeight)
	}
	else
	{	return (document.documentElement.clientHeight)
	}
}

//set globals
var olPg="info";

var aryLayers=new Array('fl','navs','info', 'news', 'screens', 'movies', 'sound', 'buy','allLogos','rockstarLogo','platforms');
var aryJustNavs=new Array('navs','rockstarLogo','allLogos','platforms');
var aryPgs = new Array("info","news","screens","movies","sound","buy","divScreensContent","divNewsContent","divSoundContent");
var aryNav = new Array("image/nav_text_only.gif",
	"image/nav_info.gif",
	"image/nav_news.gif",
	"image/nav_screens.gif",
	"image/nav_movies.gif",
	"image/nav_sound.gif",
	"image/nav_buy.gif"
);
var aryLNav = new Array("",
	"image/nav_html.gif",
	"image/nav_flash.gif"
);

//toggle scripts
function togNav (newNav,newPg) {
	//swap pages here
	if (newPg!=olPg||newPg=='info') {
	togPgs(newPg,olPg);
	
	var getNewImg=aryNav[newNav];
	var getNewLImg=aryLNav[1];
	
	//swap selected states here for top/left navs
	document.getElementById('dasNav').src = getNewImg;
	document.getElementById('dasLNav').src = getNewLImg;
	}

}

function togBuy (newBuy) {
	if (newBuy!='buyps2') {
	    objBuy=new ConstructObject('buyps2');
	    objBuy.css.visibility='hidden'
	}
	if (newBuy!='buyxbox') {
	    objBuy=new ConstructObject('buyxbox');
	    objBuy.css.visibility='hidden'
	}
	if (newBuy!='buypc') {
	    objBuy=new ConstructObject('buypc');
	    objBuy.css.visibility='hidden'
	}		
    objBuy=new ConstructObject(newBuy);
    objBuy.css.visibility='visible'
//	document.getElementById('buyps2').visibility = "hidden";
}

function togLeft(newLeftNav,newTopNav){
	var getNewImg=aryNav[newTopNav];
	var getNewLImg=aryLNav[newLeftNav];
	
	//swap selected states here for top/left navs
	document.getElementById('dasNav').src = getNewImg;
	document.getElementById('dasLNav').src = getNewLImg;
}


function togPgs(elon, eloff){

	document.getElementById(elon).style.background = 'url("image/bg_'+elon+'.jpg")';
	document.getElementById(elon).style.backgroundRepeat = 'no-repeat';
//	alert("image/bg_"+elon+".jpg");

	// initialize scrollers
	if (elon=='buy') {
		show('buyps2');
	}
	if (elon=='screens') {
		InitialiseScreensScrollableArea();
	}	
	if (elon=='news') {
		InitialiseNewsScrollableArea();
	}	
	if (elon=='sound') {
		InitialiseSoundScrollableArea();
	}	
	
	//swap pages here
	if (olPg=='buy') {
		hide('buyps2');
		hide('buyxbox');
		hide('buypc');				
	}
	//swap pages here
	if (olPg=='screens') {
		hide('divScreensContent');
	}
	if (olPg=='news') {
		hide('divNewsContent');
	}
	if (olPg=='sound') {
		hide('divSoundContent');
	}
	hide(olPg);
	show(elon);
		
	//set selected page
	olPg=elon;
	
	//hide and move flash off screen
	setTop('fl',-3000);
	setLeft('fl',-3000);
	hide('fl');
	
	killLogos();
}

function flOn(){
	//reposition flash
	setTop('fl',65);
	setLeft('fl',194);
	
	//hide all pages
	for(i=0;i<aryPgs.length;i++){
		hide(aryPgs[i]);
	}
	
	//show flash
	show('fl');
	hide('buyps2');
	olPg="fl";
}


//for flash detect
function flOff(){
	//reposition flash
	setTop('fl',-3000);
	setLeft('fl',-3000);
	
	setMeAgain();	
	togNav (1,'info') 
	
	olPg="info";
}

//Mike's function
function killLogos() {
	if (document.all) {
		document.all['allLogos'].style.visibility="hidden";
		document.all['rockstarLogo'].style.visibility="visible";
		document.all['rockstarLogo'].style.left="900px";
	}
	else {
		document.getElementById('allLogos').style.visibility="hidden";
		document.getElementById('rockstarLogo').style.visibility="visible";
		document.getElementById('rockstarLogo').style.left="900px";
	}
}

//Rob's function
function resizeWin(file, newLoc, newWidth, newHeight) {
	newWin = open(file,newLoc,"scrollbars=no,resizable=no,status=no,height=" + newHeight + ",width=" + newWidth);
}

function launchTrailer(file, newLoc, newWidth, newHeight) {
	newWin = open(file,newLoc,"scrollbars=no,resizable=no,status=no,height=" + newHeight + ",width=" + newWidth);
	stopAudio();
}

//Buy now tracker
function load_page(which_shop) { 
	//which_shop = which_form.modules.options[which_form.modules.selectedIndex].value;
	if (which_shop != "") window.open("http://www.take2games.com/rockstar/sanandreas/buy_tracker.php?shop="+which_shop);
}

// macromedia functions noone cares about
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; 
  document.MM_sr=new Array; 
  for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){
   document.MM_sr[j++]=x; 
   if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];
   }
}

function resizeWin(file, newLoc, newWidth, newHeight) {
	newWin = open(file,newLoc,"scrollbars=no,resizable=no,status=no,height=" + newHeight + ",width=" + newWidth);
}

function lib_bwcheck(){ //Browsercheck (needed)
	this.ver=navigator.appVersion
	this.agent=navigator.userAgent
	this.dom=document.getElementById?1:0
	this.opera5=(navigator.userAgent.indexOf("Opera")>-1 && document.getElementById)?1:0
	this.ie5=(this.ver.indexOf("MSIE 5")>-1 && this.dom && !this.opera5)?1:0; 
	this.ie6=(this.ver.indexOf("MSIE 6")>-1 && this.dom && !this.opera5)?1:0;
	this.ie4=(document.all && !this.dom && !this.opera5)?1:0;
	this.ie=this.ie4||this.ie5||this.ie6
	this.mac=this.agent.indexOf("Mac")>-1
	this.ns6=(this.dom && parseInt(this.ver) >= 5) ?1:0; 
	this.ns4=(document.layers && !this.dom)?1:0;
	this.bw=(this.ie6 || this.ie5 || this.ie4 || this.ns4 || this.ns6 || this.opera5)
	return this
}
var bw=lib_bwcheck()

var speed=50 
 
var loop, timer 
 
function ConstructObject(obj,nest){ 
    nest=(!nest) ? '':'document.'+nest+'.' 
    this.el=bw.dom?document.getElementById(obj):bw.ie4?document.all[obj]:bw.ns4?eval(nest+'document.'+obj):0; 
    this.css=bw.dom?document.getElementById(obj).style:bw.ie4?document.all[obj].style:bw.ns4?eval(nest+'document.'+obj):0; 
    this.scrollHeight=bw.ns4?this.css.document.height:this.el.offsetHeight 
    this.clipHeight=bw.ns4?this.css.clip.height:this.el.offsetHeight 
    this.up=MoveAreaUp;this.down=MoveAreaDown; 
    this.MoveArea=MoveArea; this.x; this.y; 
    this.obj = obj + "Object" 
    eval(this.obj + "=this") 
    return this 
} 
function MoveArea(x,y){ 
    this.x=x;this.y=y 
    this.css.left=this.x 
    this.css.top=this.y 
} 
function MoveAreaDown(move){ 
	if(this.y>-this.scrollHeight+objContainer.clipHeight){ 
    this.MoveArea(0,this.y-move) 
    if(loop) setTimeout(this.obj+".down("+move+")",speed) 
	} 
}
function MoveAreaUp(move){ 
	if(this.y<0){ 
    this.MoveArea(0,this.y-move) 
    if(loop) setTimeout(this.obj+".up("+move+")",speed) 
	} 
} 
function PerformScroll(speed){ 
//	if(buyinitialised){ 
		loop=true; 
		if(speed>0) objScroller.down(speed) 
		else objScroller.up(speed) 
//	} 
} 
function CeaseScroll(){ 
    loop=false 
    if(timer) clearTimeout(timer) 
} 
var soundinitialised; 
function InitialiseSoundScrollableArea(){ 
    objContainer=new ConstructObject('divSoundContainer') 
    objScroller=new ConstructObject('divSoundContent','divSoundContainer') 
    objScroller.MoveArea(0,0) 
    objContainer.css.visibility='visible'
    objScroller.css.visibility='visible'
    buyinitialised=true; 
} 
var buyinitialised; 
function InitialiseBuyScrollableArea(){ 
    objContainer=new ConstructObject('divBuyContainer') 
    objScroller=new ConstructObject('divBuyContent','divBuyContainer') 
    objScroller.MoveArea(0,0) 
    objContainer.css.visibility='visible'
    objScroller.css.visibility='visible'
    soundinitialised=true; 
} 
var screensinitialised; 
function InitialiseScreensScrollableArea(){ 
    objContainer=new ConstructObject('divScreensContainer') 
    objScroller=new ConstructObject('divScreensContent','divScreensContainer') 
    objScroller.MoveArea(0,0) 
    objContainer.css.visibility='visible'
    objScroller.css.visibility='visible'
    screensinitialised=true; 
} 
var newsinitialised; 
function InitialiseNewsScrollableArea(){ 
    objContainer=new ConstructObject('divNewsContainer') 
    objScroller=new ConstructObject('divNewsContent','divNewsContainer') 
    objScroller.MoveArea(0,0) 
    objContainer.css.visibility='visible'
    objScroller.css.visibility='visible'
    newsinitialised=true; 
} 

function stopAudio() {
	// Javascript Flash methods 
	// Stop Sound
	window.document.samain.TGotoLabel("/musicController","hold"); 
	// Move Button Frame to Off
//	window.document.samain.stopMusic();
}

function startAudio() {
	// Javascript Flash methods 
	// Stop Sound
	window.document.samain.TGotoLabel("/musicController","musicOff"); 
	// Move Button Frame to Off
//	window.document.samain.stopMusic();
}

MM_preloadImages('screens/screen01_thumb.jpg','screens/screen02_thumb.jpg','screens/screen03_thumb.jpg','screens/screen04_thumb.jpg','screens/screen05_thumb.jpg','screens/screen06_thumb.jpg','screens/screen07_thumb.jpg','screens/screen08_thumb.jpg','screens/screen09_thumb.jpg','screens/screen10_thumb.jpg','screens/screen11_thumb.jpg','screens/screen12_thumb.jpg','screens/screen13_thumb.jpg','screens/screen14_thumb.jpg','screens/screen15_thumb.jpg','screens/screen16_thumb.jpg','screens/screen17_thumb.jpg','screens/screen18_thumb.jpg','screens/screen19_thumb.jpg','image/nav_text_only.gif','image/nav_info.gif','image/nav_news.gif','image/nav_screens.gif','image/nav_movies.gif','image/nav_sound.gif','image/nav_buy.gif','image/bg_info.jpg','image/bg_news.jpg','image/bg_screens.jpg','image/bg_movies.jpg','image/bg_sound.jpg','image/bg_buy.jpg','image/gtasa_fob.jpg','image/buy_preordertitle.gif','image/buy_ebgames.gif','image/buy_gamestop.gif','image/buy_circuitcity.gif','image/buy_amazon.gif','image/buy_bestbuy.gif','image/buy_amazonuk.gif','image/buy_gamestationuk.gif','image/buy_amazonde.gif','image/buy_ebgamesde.gif','image/buy_alapagefr.gif','image/buy_fnacfr.gif','image/buy_gameswizardsau.gif','image/buy_gpstore.gif','image/buy_dvdzonebe.gif','image/buy_freerecordshopnl.gif','image/logo_rstar_north.jpg','image/logo_ps.jpg','image/logo_ps2.jpg','image/M.gif','image/legal.jpg','image/logo_rockstar.jpg','image/buy_bottom.gif','image/screen_bottom.gif','image/info_title.gif','image/bottom.gif','image/news_title.gif','image/news_bottom.gif','image/info_title.gif','image/screenshots_title.gif','image/screen_bottom.gif','image/buynow_title.gif','image/scroll_up.jpg','image/scroll_down.jpg','image/nav_flash.gif','image/sa_logo.gif');
MM_preloadImages('image/bg_info.jpg','image/bg_news.jpg','image/bg_news.jpg','image/bg_screens.jpg','image/bg_movies.jpg','image/bg_soundtrack.jpg','image/bg_buy.jpg');

MM_preloadImages('image/FOB_ps2.jpg','image/FOB_pc.jpg','image/FOB_xbox.jpg','image/buynow_ps2_off.gif','image/buynow_xbox_off.gif','image/buynow_pc_off.gif','image/buynow_ps2_on.gif','image/buynow_xbox_on.gif','image/buynow_pc_on.gif','image/pc_shard.gif','image/xbox_shard.gif','instores_shard.gif');