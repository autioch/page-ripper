# Page ripper crawler

## Configuration
The main export is an asynchronous function `pageRipper`, which requires configuration object:
 - `dataPath` should be folder, in which folders for each page will be created,
 - `dbPath` should be folder, in which sqlite db file will be stored,
 - `parsePost` should be a function that will extract information from the page html,
 - `startingPages` optional string array, that should be url of the first page to crawl.
 - `requestPause` optional number, that will describe pause between each page request.

### parsePost
Function that must be passed in configuration. It will be used to extract information from the retrieved post html.

It will accept three arguments:
 - `cheerio` instance with loaded post body,
 - post url,
 - raw response html body.

It must return an object, with properties:
 - `id`, required, must be unique
 - `folderName`, optional, name of dir in which assets will be stored; if it's missing, no assets will be downloaded,
 - `nextUrls`, optional, array of urls, that be added to the queue and persisted in the database,
 - `imageUrls` optional, array of urls for images.

The object can contain any other properties, they will be all persisted in the database.

## Usage

### Cli
1. Download this repo.
2. Open command line in `ripper` subdirectory.
3. Install dependencies: `npm i`.
4. In file `config.js` provide valid config.
5. Execute `start`: `npm run start`.

## TODO
2. Add post browser.
4. Separate post parser from id generator.
