# Code Examples

**Stores CMS extension in Salesforce Commerce Cloud**

```
├── bm_extensions.xml           // Describes where the CMS extension goes
├── controllers
│   └── Stores.js               // Responsible for Start, getDetails and Save
├── static
│   └── default
│       ├── css
│       │   └── stores.css      // styling on top of styles already present in CMS
│       └── js
│           └── stores.js       // client side React js
└── templates
    ├── default
    │   └── listStores.isml     // template, proprietary SFCC ISML templating language
    └── resources
        └── example.properties  // translation file
```
This is an example of a CMS extension, where a store manager would be able to easily edit store opening hours. It demonstrates client side React with hooks, and server side controller in Vanilla JS. This is how an extension would be built for Salesforce Commerce Cloud. Ive removed the client's name, unnecessary files, and code I have not written myself.

#### Navigation
Not a code example but check out the mobile and desktop navigation on [gall.nl](https://gall.nl). Input is 1 single master json and uses recursion functionality to generate both navigations. The one on mobile is actually being generated in in the template and the one on desktop gets generated client side on user interaction.

#### Watch and Sync
```
├── WatchAndSync.sh             // handles rsyncing, stopping and starting the watcher
├── com.watch-bramjoosten.plist // put this in ~/Library/LaunchAgents
├── index.php                   // placeholder file, would be your website
└── logs                        // log dir
    ├── stderr.log
    └── stdout.log
```
Demonstrates shell and unix scripting. Watch and upload any folder so it instantly uploads and changes are deployed immediately. I wanted to have a simple way of mounting a folder and keeping it in sync remotely, so there's no need for localhost. Can be done with only 2 files.

---
For more info, contact me at [bramjoosten.nl](https://bramjoosten.nl)