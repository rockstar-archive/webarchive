<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
   <xsl:output method="html" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN"/>
 <xsl:variable name="godecoding">go_decoding();</xsl:variable>
   <xsl:variable name="title" select="/rss/channel/title"/>
	<xsl:variable name="feedUrl" select="/rss/channel/atom10:link[@rel='self']/@href" xmlns:atom10="http://www.w3.org/2005/Atom"/>
   <xsl:template match="/">
      <xsl:element name="html">
         <head>
            <title><xsl:value-of select="$title"/> - powered by Rockstar Games</title>
            <link href="http://www.rockstargames.com/xml/rss/undohtml.css" rel="stylesheet" type="text/css" media="all"/>
            <link href="http://www.rockstargames.com/xml/rss/bf30.css" rel="stylesheet" type="text/css" media="all"/>
			<link rel="alternate" type="application/rss+xml" title="{$title}" href="{$feedUrl}"/>
            <xsl:element name="script">
               <xsl:attribute name="type">text/javascript</xsl:attribute>
               <xsl:attribute name="src">http://www.feedburner.com/fb/feed-styles/bf30.js</xsl:attribute>
            </xsl:element>
         </head>
         <xsl:apply-templates select="rss/channel"/>
      </xsl:element>
   </xsl:template>
   <xsl:template match="channel">
      <body id="browserfriendly" onload="jsFeedUrl='{$feedUrl}';loadSubscribeAreaUltra('standard');go_decoding()">
         <div id="cometestme" style="display:none;">
            <xsl:text disable-output-escaping="yes">&amp;amp;</xsl:text>
         </div>
         <div id="bodycontainer">
            <div id="bannerblock">
               <xsl:apply-templates select="image"/>
               <h1>
                  <a href="{link}" title="Link to original website">
                     <xsl:value-of select="$title"/>
                  </a>
               </h1>
               <h2>This is a Rockstar Games RSS News Feed</h2>
               <p style="clear:both"/>
            </div>
            <div id="bodyblock">
               <div id="subscribenow" class="subscribeblock action">
						<div id="subscribe-userchoice" style="display:none">
							<p id="subscribeLink"><a href="#">...</a></p>
							<p id="resetLink">Reset this favorite; <a href="#" onclick="return clearUserchoice('standard')">show all Subscribe options</a></p>
						</div>
                  <div id="subscribe-options">
                     <h3>Subscribe Now!</h3>
                     <h4>...with web-based news readers. Click your choice below:</h4>
                     <div id="webbased">
						<xsl:choose xmlns:feedburner="http://rssnamespace.org/feedburner/ext/1.0">
							<xsl:when test="count(child::feedburner:feedFlare)>0">
								<xsl:apply-templates select="feedburner:feedFlare" xmlns:feedburner="http://rssnamespace.org/feedburner/ext/1.0" />
							</xsl:when>
							<xsl:when test="count(child::feedburner:feedFlare)=0">
                        		<a href="http://add.my.yahoo.com/rss?url=http://www.rockstargames.com/xml/newsfeed.xml" onclick="this.href = subscribeNow(this.href,'My Yahoo!');return true"><img src="http://us.i1.yimg.com/us.yimg.com/i/us/my/addtomyyahoo4.gif" width="91" height="17" alt="addtomyyahoo4"/></a><a class="img" href="http://www.newsgator.com/ngs/subscriber/subext.aspx?url=http://www.rockstargames.com/xml/newsfeed.xml" onclick="subscribeNow(this.href,'NewsGator Online');return true"><img src="http://www.newsgator.com/images/ngsub1.gif" alt="Subscribe in NewsGator Online"/></a><a href="http://feeds.my.aol.com/add.jsp?url=http://www.rockstargames.com/xml/newsfeed.xml" onclick="this.href=subscribeNow(this.href,'My AOL');return true"><img src="http://o.aolcdn.com/myfeeds/html/vis/myaol_cta1.gif" alt="Add to My AOL" border="0"/></a><br/><a class="img" href="http://www.rojo.com/add-subscription?resource=http://www.rockstargames.com/xml/newsfeed.xml" onclick="this.href=subscribeNow(this.href,'Rojo');return true"><img src="http://www.rojo.com/corporate/images/add-to-rojo.gif" alt="Subscribe in Rojo"/></a><a class="img" href="http://www.bloglines.com/sub/" onclick="this.href=subscribeNow(this.href,'Bloglines');return true"><img src="http://www.bloglines.com/images/sub_modern5.gif" alt="Subscribe with Bloglines"/></a><a href="http://www.netvibes.com/subscribe.php?url=http://www.rockstargames.com/xml/newsfeed.xml" onclick="this.href=subscribeNow(this.href,'Netvibes');return true"><img src="http://www.netvibes.com/img/add2netvibes.gif" alt="Add to netvibes" /></a><br/><a href="http://fusion.google.com/add?feedurl=http://www.rockstargames.com/xml/newsfeed.xml" onclick="this.href=subscribeNow(this.href,'Google');return true"><img src="http://buttons.googlesyndication.com/fusion/add.gif" width="104" height="17" alt="Add to Google"/></a><a href="http://www.pageflakes.com/subscribe.aspx?url=http://www.rockstargames.com/xml/newsfeed.xml" onclick="this.href=subscribeNow(this.href,'Pageflakes');return true"><img src="http://www.pageflakes.com/subscribe2.gif" border="0"/></a>
							</xsl:when>
						</xsl:choose>
                     </div>
                     <xsl:if test="true()">
                     <h4>...with other readers:</h4>
                     <form action="http://www.feedburner.com" method="get">
                        <select onchange="location.href=subscribeNowUltra('feed:http://www.rockstargames.com/xml/newsfeed.xml',this.options[this.selectedIndex].value)">
                           <option value="--" disabled="disabled" selected="selected" style="padding-left:0">(Choose Your Reader)</option>
									<option value="FeedDemon">FeedDemon</option>
									<option value="NetNewsWire">NetNewsWire</option>
									<option value="NewsFire">NewsFire</option>
									<option value="NewsGator Outlook Edition">NewsGator Outlook Edition</option>
									<option value="RSSOwl">RSSOwl</option>
									<option value="shrook">Shrook</option>
									<option value="USM">Universal Subscription Mechanism (USM)</option>
                        </select>
                     </form>
                     </xsl:if>
					<xsl:if xmlns:feedburner="http://rssnamespace.org/feedburner/ext/1.0" test="count(feedburner:emailServiceId)=1">
						<xsl:variable name="ffid" xmlns:feedburner="http://rssnamespace.org/feedburner/ext/1.0" select="/rss/channel/feedburner:emailServiceId"/>
						<p id="emailthis"><a onclick="window.open('http://www.feedburner.com', 'popupwindow', 'scrollbars=yes,width=550,height=520');return true" target="popupwindow" href="http://www.feedburner.com/fb/a/emailverifySubmit?feedId={$ffid}">Get <xsl:value-of select="$title"/> delivered by email</a></p>
					</xsl:if>
					<xsl:choose xmlns:feedburner="http://rssnamespace.org/feedburner/ext/1.0">
					<xsl:when test="count(feedburner:xmlView)=1">
						<xsl:variable name="originalHref" select="/rss/channel/feedburner:xmlView/@href"/>
						<p><a href="{$originalHref}"><img src="http://www.feedburner.com/fb/lib/images/icons/feed-icon-12x12-orange.gif" alt="original feed"/></a><xsl:text> </xsl:text><a href="{$originalHref}">View Feed XML</a></p>
					</xsl:when>
					<xsl:when test="count(feedburner:xmlView)=0">
						<!-- purely for spacing -->
						<p><xsl:text> </xsl:text></p>
					</xsl:when>
					</xsl:choose>
                  </div>
							<input id="savechoice" type="hidden" value="standard"/>
               </div>
               <p class="about"><b>What is this page?</b><br />This is an RSS feed from the Rockstar Games website. RSS feeds allow you to stay up to date with the latest news from Rockstar Games.

