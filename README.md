# WallpaperCycler
Chrome OS Wallpaper Cycler

**Warning: This will make your device lag and instantly drop frame rates. This is because the background script is running a window.setTimeout to count down every second until the cycle. I should use the Chrome API to schedule tasks, but I don't bother...**

## What is it?
WallpaperCycler indexes image APIs on the web, and sets the Chrome OS wallpaper in a set interval.
In the options page, you can choose the API source (Nasa, Unsplash, etc), and set your wallpaper update interval (minutes, days, hours)

![Options Page Screenshot](http://i.imgur.com/zVvJhRF.png)

## What sources are there?
WallpaperCycler provides the following sources:

- Unsplash.com (6 categories + Random image)
- Nasa.gov (Astronomy Picture of the Day)
- ~~Bing.com (Image of the Day)~~ 
- Desktoppr.co (Random image)
- Pixabay.com (20 categories)
- Random (Random source)

Bing turned off the Image of the Day API with the "Access-Control-Allow-Origin" header.
Pixabay is still not answering in giving me the permission to use the HD wallpapers, and so, the sources for Pixabay is currently not available.
