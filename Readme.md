# Code Examples
(for now just one)

**Stores CMS extension in Salesforce Commerce Cloud**

```bash
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
This is an example a CMS extension, where a user would be able to edit store opening hours. It demonstrates client side React with hooks, and server side controller in Vanilla JS. This is how an extension would be built for Salesforce Commerce Cloud. Ive removed the client's name and files to system functionality and code I have not written myself.

One thing that could be improved is how the data is retreived: SFCC offers both an internal API as well as a REST API. In the example the internal one is used to get the initial data, where as the REST API is used to do the updates. If we want to only use the internal API we would have needed to create a custom extension on the store db object, since it's not allowed to modify it via the internal API. Therefore the best approach would be to also fetch the data from the REST API, so we don't have to re-map object keys and values.

Also, not really a code example but check out the mobile and desktop navigation on [gall.nl](https://gall.nl). This is all generated from 1 single master json and uses recursion functionality to generate both navigations. The one on mobile is actually being generated in the DOM, but the one on desktop is built client side.