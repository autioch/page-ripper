# Page ripper

---
## _ Work in progress _
---

Allows to "download" a page. This is usefull in few cases:
 - there's no access to the "admin panel" for whatever reason,
 - and old page is about to vanish,
 - need to access the resources in offline mode,
 - in worst case, malicious idea of copying/reusing other people's hard work :(

## Configuration
The main export is an asynchronous function `pageRipper`, which requires configuration object:
 - `dataPath` should be folder, in which folders for each page will be created,
 - `dbPath` should be folder, in which sqlite db file will be stored,
 - `parsePost` should be a function that will extract information from the page html,
 - `startingPage` is an optional string, that should be url of the first page to crawl.

### parsePost
Function that must be passed in configuration. It will be used to extract information from the retrieved post html.

It will accept three arguments:
 - `cheerio` instance with loaded post body,
 - post url,
 - raw response html body.

It must return an object, with optional properties:
 - `id`, which will be uniquified if it already exists by appending `__(count)` to it,
 - `nextUrls`, which should be array of urls, that be added to the queue and persisted in the database,
 - `imageUrls` which should be array of urls for images.

The object can contain any other properties, they will be all persisted in the database.

## Usage

### Cli
1. Download this repo
2. Install dependencies: `npm i`.
3. In file `config.js` provide valid config.
4. Execute `start`: `npm run start`.

### NPM module
This app is currently unavailable in NPM registry.
