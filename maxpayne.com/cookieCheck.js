function cookieCheck() {
  var allcookies = document.cookie;
  var detectCookie = allcookies.indexOf("rockstar_max_check=");
	if (detectCookie != -1) {
		var start = detectCookie + 25; //start of cookie value
		var end = allcookies.indexOf(";",start); //end of cookie value

		if (end==-1) end = allcookies.length;

		var userAge = allcookies.substring(start,end); //extract the birthdate
		userAge = unescape(userAge); //decode value
		
		var detectVisit = allcookies.indexOf("rockstar_max_visit=");
		var userVisit = allcookies.substring(detectVisit+25,100); //extract user visit
		var age = new Date(userAge);
		//check if over 17
		if (over17(age)){
			//location.replace("warriors.html");
		}
		else	{
			window.location = "noentry.html";
		}
	}
	else { 
		window.location = "agegate.html"; 
	}
}

var expireDate = new Date();
var year = expireDate.getYear(); 
year = (year < 1900) ? year + 1900 : year;
expireDate.setYear(year + 3);

//creates a cookie with the values passed in
function my_setCookie(nam, val, expire, domain, path) {
	var cookie_str = "";
	cookie_str += nam + "=" + escape(val); 
	//cookie_str += "; domain=" + domain;//deleted because the cookie wasn't 
	//cookie_str += "; path=" + path;    //getting detected and they're not needed
	cookie_str += "; expires=" + expireDate.toGMTString();
	document.cookie = cookie_str;
};

function setCookie() {    
 //if the date is valid, create a cookie
	my_setCookie("rockstar_max_visit", "0" , expireDate, ".rockstarnexus.com", "/");
} 

function over17(age) {
	var ageDate = new Date();
	var ageYear = ageDate.getFullYear()-17;
	ageDate.setFullYear(ageYear);

	if (age <= ageDate) {return true;}
	else {return false;}
}