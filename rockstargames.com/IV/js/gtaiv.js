function resizeWin(file, newLoc, newWidth, newHeight) {
	var browserName = navigator.appName; 
	if (browserName == "Microsoft Internet Explorer"){
		var winHeight = parseInt(newHeight)+4;
		var winWidth = parseInt(newWidth)+22;
		newWin = open(file,newLoc,"scrollbars=yes,resizable=no,status=no,height=" + winHeight + ",width=" + winWidth);
	}else{
		newWin = open(file,newLoc,"scrollbars=yes,resizable=no,status=no,height=" + newHeight + ",width=" + newWidth);
	}	
	
}



function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

/*
function resizeWin(url,newLoc,width,height) { 
	features= "width=" + width + ",height=" + height; 
	newWin = window.open ('', 'gtaiv', features); 
	pageCode = "<html><head><title>Rockstar Games: Grand Theft Auto IV</title><style type='text/css'>body {margin:0; padding:0; border:0;}</style></head>"; 
	pageCode += "<body bgcolor='#000000' topmargin='1' leftmargin='1' marginwidth='0' marginheight='0'><img src='" + url + "' width='" + width + "' height='" + height + "'></body></html>"; 
	newWin.document.write(pageCode); 
	newWin.document.close(); 
}
*/