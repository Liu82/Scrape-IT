# Scrape-IT

Scrape-IT app. 

Scrape-IT app is a scraper app which captures the title, summary and image of articles of news articles.  In this app the user is are able to save their preferred articles, add notes and edit notes to one or multiple articles. The app also allows the user to search in titles according to different key words.



Tools Used:
request: enables cheerio to get access to front-end code of https://www.nytimes.com/section/world

cheerio: scrapes front-end code from https://www.nytimes.com/section/world

mongoose: be in charge of database of scrap

express: builds server-side routes and functions

morgan: logs server-side requests, helping debugging

express-handlebars: a powerful front-end builder without requiring multiple html pages