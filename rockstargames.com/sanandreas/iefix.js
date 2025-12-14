// effin flash fix ie stinks like ish
oTag='';
oTag='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="800" height="600" id="SA_main" align="middle">';
oTag+='<param name="allowScriptAccess" value="sameDomain">';
oTag+='<param name="movie" value="sa_main.swf?bypass=' + bypass + '">';
oTag+='<param name="quality" value="high">';
oTag+='<param name="bgcolor" value="#000000">';
oTag+='<embed src="sa_main.swf?bypass=' + bypass + '" quality="high" bgcolor="#000000" width="800" height="600" name="SA_main" align="middle" swLiveConnect="true" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer">';
oTag+='</object>';

document.write(oTag);