

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Title
//		Macromedia Flash Detection Code
// Version
//		v1.06
// Author
//		Daniel Rainbird (DRainbird@email.com)
// History
//		v1.06 (13 December 2000)
//		- fixed a bug in the vbscript code for getting the
//		  major & minor version. Now uses javascript
//		- gets major and minor version under Netscape
//		v1.05 (05 December 2000)
//		- uses a more thorough version detection routine (using VBScript)
//		  for Flash ActiveX objects v3.0+ (gets Major and Minor version)
//		v1.04 (01 December 2000)
//		- rewrote the detection code for mimeTypes and Plugins collections
//		- updated the WebTV flash version to v3.0
//		v1.03 (07 November 2000)
//		- merged the javascript & vbscript into one library
//		- rewrote the detection code as object-oriented functions
//		v1.02 (19 July 2000)
//		- added isFlashVersionInstalled function
//		- added isFlashVersionOrLaterInstalled function
//		v1.01 (15 July 2000)
//		- only use VBScript where supported
//		- added support for WebTV browsers
//		- NS6 Preview 1 supported
//		v1.00 (21 June 2000)
//		- initial construction
///////////////////////////////////////////////////////////////////////////////////////////////////////

var DEBUG_MODE = false;

function FlashDetection()
{
	if (!FlashDetection.prototype)
	{
		return;
	}

	this.foundVersion = 0;
	this.usedVBScriptDetection = false;

	FlashDetection_CreateFunctions();

	var _isIE4 = false;
	var _isWin32 = (navigator.platform.toLowerCase().indexOf("win32") >= 0) ? true : false;
	if (navigator.userAgent.toLowerCase().indexOf("opera") < 0)
	{
		_isIE4 = (document.all) ? true : false;
	}

	// use VBScript (if available)
	if ((_isIE4) && (_isWin32))
	{
		this.usedVBScriptDetection = true;
		if (DEBUG_MODE) alert('DEBUG: Using VBScript Detection');
		this.detectVBS();
	}
	else
	{
		if (DEBUG_MODE) alert('DEBUG: Using JavaScript Detection');
		this.detectJS();
	}
}

