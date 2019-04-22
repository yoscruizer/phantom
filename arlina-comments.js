var numComments = numComments || 5
    , avatarSize = avatarSize || 60
    , characters = characters || 40
    , defaultAvatar = defaultAvatar || "http://www.gravatar.com/avatar/?d=mm"
    , moreLinktext = moreLinktext || " More &raquo;"
    , showAvatar = (typeof showAvatar === 'undefined') ? true : showAvatar
    , showMorelink = (typeof showMorelink === 'undefined') ? false : showMorelink
    , roundAvatar = (typeof roundAvatar === 'undefined') ? true : roundAvatar
    , hideCredits = (typeof hideCredits === 'undefined') ? false : roundAvatar;

function arlina-comments(tb) {
    var commentsHtml;
    commentsHtml = '<ul class="arlina-comments">';
    for(var i = 0; i < numComments; i++) {
        var commentlink, authorName, authorAvatar, avatarClass;
        if(i == tb.feed.entry.length) break;
        commentsHtml += "<li>";
        var entry = tb.feed.entry[i];
        for(var l = 0; l < entry.link.length; l++) {
            if(entry.link[l].rel == 'alternate') {
                commentlink = entry.link[l].href
            }
        }
        for(var a = 0; a < entry.author.length; a++) {
            authorName = entry.author[a].name.$t;
            authorAvatar = entry.author[a].gd$image.src
        }
        if(authorAvatar.indexOf("/s1600/") != -1) {
            authorAvatar = authorAvatar.replace("/s1600/", "/s" + avatarSize + "-c/")
        } else if(authorAvatar.indexOf("/s220/") != -1) {
            authorAvatar = authorAvatar.replace("/s220/", "/s" + avatarSize + "-c/")
        } else if(authorAvatar.indexOf("/s512-c/") != -1 && authorAvatar.indexOf("http:") != 0) {
            authorAvatar = "http:" + authorAvatar.replace("/s512-c/", "/s" + avatarSize + "-c/")
        } else if(authorAvatar.indexOf("blogblog.com/img/b16-rounded.gif") != -1) {
            authorAvatar = "http://3.bp.blogspot.com/-AaI8-1X32ZM/TxMKLVzQ5BI/AAAAAAAABYY/QYau8ov2blE/s" + avatarSize + "/tb_blogger_logo.png"
        } else if(authorAvatar.indexOf("blogblog.com/img/openid16-rounded.gif") != -1) {
            authorAvatar = "http://3.bp.blogspot.com/-9lSeVyNRKx0/TxMKMIqMNuI/AAAAAAAABYc/8iasY0xpLzc/s" + avatarSize + "/tb_openid_logo.png"
        } else if(authorAvatar.indexOf("blogblog.com/img/blank.gif") != -1) {
            if(defaultAvatar.indexOf("gravatar.com") != -1) {
                authorAvatar = defaultAvatar + "&s=" + avatarSize
            } else {
                authorAvatar = defaultAvatar
            }
        } else {
            authorAvatar = authorAvatar
        }
        if(showAvatar == true) {
            if(roundAvatar == true) {
                avatarClass = "avatarRound"
            } else {
                avatarClass = ""
            }
            commentsHtml += "<div class=\"avatarImage " + avatarClass + "\"><img class=\"" + avatarClass + "\" src=\"" + authorAvatar + "\" alt=\"" + authorName + "\" width=\"" + avatarSize + "\" height=\"" + avatarSize + "\"/></div>"
        }
        commentsHtml += "<a href=\"" + commentlink + "\">" + authorName + "</a>";
        var commHTML = entry.content.$t;
        var commBody = commHTML.replace(/(<([^>]+)>)/ig, "");
        if(commBody != "" && commBody.length > characters) {
            commBody = commBody.substring(0, characters);
            commBody += "&hellip;";
            if(showMorelink == true) {
                commBody += "<a href=\"" + commentlink + "\">" + moreLinktext + "</a>"
            }
        } else {
            commBody = commBody
        }
        commentsHtml += "<span>" + commBody + "</span>";
        commentsHtml += "</li>"
    }
    commentsHtml += '</ul>';
    var hideCSS = "";
    if(hideCredits == false) {
        hideCSS = "display:block;"
    }
    commentsHtml += "<span style=\"font-size:10px;display:block;text-align:right;" + hideCSS + "\"></span>";
    document.write(commentsHtml)
}
