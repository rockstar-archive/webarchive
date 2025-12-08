function drawSwf(play){

document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="100%" height="100%" id="splash_blue" align="middle">');
document.write('<param name="allowScriptAccess" value="always" />');
document.write('<param name="movie" value="splash_bluev8.swf?param='+play+'" /><param name="quality" value="high" /><param name="scale" value="noscale" /><param name="salign" value="t" /><param name="bgcolor" value="#2466AD" /><embed src="splash_bluev8.swf?param='+play+'" quality="high" scale="noscale" salign="t" bgcolor="#2466AD" width="100%" height="100%" name="splash_blue" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
document.write('</object>');
}