function FlashDetection_CreateFunctions()
{
	FlashDetection.prototype.isVersion = _isVersion;
	FlashDetection.prototype.isMinimumVersion = _isMinimumVersion;
	FlashDetection.prototype.detectJS = _detectJS;
	FlashDetection.prototype.detectVBS = _detectVBS;

	function _isVersion(requiredVersion)
	{
		return (this.foundVersion == requiredVersion);
	}

	function _isMinimumVersion(requiredVersion)
	{
		return (this.foundVersion >= requiredVersion)
	}

	function _detectJS()
	{
		// for 'plugins' collection
		if (navigator.plugins)
		{
			if (DEBUG_MODE) alert('DEBUG: Parsing Plugins Collection');
			for (var i = 0; i < navigator.plugins.length; i++)
			{
				if ((navigator.plugins[i].name) && (navigator.plugins[i].name.indexOf("Shockwave Flash") == 0))
				{
					var stringVersion = navigator.plugins[i].description.substring(navigator.plugins[i].description.indexOf(".") - 1, navigator.plugins[i].description.length);
					var stringMajorVersion = parseInt(stringVersion, 10);
					var stringMinorVersion = parseInt(stringVersion.substring(stringVersion.indexOf("r") + 1, stringVersion.length), 10);
					this.foundVersion = (stringMajorVersion + "." + ((stringMinorVersion < 1000) ? "0" : "") + ((stringMinorVersion < 100) ? "0" : "") + ((stringMinorVersion < 10) ? "0" : "") + stringMinorVersion);
					if (DEBUG_MODE) alert('DEBUG: Found Version - ' + this.foundVersion);
				}
			}
		}
		// for 'mimeTypes' collection
		if ((navigator.mimeTypes) && (!this.foundVersion > 0))
		{
			if (DEBUG_MODE) alert('DEBUG: Parsing MimeTypes Collection');
			if ((navigator.mimeTypes["application/x-shockwave-flash"]) && (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin))
			{
				var mimeObject = navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin;
				if ((mimeObject) && (mimeObject.name) && (mimeObject.name.indexOf("Shockwave Flash") == 0))
				{
					var stringVersion = mimeObject.description.substring(mimeObject.description.indexOf(".") - 1, mimeObject.description.length);
					var stringMajorVersion = parseInt(stringVersion, 10);
					var stringMinorVersion = parseInt(stringVersion.substring(stringVersion.indexOf("r") + 1, stringVersion.length), 10);
					this.foundVersion = (stringMajorVersion + "." + ((stringMinorVersion < 1000) ? "0" : "") + ((stringMinorVersion < 100) ? "0" : "") + ((stringMinorVersion < 10) ? "0" : "") + stringMinorVersion);
					if (DEBUG_MODE) alert('DEBUG: Found Version - ' + this.foundVersion);
				}
			}
		}
		// WebTV Browsers
		if ((navigator.userAgent.indexOf("WebTV") >= 0) && (!this.foundVersion > 0))
		{
			if (DEBUG_MODE) alert('DEBUG: Using WebTV Default Version - 3.0');
			this.foundVersion = 3;
		}
	}

	function _detectVBS()
	{
		document.write('<scr' + 'ipt language="vbscript">\n');
		document.write('<!--\n');
		document.write('	Dim usingAdvancedVersionDetection\n');
		document.write('	usingAdvancedVersionDetection = False\n');
		document.write('\n');
		document.write('	Function UsingAdvancedVersionDetectionVBS()\n');
		document.write('		On Error Resume Next\n');
		document.write('		UsingAdvancedVersionDetectionVBS = usingAdvancedVersionDetection\n');
		document.write('	End Function\n');
		document.write('\n');
		document.write('	Function FlashDetectionVBS()\n');
		document.write('		On Error Resume Next\n');
		document.write('		Dim versionStringVBS, majorVersionVBS, minorVersionVBS\n');
		document.write('		Dim foundVersionVBS\n');
		document.write('		foundVersionVBS = 0\n');
		document.write('\n');
		document.write('		For versionCounter = 1 To 10\n');
		document.write('			If (Not(IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & versionCounter)))) Then\n');
		document.write('				Err.Clear\n');
		document.write('			Else\n');
		document.write('				foundVersionVBS = versionCounter\n');
		document.write('			End If\n');
		document.write('		Next\n');
		document.write('\n');
		// get further version details
		document.write('		if (foundVersionVBS >= 3) Then\n');
		document.write('			Set flashObject = CreateObject("ShockwaveFlash.ShockwaveFlash." & foundVersionVBS)\n');
		document.write('			if (Err.Number > 0) Then\n');
		document.write('				Err.Clear\n');
		document.write('			Else\n');
		document.write('				foundVersionVBS = CStr("0x" + Hex(flashObject.FlashVersion))\n');
		document.write('				usingAdvancedVersionDetection = True\n');
		document.write('			End If\n');
		document.write('		End If\n');
		document.write('\n');
		document.write('		FlashDetectionVBS = foundVersionVBS\n');
		document.write('	End Function\n');
		document.write('//-->\n');
		document.write('</scr' + 'ipt>\n');

		var stringVersion = FlashDetectionVBS();
		if (UsingAdvancedVersionDetectionVBS())
		{
			var stringMajorVersion = parseInt(((stringVersion >> 16) & 0xFFFF), 10);
			var stringMinorVersion = parseInt((stringVersion & 0xFFFF), 10);
			this.foundVersion = parseFloat(stringMajorVersion + "." + ((stringMinorVersion < 1000) ? "0" : "") + ((stringMinorVersion < 100) ? "0" : "") + ((stringMinorVersion < 10) ? "0" : "") + stringMinorVersion);
		}
		else
		{
			this.foundVersion = stringVersion;
		}
		if (DEBUG_MODE) alert('DEBUG: Found Version - ' + this.foundVersion);
	}
}

