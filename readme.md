# Page ripper

---
## _ Work in progress _
---

Allows to "download" a page. This is usefull in few cases:
 - there's no access to the "admin panel" for whatever reason,
 - and old page is about to vanish,
 - need to access the resources in offline mode,
 - in worst case, malicious idea of copying/reusing other people's hard work :(

## Usage
For now, check the `src\builder\WebsiteScannerBuilder.js` too see how to create an instance.

## Customization
Each builder allows passing an extended class. Each class was built with overwriting each reasonable step, so the customization should be quite easy assuming that (for now) the original code is analyzed.

## TODO
1. Each url might result in few other links to follow. This is "crawler" behaviour, without executing the page's scripts.
2. Tests, tests, tests.
3. Example usage.
