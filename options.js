$(document).ready(function() {
  var screenHeight = window.screen.height;
  var screenWidth = window.screen.width;
  $("#dimension_height").val(screenHeight);
  $("#dimension_width").val(screenWidth);
  restore_options();
  $("#save_button").on("click", function() {
    save_options();
  });
  $("#update_now_button").on("click", function() {
    save_options(function(nextSet_date) {
      chrome.extension.getBackgroundPage().cycleWallpaper();
      chrome.storage.sync.set({
        "timeout": nextSet_date
      }, function() {});
      restore_options();
    });
  });
});


var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;


function showRemaining(end) {
  var now = new Date();
  var distance = end - now;
  if (distance < 0) {
      clearInterval(timer);
      return "EXPIRED!";
  }
  var days = Math.floor(distance / _day);
  var hours = Math.floor((distance % _day) / _hour);
  var minutes = Math.floor((distance % _hour) / _minute);
  var seconds = Math.floor((distance % _minute) / _second);
  return days + " days, " + hours + " hours, " + minutes + " minutes and " + seconds + " seconds";
}

var timeUpdate;
function updateTime() {
  var remaining = showRemaining(nextCycle_date);
  if(remaining == "EXPIRED!") {
    $("#remaining").parent().html("<b id='remaining'>" + remaining + "</b>");
  } else {
    $("#remaining").html(remaining);
  }
  timeUpdate = window.setTimeout(updateTime, 1000);
}

var nextCycle,
    nextCycle_year,
    nextCycle_month,
    nextCycle_day,
    nextCycle_hour,
    nextCycle_minute,
    nextCycle_date;

function restore_options() {
  clearTimeout(timeUpdate);
  chrome.storage.sync.get({
    "source": "unsplash-random",
    "screenWidth": 1920,
    "screenHeight": 1080,
    "interval_unit": "hours",
    "interval": 1,
    "timeout": "0000 00 00, 00:00:00"
  }, function(items) {
    $("#category option[value='" + items.source + "']").prop("selected", true);
    $("#dimension_width").val(items.screenWidth);
    $("#dimension_height").val(items.screenHeight);
    $("#interval_unit option[value='" + items.interval_unit + "']").prop("selected", true);
    $("#interval").val(items.interval);
    nextCycle = items.timeout;
    nextCycle_year = nextCycle.substring(0, 4);
    nextCycle_month = nextCycle.substring(5, 7);
    nextCycle_day = nextCycle.substring(8, 10);
    nextCycle_hour = nextCycle.substring(12, 14);
    nextCycle_minute = nextCycle.substring(15, 17);
    nextCycle_second = nextCycle.substring(18, 20);
    nextCycle_date = new Date(nextCycle_year, (nextCycle_month - 1), nextCycle_day, nextCycle_hour, nextCycle_minute, nextCycle_second);
    updateTime();
  });
}
function save_options(callback) {
  var source = $("#category").val();
  var screenWidth = $("#dimension_width").val();
  var screenHeight = $("#dimension_height").val();
  var interval_unit = $("#interval_unit").val();
  var interval = $("#interval").val();
  if(!interval || !source || !screenWidth || !screenHeight || !interval_unit) {
    $("#save_status").css("color", "red").html("Some of the fields are blank!");
    window.setTimeout(function() {
      $("#save_status").html("");
    }, 3000);
    return;
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
  interval_ms = convertToMs(interval, interval_unit);
  var nextSet = Date.now();
  nextSet += interval_ms;
  nextSet = new Date(nextSet);
  nextSet_date = nextSet.getFullYear().toString() + " " + ("0" + (nextSet.getMonth() + 1).toString()).slice(-2) + " " + ("0" + nextSet.getDate().toString()).slice(-2) + ", " + ("0" + nextSet.getHours().toString()).slice(-2) + ":" + ("0" + nextSet.getMinutes().toString()).slice(-2) + ":" + ("0" + nextSet.getSeconds().toString()).slice(-2);
  chrome.storage.sync.set({
    "source": source,
    "screenWidth": screenWidth,
    "screenHeight": screenHeight,
    "interval_unit": interval_unit,
    "interval": interval
  }, function(items) {
    if(callback) callback(nextSet_date);
    $("#save_status").css("color", "green").html("Options Saved.");
    window.setTimeout(function() {
      $("#save_status").html("");
    }, 3000);
  });
}