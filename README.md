# WallpaperCycler
Chrome OS Wallpaper Cycler

**It only works on Chrome OS!!**

## What is it?
WallpaperCycler indexes image APIs on the web, and sets the Chrome OS wallpaper in a set interval.
In the options page, you can choose the API source (Nasa, Unsplash, etc), and set your wallpaper update interval (minutes, days, hours)

![Options Page Screenshot](http://i.imgur.com/zVvJhRF.png)
![Options Page Screenshot2](http://i.imgur.com/5NUBhZu.png)

## What sources are there?
WallpaperCycler provides the following sources:

- Unsplash.com (6 categories + Random image)
- Nasa.gov (Astronomy Picture of the Day)
- Bing.com (Image of the Day)
- Desktoppr.co (Random image)
- /r/animewallpaper (Hot, New, Hot w/ NSFW, New w/ NSFW)
- DeviantArt Wallpapers (14 categories)
- Random (Chooses Random source from above)

Bing turned off the Image of the Day API with the "Access-Control-Allow-Origin" header, but I used crossorigin.me to access the API.
