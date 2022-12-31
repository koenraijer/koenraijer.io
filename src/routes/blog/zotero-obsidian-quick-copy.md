---
title: Zotero-Obsidian Quick Copy
subtitle: External translator to improve integration between Obsidian and Zotero. 
date: "2022-12-31"
tags:
    - Computer Science
category: note
layout: post
toc: false
---

This piece of code allows you to create an Obsidian link which links directly to a reference inside Zotero, simply by dragging the reference into a note. If you're processing research or simply want to reference a study in one of your notes, this is is helpful in speeding up the process. 

**Note:** the code was adapted from another external translator made by Florian Wessling, which can be found <a href="ttps://gist.githubusercontent.com/ColdDevil/9992718/raw/71c385e68866fd55490f13c729156ae916eee12c/zotselect-link_full.js">here</a>. 

 Some other resources for writing Zotero translators:
- <a href="https://www.zotero.org/support/dev/translators/coding">dev:translators:coding [Zotero Documentation]</a>
- <a href="https://www.zotero.org/support/dev/translators/functions">dev:translators:functions [Zotero Documentation]</a>
- <a href="https://www.zotero.org/support/kb/item_types_and_fields">kb:item types and fields [Zotero Documentation]</a>

Save the code as a `.js` file at `/Users/YOURNAME/Zotero/translators`.

```js
{
    "translatorID":"f1ff9f87-3531-4db2-8cbc-7025872812f5",
    "translatorType":2,
    "label":"Zotero-Obsidian Quick Copy",
    "creator":"Koen Raijer",
    "target":"txt",
    "minVersion":"2.0",
    "maxVersion":"",
    "priority":200,
    "inRepository":false,
    "displayOptions":{"exportCharset":"UTF-8"},
    "lastUpdated":"2022-12-26 12:23:32"
    }
    
    // Save at: /Users/YOURNAME/Zotero/translators
    
    function doExport() {
        var output = "";
    
        var item;
        while(item = Zotero.nextItem()) {
            // title and link
            var selectLink = "zotero://select/items/";
            var library_id = item.libraryID ? item.libraryID : 0;
            selectLink += library_id + "_" + item.key;
            // output += "&quot;<a href=\"" + selectLink + "\">" + item.title + "</a>&quot;"; // &ldquo; &rdquo;
    
            var addition = "";
    
            // authors
            var author = "";
            if (item.creators !== undefined) {
                for (var a = 0; a < 1; a++) {
                    if (item.creators[a]["creatorType"] == "author") {
                        author += item.creators[a]["lastName"]; // + ", " + item.creators[a]["firstName"];
                    }
                }
                addition += author;
            } else {
                addition += "noauthor"
            }

    
            // date
            if (item.date !== undefined && item.date.length > 0) {
                addition += ", " + item.date.substring(0,4);
            } else {
                addition += ", nodate";
            }
    
            if (addition.length > 0) {
                output += "([" + addition + "](" + selectLink + "))";
            } else {
                output += "([zotlink](" + selectLink + ")";
            }
    
            Zotero.debug(item);
        }
    
        Zotero.write(output);
}
```
<a href="https://raw.githubusercontent.com/koenraijer/Zotero-Obsidian-Quick-Copy/main/Zotero-Obsidian-Quick-Copy">Github link</a>