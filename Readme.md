# Code Examples

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
This is an example a CMS extension, where a store manager would be able to easily edit store opening hours. It demonstrates client side React with hooks, and server side controller in Vanilla JS. This is how an extension would be built for Salesforce Commerce Cloud. Ive removed the client's name, unnecessary files, and code I have not written myself.

Also, not really a code example but check out the mobile and desktop navigation on [gall.nl](https://gall.nl). This is all generated from 1 single master json and uses recursion functionality to generate both navigations. The one on mobile is actually being generated in the DOM, but the one on desktop is built client side.