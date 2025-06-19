//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Title
//		URL Parsing API
// Version
//		v1.01
// Author
//		Daniel Rainbird (DRainbird@email.com)
// Synopsis
//		Takes the supplied URL string and attempts to retrieve
//		the parameters and values defined in the URL
// History
//		v1.01 (07 December 2000)
//		- added getURLFileName function, which retrieves
//		  the filename part of the URL 
//		v1.00 (22 November 2000)
//		- initial construction of parsing url function
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ParseURL(urlString)
{
	if (!ParseURL.prototype)
	{
		return;
	}

	ParseURL.prototype.parseURLString = _parseURLString;
	ParseURL.prototype.getParameterValue = _getParameterValue;
	ParseURL.prototype.getParameterArray = _getParameterArray;
	ParseURL.prototype.getParameterArrayCount = _getParameterArrayCount;
	ParseURL.prototype.getURLFileName = _getURLFileName;

	this.urlString = urlString;
	this.parameterArrayAsString = new Array();
	this.parameterArrayAsInteger = new Array();
	this.parameterArrayLength = 0;

	this.parseURLString(urlString);

	function _getURLFileName()
	{
		var pathURL = "";
		if (this.urlString.indexOf("#") > 0) pathURL = this.urlString.substring(0, this.urlString.indexOf("#"));
		else if (this.urlString.indexOf("?") > 0) pathURL = this.urlString.substring(0, this.urlString.indexOf("?"));
		else pathURL = this.urlString;

		var lastSlashIndex = pathURL.lastIndexOf("/");
		if (lastSlashIndex > 0)
		{
			return pathURL.substring((lastSlashIndex + 1), pathURL.length);
		}

		return pathURL;
	}

	function _getParameterValue(parameterName)
	{
		if (this.parameterArrayAsString[parameterName]) return this.parameterArrayAsString[parameterName];
		else return "";
	}

	function _getParameterArray(asStringArray)
	{
		if (asStringArray == true) return this.parameterArrayAsString;
		else return this.parameterArrayAsInteger;
	}

	function _getParameterArrayCount()
	{
		return this.parameterArrayLength;
	}

	function _parseURLString(urlString)
	{
		// invalid url string
		if (!urlString)
		{
			return false;
		}

		var urlStringLength = urlString.length;
		var parameterStartIndex = urlString.lastIndexOf("?");
		// no parameters provided, or the url is not in standard format
		if ((parameterStartIndex < 0) || (urlStringLength <= 0) || ((parameterStartIndex + 1) > urlString.length))
		{
			return false;
		}

		// retrieve the parameters from the urlString
		var parameterString = urlString.substring((parameterStartIndex + 1), urlStringLength);
		var parameterStringLength = parameterString.length;
		// no parameters provided, or the url is not in standard format
		if ((!parameterString) || (parameterStringLength <= 0))
		{
			return false;
		}

		// generate the parameter array
		var currentParameter = "";
		var currentValue = "";
		var currentString = "";
		var gettingParameter = true;
		for (var i = 0; i < parameterStringLength; i++)
		{
			// retrieve and store the parameter
			if ((gettingParameter == true) && (parameterString.charAt(i) == "="))
			{
				currentParameter = unescape(currentString);
				if (i == (parameterStringLength - 1))
				{
					if (currentParameter.length > 0)
					{
						this.parameterArrayAsString[currentParameter] = unescape(currentValue);
						this.parameterArrayAsInteger[this.parameterArrayLength] = new Array(currentParameter, unescape(currentValue));
						this.parameterArrayLength++;
					}
				}
				currentString = "";
				gettingParameter = false;
			}
			// retrieve and store the parameter value
			else if ((gettingParameter != true) && ((parameterString.charAt(i) == "&") || (i == (parameterStringLength - 1))))
			{
				if (i == (parameterStringLength - 1)) currentString += parameterString.charAt(i);
				currentValue = currentString;
				if (currentParameter.length > 0)
				{
					this.parameterArrayAsString[currentParameter] = unescape(currentValue);
					this.parameterArrayAsInteger[this.parameterArrayLength] = new Array(currentParameter, unescape(currentValue));
					this.parameterArrayLength++;
				}
				currentParameter = "";
				currentValue = "";
				currentString = "";
				gettingParameter = true;
			}
			else
			{
				currentString += parameterString.charAt(i);
			}
		}

		if (this.parameterArrayLength <= 0) return false;
		else return true;
	}
}