To subscribe to it, you will need a News Reader or other similar device.</p>
               <p class="about">
                  <a href="http://www.feedburner.com/fb/a/aboutrss">Learn more about syndication ...</a>
               </p>
			      <xsl:apply-templates xmlns:feedburner="http://rssnamespace.org/feedburner/ext/1.0" select="feedburner:browserFriendly"/>
               <xsl:apply-templates select="item"/>
            </div>
            <div id="footer">
              <br /><br />
            </div>
         </div>
      </body>
   </xsl:template>
	<xsl:template match="feedburner:feedFlare" xmlns:feedburner="http://rssnamespace.org/feedburner/ext/1.0">
		<xsl:variable name="alttext" select="."/>
		 <a href="{@href}" onclick="this.href = subscribeNowUltra(this.href,'{$alttext}');return true"><img src="{@src}" alt="{$alttext}"/></a>
	</xsl:template>
   <xsl:template match="item" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <xsl:if test="position() = 1">
         <h3 xmlns="http://www.w3.org/1999/xhtml" id="currentFeedContent">Current Feed Content</h3>
      </xsl:if>
      <ul xmlns="http://www.w3.org/1999/xhtml">
         <li class="regularitem">
            <h4 class="itemtitle">
               <a href="{link}">
                  <xsl:value-of select="title"/>
               </a>
            </h4>
            <h5 class="itemposttime">
               <xsl:if test="count(child::pubDate)=1"><span>Posted:</span><xsl:text> </xsl:text><xsl:value-of select="pubDate"/></xsl:if>
				<xsl:if test="count(child::dc:date)=1"><span>Posted:</span><xsl:text> </xsl:text><xsl:value-of select="dc:date"/></xsl:if>
            </h5>
            <div class="itemcontent" name="decodeable">
               <xsl:call-template name="outputContent"/>
            </div>
            <xsl:if test="count(child::enclosure)=1">
               <p class="mediaenclosure">MEDIA ENCLOSURE: <a href="{enclosure/@url}"><xsl:value-of select="child::enclosure/@url"/></a></p>
            </xsl:if>
         </li>
      </ul>
   </xsl:template>
   <xsl:template match="image">
	<a href="{link}" title="Link to original website"><img src="{url}" id="feedimage" alt="Link to {title}"/></a>
      <xsl:text/>
   </xsl:template>
   <xsl:template xmlns:feedburner="http://rssnamespace.org/feedburner/ext/1.0" match="feedburner:browserFriendly">
      <p xmlns="http://www.w3.org/1999/xhtml" class="about">
         <span style="color:#000">A message from this feed's publisher:</span>
         <xsl:text> </xsl:text>
         <xsl:apply-templates/>
      </p>
   </xsl:template>
   <xsl:template name="outputContent">
      <xsl:choose>
         <xsl:when xmlns:xhtml="http://www.w3.org/1999/xhtml" test="xhtml:body">
            <xsl:copy-of select="xhtml:body/*"/>
         </xsl:when>
         <xsl:when xmlns:xhtml="http://www.w3.org/1999/xhtml" test="xhtml:div">
            <xsl:copy-of select="xhtml:div"/>
         </xsl:when>
         <xsl:when xmlns:content="http://purl.org/rss/1.0/modules/content/" test="content:encoded">
            <xsl:value-of select="content:encoded" disable-output-escaping="yes"/>
         </xsl:when>
         <xsl:when test="description">
            <xsl:value-of select="description" disable-output-escaping="yes"/>
         </xsl:when>
      </xsl:choose>
   </xsl:template>
</xsl:stylesheet>
