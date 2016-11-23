if (/\bCrOS\b/.test(navigator.userAgent)) {
  cycleWallpaper();
} else {
  alert("You are not on Chrome OS, thus installing this extension is useless!");
}

var source;
var source_url;
var screenWidth;
var screenHeight;
var interval_unit;
var interval;
var interval_ms;
var timeout;

chrome.alarms.onAlarm.addListener(function(alarm) {
  if(alarm.name == "cycleWallpaper") {
    cycleWallpaper();
  }
});
function cycleWallpaper() {
  chrome.alarms.clear("cycleWallpaper", function() {
    chrome.storage.sync.get({
      "source": "unsplash-random",
      "screenWidth": 1920,
      "screenHeight": 1080,
      "interval_unit": "days",
      "interval": 1
    }, function(items) {
      source = items.source;
      screenWidth = items.screenWidth;
      screenHeight = items.screenHeight;
      interval_unit = items.interval_unit;
      interval = items.interval;
      interval_ms = convertToMs(interval, interval_unit);
      source_url = getURL(source, screenWidth, screenHeight);
      chrome.wallpaper.setWallpaper({
        "url": source_url,
        "layout": "CENTER_CROPPED",
        "filename": source,
        "thumbnail": true
      }, function() {
        var nextSet = Date.now();
        nextSet += interval_ms;
        nextSet = new Date(nextSet);
        nextSet_date = nextSet.getFullYear().toString() + " " + ("0" + (nextSet.getMonth() + 1).toString()).slice(-2) + " " + ("0" + nextSet.getDate().toString()).slice(-2) + ", " + ("0" + nextSet.getHours().toString()).slice(-2) + ":" + ("0" + nextSet.getMinutes().toString()).slice(-2) + ":" + ("0" + nextSet.getSeconds().toString()).slice(-2);
        chrome.storage.sync.set({
          "timeout": nextSet_date
        }, function() {
          chrome.alarms.create("cycleWallpaper", {
            when: Date.now() + interval_ms
          });
        });
      });
    });
  });
}

function convertToMs(interval, interval_unit) {
  if(interval_unit == "days") {
    return (interval * 24 * 60 * 60000);
  }
  if(interval_unit == "hours") {
    return (interval * 60 * 60000);
  }
  return (interval * 60000);
}

function getURL(source, sw, sh) {
  sw = sw || 1920;
  sh = sh || 1080;
  var url = "";
  if(source == "unsplash-random") {
    return "https://source.unsplash.com/random/" + sw + "x" + sh;
  }
  if(source == "unsplash-buildings") {
    return "https://source.unsplash.com/category/buildings/" + sw + "x" + sh;
  }
  if(source == "unsplash-food") {
    return "https://source.unsplash.com/category/food/" + sw + "x" + sh;
  }
  if(source == "unsplash-nature") {
    return "https://source.unsplash.com/category/nature/" + sw + "x" + sh;
  }
  if(source == "unsplash-people") {
    return "https://source.unsplash.com/category/people/" + sw + "x" + sh;
  }
  if(source == "unsplash-technology") {
    return "https://source.unsplash.com/category/technology/" + sw + "x" + sh;
  }
  if(source == "unsplash-objects") {
    return "https://source.unsplash.com/category/objects/" + sw + "x" + sh;
  }
  if(source == "nasa-apod") {
    $.ajax({
      async: false,
      url: "https://api.nasa.gov/planetary/apod?api_key=KsIOCZiP4tp68SD886tZOrLULMDyfsBlRhoS8WiR&hd=true",
      success: function(data) {
        url = data.hdurl;
      },
      error: function(jqXHR, textStatus, thrownError) {
        console.log(textStatus);
        console.log(jqXHR);
        url = "NotAvailable.png";
      }
    });
    return url;
  }
  if(source == "bing-iod") {
    $.ajax({
      async: false,
      url: "http://crossorigin.me/http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",
      success: function(data) {
        url = "http://bing.com" + data.images[0].url;
      },
      error: function(jqXHR, textStatus, thrownError) {
        console.log(textStatus);
        console.log(jqXHR);
        url = "NotAvailable.png";
      }
    });
    return url;
  }
  /*
  Bing does not work from Nov 4th 2013 because they turned the Access-Control-Allow-Origin header off.
  
  But... http://crossorigin.me provides CORS access to website where CORS is not enabled!
  */
  if(source == "desktoppr-wallpaper") {
    $.ajax({
      async: false,
      cache: true,
      url: "https://api.desktoppr.co/1/wallpapers/random?auth_token=JitLTYzKio-PyVWfNvhx",
      success: function(data) {
        url = data.response.image.url;
      },
      error: function(jqXHR, textStatus, thrownError) {
        console.log(textStatus);
        console.log(jqXHR);
        url = "NotAvailable.png";
      }
    });
    return url;
  }
  
  if(source.indexOf("reddit-animewallpaper") !== -1) {
    // new
    // hot
    // new-nsfw
    // hot-nsfw
    switch(source) {
      case "reddit-animewallpaper-new":
        return "http://www.foxinflame.tk/dev/matomari/api/animeWallpaper.php?nsfw=false&sort=new";
      case "reddit-animewallpaper-hot":
        return "http://www.foxinflame.tk/dev/matomari/api/animeWallpaper.php?nsfw=false&sort=hot";
      case "reddit-animewallpaper-new-nsfw":
        return "http://www.foxinflame.tk/dev/matomari/api/animeWallpaper.php?nsfw=true&sort=new";
      case "reddit-animewallpaper-hot-nsfw":
        return "http://www.foxinflame.tk/dev/matomari/api/animeWallpaper.php?nsfw=true&sort=hot";
      case "reddit-animewallpaper-new-nsfw-only":
        return "http://www.foxinflame.tk/dev/matomari/api/animeWallpaper.php?nsfw=only&sort=new";
      case "reddit-animewallpaper-hot-nsfw-only":
        return "http://www.foxinflame.tk/dev/matomari/api/animeWallpaper.php?nsfw=only&sort=hot";
    }
  }
  
  
  // INSERT THE WHOLE LOT OF PIXABAY HERE ONCE HD IS COMPLETE
  
  
  if(source == "random-random") {
    var sources = ["unsplash-random", "unsplash-buildings", "unsplash-food", "unsplash-nature", "unsplash-people", "unsplash-technology", "unsplash-objects", "nasa-apod", "desktoppr-wallpaper", "pixabay-fasion", "pixabay-nature", "pixabay-backgrounds", "pixabay-science", "pixabay-education", "pixabay-people", "pixabay-feelings", "pixabay-religion", "pixabay-health", "pixabay-places", "pixabay-animals", "pixabay-industry", "pixabay-food", "pixabay-computer", "pixabay-sports", "pixabay-transportation", "pixabay-travel", "pixabay-buildings", "pixabay-business", "pixabay-music"];
    return getURL(sources[Math.floor(Math.random()*sources.length)], sw, sh);
  }
  
  if(source.indexOf("pixabay") !== -1) {
    return "https://placehold.it/1920x1080?text=Pixabay Still in Devleopment";
  }
  return "NotAvailable.png";
}