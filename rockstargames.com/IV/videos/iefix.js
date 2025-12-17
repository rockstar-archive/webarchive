var playURL = window.location.href;
var queryString = playURL.split("?")[1];
var params;

if(queryString){
	params = queryString.split("video=")[1];
}else{
	params = "none";
}
if(!params){
	params = "none";
}
params = encodeHTML(params);

function reg(){
	var url = params;
	if(url.match(/(^www\.rockstargames\.com|^rockstargames.com)(?:$|\/).*/g)) {
		return url;
	} else {
		return;
	}
}

function highDef(){
	if(params.substring(0,4) == "tray"){
		document.write('<embed src="../../'+reg()+'" width="1280" height="772" hspace="0" vspace="0" border="0"></embed>');
	}else{
		document.write('<embed src="http://'+reg()+'" width="1280" height="772" hspace="0" vspace="0" border="0"></embed>');
	}
}
function wmv(){
	if(params.substring(0,4) == "tray"){
		document.write('<embed src="../../'+reg()+'" width="640" height="405" hspace="0" vspace="0" border="0"></embed>');
	}else{
		document.write('<embed src="http://'+reg()+'" width="640" height="405" hspace="0" vspace="0" border="0"></embed>');
	}

}
function mov(){
	if(params.substring(0,4) == "tray"){
		document.write('<embed src="../'+reg()+'" width="640" height="373" hspace="0" vspace="0" border="0"></embed>');
	}else{
		document.write('<embed src="http://'+reg()+'" width="640" height="373" hspace="0" vspace="0" border="0"></embed>');
	}
}