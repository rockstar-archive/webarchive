
	// var flashDetection = new FlashDetection();
	
	// if (!flashDetection.isMinimumVersion(7)) {
	// 	document.write('<body bgcolor=#ffffff text=#000000 link=#46576B alink=#000000 vlink=#46576B leftmargin=0 topmargin=0 marginwidth=0 marginheight=0>\n');
	// 	document.write('<CENTER>\n<TABLE BORDER=0 CELLPADDING=10 WIDTH=480 CELLSPACING=0><TR><td valign="top"><img src="images/html_lcs_logo.gif" width="125" height="100" alt="" /></td><TD VALIGN=TOP ALIGN=LEFT><FONT SIZE=1 FACE="TAHOMA,ARIAL,GENEVA">Viewing this site requires the Flash 7 plugin. Which we haven\'t detected on your system.<P>\n');
	// 	document.write('<LI>I want to <A HREF="http://www.macromedia.com/go/getflashplayer" TARGET="_blank">click here to download Flash 7</A>, so i can enjoy the full Grand Theft Auto: Liberty City Stories site as it was meant to be experienced.\n');
	// 	document.write('<LI>I dont want Flash or I\'m using a PSP� (PlayStation�Portable) web browser.  I\'d rather <A HREF="noflash/" TARGET="_top">click here</A> and visit the HTML mini-site designed for the PSP web browser.\n</OL>\n');		
	// 	document.write('</TD></TR></TABLE>\n');
	// 	document.write('</CENTER>\n');
	// 	document.write('</body>\n</html>\n');
	// }
	// else {
document.write('<body bgcolor="#000000">');
document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'); document.write('codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/SWFlash.cab#version=7,0,0,0"');
document.write(' WIDTH="100%" HEIGHT="100%" id="stage" ALIGN="top">');
document.write('<PARAM NAME=movie VALUE="gta_lcs_fbf.swf">');
document.write('<PARAM NAME=menu VALUE=false>');
document.write('<PARAM NAME=quality VALUE=high>');
document.write('<PARAM NAME=salign VALUE=T>');
document.write('<PARAM NAME=bgcolor VALUE=#000000>');
document.write('<EMBED src="gta_lcs_fbf.swf" menu=false quality=high salign=T bgcolor=#000000  WIDTH="100%" HEIGHT="100%" NAME="stage" ALIGN="top"'); document.write('TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer">');
document.write('</EMBED>');
document.write('</OBJECT>');
document.write('</body>');
document.write('</html>');
	// }